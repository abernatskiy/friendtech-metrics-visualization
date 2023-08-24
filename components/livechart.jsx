import { useSyncExternalStore, useCallback } from 'react'
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'

import { getSubscribeFunction, getGetSnapshotFunction } from '../utils/subscriptions'

export default function Livechart({ url, chartDefinition }) {
	const subscribe = useCallback(getSubscribeFunction(url, chartDefinition.id, chartDefinition.query), [url, chartDefinition])
	const getSnapshot = getGetSnapshotFunction(chartDefinition.id)
	const data = useSyncExternalStore(subscribe, getSnapshot)
	console.log('Here it is')
	console.log(data)
	return (
		<Chart
			type={chartDefinition.type}
			data={chartDefinition.data}
			options={chartDefinition.options}
			plugins={chartDefinition.plugins || []}
		/>
	)
}
