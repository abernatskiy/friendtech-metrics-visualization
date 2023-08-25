export const description = 'Trade events'

export const allCharts = [ mainChart, auxChart ]

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

		query: () => (`
			subscription { trades(orderBy: block_DESC, limit: 20) {
				block ethAmount
			}}
		`),

		data: (rawData) => {
//			console.log(rawData)
			return rawData ?
				{
					datasets: [{
						label: 'Trade aux',
						data: rawData.data.trades.map( ({ block, ethAmount }) => ({x: block, y: ethAmount}))
					}]
				} : {
					datasets: [{
						label: 'Trade aux',
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
