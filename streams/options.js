export const description = 'Options popularity'

export function mainChart() {
	return {
		type: 'scatter',
		data: {
			datasets: [{
				label: 'Option popularity by type',
				data: [ {x: 1, y: 1}, {x: 2, y: 2}, {x: 3, y: 1} ]
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

export const allCharts = [ mainChart ]
