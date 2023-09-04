import { createOrIncrementMapField } from '../utils/misc'
import { weiStringToEthAmount } from '../utils/converters'

export const description = 'Trade events'

export const allCharts = [ mainChart, auxChart, scalarChart ]

export function scalarChart() {
	return {
		id: 'scalars',
		type: 'text',
		title: 'All time stats',
		query: () => (`
			subscription {
				allTimeStatsById(id: "0") {
					trades numSubjects
					ethBuyVolume ethSellVolume ethVolume
					shareBuyVolume shareSellVolume shareVolume
					protocolEthTotal subjectEthTotal
				}
			}
		`),
		data: (rawData) => {
			if (!rawData) {
				return { text: [''] }
			}
			const ats = rawData.data.allTimeStatsById
			return {
				text: [
					`trades: ${ats.trades}`,
					`subjects: ${ats.numSubjects}`,
					`ETH volume: ${weiStringToEthAmount(ats.ethVolume)}`,
					`share volume: ${ats.shareVolume}`,
					`protocol ETH: ${weiStringToEthAmount(ats.protocolEthTotal)}`,
					`subject ETH: ${weiStringToEthAmount(ats.subjectEthTotal)}`
				]
			}
		}
	}
}

export function mainChart() {
	return {
		id: 'trade-main',
		type: 'doughnut',
		className: 'w-[500px]',
		title: 'Subjects of last 10 trades',

		query: () => (`
			subscription {
				trades(limit: 10, orderBy: block_DESC) {
					ethAmount subject
				}
			}
		`),

		data: (rawData) => {
			if (!rawData) {
				return {labels: [], datasets: []}
			}

			const histogram = new Map()
			for (let tr of rawData.data.trades) {
				createOrIncrementMapField(histogram, tr.subject, weiStringToEthAmount(tr.ethAmount))
			}

			const popularSubjects = new Set([...histogram.entries()].toSorted((a, b) => b[1]-a[1]).splice(0, 5).map(e => e[0]))

			const processedHistogram = new Map()
			for (let ps of popularSubjects) {
				processedHistogram.set(ps, histogram.get(ps))
				histogram.delete(ps)
			}
			processedHistogram.set('others', [...histogram.values()].reduce((acc, val) => acc + val, 0))
			return {
				labels: [...processedHistogram.keys()],
				datasets: [{
					data: [...processedHistogram.values()],
				}]
			}
		},

		options: () => ({
			plugins: {
				legend: {
					display: false
				}
			}
		}),
	}
}

function auxChart() {
	return {
		id: 'trade-aux',
		type: 'line',
		className: 'w-[500px] h-[500px]',
		title: 'Trading volume in last few blocks',

		targetNumberOfPoints: (controls) => controls.numberOfSamples,

		query: (controls) => (`
			subscription {
				blockStats(limit: ${controls.numberOfSamples}, orderBy: block_DESC) {
					block ethVolume
				}
			}
		`),

		data: (rawData) => {
//			console.log(rawData)
			return rawData ?
				{
					datasets: [{
//						label: 'Total eth volume',
						data: rawData.data.blockStats.map( ({ block, ethVolume }) => ({x: block, y: weiStringToEthAmount(ethVolume)})).reverse()
					}]
				} : {
					datasets: [{
//						label: 'Total eth volume',
						data: []
					}]
				}
		},

		options: () => ({
			scales: {
				x: { type: 'linear' },
				y: {
					type: 'linear',
					title: {
						display: true,
						text: 'ETH'
					}
				}
			},
			plugins: {
				legend: {
					display: false
				}
			},
			aspectRatio: 1.62
		}),

		controls: [
			{
				id: 'numberOfSamples',
				title: 'Blocks:',
				type: 'dropdown',
				options: [10, 20, 40],
				default: 20
			},
		],
	}
}
