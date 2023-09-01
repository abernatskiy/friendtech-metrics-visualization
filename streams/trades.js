import { createOrIncrementMapField } from '../utils/misc'
import { weiStringToEthAmount } from '../utils/converters'

export const description = 'Trade events'

export const allCharts = [ mainChart, auxChart ]

export function mainChart() {
	return {
		id: 'trade-main',
		type: 'doughnut',
//		className: 'w-[2000px]',

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
					label: 'Subjects of last 100 trades',
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
		type: 'scatter',
//		className: 'w-[1000px]',

		targetNumberOfPoints: (controls) => controls.numberOfSamples,

		// the correct spelling is "subscription"
		query: (controls) => (`
			query {
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
						label: 'Total eth volume',
						data: rawData.data.blockStats.map( ({ block, ethVolume }) => ({x: block, y: ethVolume})).reverse()
					}]
				} : {
					datasets: [{
						label: 'Total eth volume',
						data: []
					}]
				}
		},

		options: () => ({
			scales: {
				x: { type: 'linear' },
				y: { type: 'linear' }
			},
			plugins: {}
		}),

		controls: [
			{
				id: 'numberOfSamples',
				type: 'dropdown',
				options: [10, 20, 40],
				default: 20
			},
		],
	}
}
