import { useState, useEffect, useRef } from 'react'
import { Chart } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

import { arraysAreEqual } from '../utils/misc'

export default function DoughnutOrPie({ data, controls, chartDefinition }) {
	return (
		<div className={chartDefinition.className}>
			<Chart
				type={chartDefinition.type}
				data={chartDefinition.data(data)}
				options={chartDefinition.options()}
				plugins={chartDefinition.plugins || []}
			/>
		</div>
	)
}
