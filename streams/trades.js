export const description = 'Trade events'

export const allCharts = [ mainChart, auxChart ]

export function mainChart() {
	return {
		id: 'trade-main',
		query: `
			subscription { trades(orderBy: block_DESC, limit: 1) {
				block txnHash
			}}
		`,
		type: 'scatter',
		data: {
			datasets: [{
				label: 'Trade main',
				data: [{x: 1, y: 2}, {x: 2, y: 1}, {x: 3, y: 2}]
			}]
		},
		options: {
			scales: {
				x: { type: 'linear' },
				y: { type: 'linear' }
			},
			plugins: {}
		},
		className: 'w-[1000px]'
	}
}

function auxChart() {
	return {
		id: 'trade-aux',
		query: `
			subscription { trades(orderBy: block_DESC, limit: 3) {
				block txnHash
			}}
		`,
		type: 'scatter',
		data: {
			datasets: [{
				label: 'Trade aux',
				data: [ {x: 1, y: 2}, {x: 2, y: 1}, {x: 3, y: 2} ]
			}]
		},
		options: {
			scales: {
				x: { type: 'linear' },
				y: { type: 'linear' }
			},
			plugins: {}
		},
		className: 'w-[1000px]'
	}
}
