import { useSyncExternalStore, useCallback, useRef } from 'react'
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'

import { getSubscribeFunction, getGetSnapshotFunction } from '../utils/subscriptions'

export default function Livechart({ url, chartDefinition }) {
	const id = chartDefinition.id
	const query = chartDefinition.query()

	const subscribe = useCallback(getSubscribeFunction(url, id, query), [url, id, query])
	const getSnapshot = getGetSnapshotFunction(chartDefinition.id)
	const data = useSyncExternalStore(subscribe, getSnapshot)

	return (
		<Chart
			type={chartDefinition.type}
			data={chartDefinition.data(data)}
			options={chartDefinition.options()}
			plugins={chartDefinition.plugins || []}
		/>
	)
}
