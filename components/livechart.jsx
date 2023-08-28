import { useSyncExternalStore, useCallback, useState } from 'react'
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'

import { getSubscribeFunction, getGetSnapshotFunction } from '../utils/subscriptions'

import { Dropdown } from 'primereact/dropdown'

function getInitialControlsState(controlsDefinition) {
	const out = {}
	for (let ctrl of controlsDefinition) {
		if (ctrl.type === 'listBox') {
			out[ctrl.id] = ctrl.default
		}
	}
	return out
}

export default function Livechart({ url, chartDefinition }) {
	const controlsDefinition = chartDefinition.controls || []
	const [ controls, setControls ] = useState(getInitialControlsState(controlsDefinition))

	console.log('controls are', controls)

	const id = chartDefinition.id
	const query = chartDefinition.query()

	const subscribe = useCallback(getSubscribeFunction(url, id, query), [url, id, query])
	const getSnapshot = getGetSnapshotFunction(chartDefinition.id)
	const data = useSyncExternalStore(subscribe, getSnapshot)

    const [selectedCity, setSelectedCity] = useState(null);

	return (
		<>
		<Chart
			type={chartDefinition.type}
			data={chartDefinition.data(data)}
			options={chartDefinition.options()}
			plugins={chartDefinition.plugins || []}
		/>
		{controlsDefinition.map((cd) => cd.type === 'dropdown' ? (
			<div className="card flex justify-content-center" key={cd.id}>
				<Dropdown
					value={selectedCity}
					onChange={(e) => setSelectedCity(e.value)}
					options={cd.options}
					optionLabel="name"
					placeholder="Select a value"
					className="w-full md:w-14rem"
				/>
			</div>
		) : (<></>))}
		</>
	)
}
