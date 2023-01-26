export const description = 'rDPX distribution'

export function mainChart() {
	return {
		type: 'scatter',
		data: {
			datasets: [{
				label: 'rDPX emission events',
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

export const allCharts = [ mainChart, auxChart ]

function auxChart() {
	return {
		type: 'scatter',
		data: {
			datasets: [{
				label: 'rDPX top receivers',
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
