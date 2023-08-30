export const description = 'Trade events'

export const allCharts = [ auxChart ]

export function mainChart() {
	return {
		id: 'trade-main',
		type: 'scatter',
//		className: 'w-[2000px]',

		query: () => (`
			subscription { trades(orderBy: block_DESC, limit: 1) {
				block txnHash
			}}
		`),

		data: (rawData) => {
			return rawData ?
				{
					datasets: [{
						label: 'Trade main',
						data: [{x: 1, y: 2}, {x: 2, y: 1}, {x: 3, y: 2}]
					}]
				} : {
					datasets: [{
						label: 'Trade main',
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

	}
}

function auxChart() {
	return {
		id: 'trade-aux',
		type: 'scatter',
//		className: 'w-[1000px]',

//		accumulatePoints: 20,

		query: () => (`
			subscription {
				volumeByBlocks(limit: 10, orderBy: block_DESC) {
					block totalEthAmount
				}
			}
		`),

		data: (rawData) => {
//			console.log(rawData)
			return rawData ?
				{
					datasets: [{
						label: 'Total eth volume',
						data: rawData.data.volumeByBlocks.map( ({ block, totalEthAmount }) => ({x: block, y: totalEthAmount})).reverse()
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
