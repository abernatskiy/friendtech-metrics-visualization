import { createOrIncrementMapField } from '../utils/misc'
import { weiStringToEthAmount } from '../utils/converters'

export const description = 'Trade events'

export const allCharts = [ scalars, recentVolume, recentSubjects, allTimeSubjects, volumeTimeSeries ]

function scalars() {
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
					`buys ETH: ${weiStringToEthAmount(ats.ethBuyVolume)}`,
					`sells ETH: ${weiStringToEthAmount(ats.ethSellVolume)}`,
					`share volume: ${ats.shareVolume}`,
					`buys shares: ${ats.shareBuyVolume}`,
					`sells shares: ${ats.shareSellVolume}`,
					`protocol ETH: ${weiStringToEthAmount(ats.protocolEthTotal)}`,
					`subject ETH: ${weiStringToEthAmount(ats.subjectEthTotal)}`
				]
			}
		}
	}
}

function recentSubjects() {
	return {
		id: 'subjects-recent',
		type: 'doughnut',
		className: 'w-[450px]',
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
			processedHistogram.set('everyone else', [...histogram.values()].reduce((acc, val) => acc + val, 0))
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
					display: true,
					position: 'bottom'
				}
			}
		}),
	}
}

function recentVolume() {
	return {
		id: 'volume-recent',
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
				default: 10
			},
		],
	}
}

function volumeTimeSeries() {
	return {
		id: 'volume-full',
		type: 'line',
		className: 'w-[500px] h-[500px]',
		title: 'All time trading volume',

		query: (controls) => (`
			subscription {
				blockStats(limit: 100, orderBy: block_DESC) {
					block ethVolume
				}
			}
		`),

		data: (rawData) => {
			return rawData ?
				{
					datasets: [{
						data: rawData.data.blockStats.map( ({ block, ethVolume }) => ({x: block, y: weiStringToEthAmount(ethVolume)})).reverse()
					}]
				} : {
					datasets: [{
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
	}
}

function allTimeSubjects() {
	return {
		id: 'subjects-all-time',
		type: 'doughnut',
		className: 'w-[400px]',
		title: 'Top five subjects by ETH volume, all time',

		query: () => (`
			subscription {
				subjects(limit: 5, orderBy: totalEthVolume_DESC) {
					totalEthVolume address
				}
			}
		`),

		data: (rawData) => {
			if (!rawData) {
				return {labels: [], datasets: []}
			}

			return {
				labels: [...rawData.data.subjects.map(s => s.address)],
				datasets: [{
					data: [...rawData.data.subjects.map(s => weiStringToEthAmount(s.totalEthVolume))],
				}]
			}
		},

		options: () => ({
			plugins: {
				legend: {
					display: true,
					position: 'bottom'
				}
			}
		}),
	}
}
