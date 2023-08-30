import { useSyncExternalStore, useCallback, useState, useRef } from 'react'
import { Chart } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

import { getTail } from '../utils/chartData'

export default function TimeSeries({ data, controls, chartDefinition }) {
	const chartRef = useRef()
	const [ chartData, setChartData ] = useState({ datasets: [ { label: 'Tot eth vol', data: [] } ]})

	if (data) {
		const newChartData = chartDefinition.data(data)
		const tail = getTail(chartData.datasets[0].data, newChartData.datasets[0].data)
		// console.log('particular datas:', JSON.stringify([chartData.datasets[0].data, newChartData.datasets[0].data]))
		// console.log('tail:', tail)
		if (tail) {
			console.log('pushing the tail:', tail)
			const configTargetLength = chartDefinition.targetNumberOfPoints && chartDefinition.targetNumberOfPoints(controls)
			const targetLength = configTargetLength ?? chartData.datasets[0].data.length
			if (targetLength>0 && chartData.datasets[0].data.length+tail.length>targetLength) {
				chartData.datasets[0].data.splice(0, chartData.datasets[0].data.length+tail.length-targetLength)
			}
			chartData.datasets[0].data.push(...tail)
			console.log('new length of dataset0:', chartData.datasets[0].data.length)
			chartRef.current.update()
		}
		else {
			console.log('replacing dataset:', JSON.stringify([chartData, newChartData]))
			chartData.datasets[0].data.length = 0
			chartData.datasets[0].data.push(...newChartData.datasets[0].data)
			chartRef.current.update()
			// setChartData(newChartData)
		}
	}

	return (
		<Chart
			ref={chartRef}
			type={chartDefinition.type}
			data={chartData}
			options={chartDefinition.options()}
			plugins={chartDefinition.plugins || []}
		/>
	)
}
