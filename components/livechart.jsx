import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'

export default function Livechart({ chartDefinition }) {
	console.log(chartDefinition)
	return (
		<Chart
			type={chartDefinition.type}
			data={chartDefinition.data}
			options={chartDefinition.options}
			plugins={chartDefinition.plugins || []}
		/>
	)
}
