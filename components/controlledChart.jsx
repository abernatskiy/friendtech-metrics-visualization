import { useSyncExternalStore, useCallback, useState, useRef } from 'react'
import { Chart } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import { Dropdown } from 'primereact/dropdown'

import { getSubscribeFunction, getGetSnapshotFunction } from '../utils/subscriptions'
import TimeSeries from './timeSeries'

function getInitialControlsState(controlsDefinition) {
	const out = {}
	for (let ctrl of controlsDefinition) {
		if (ctrl.type === 'dropdown') {
			out[ctrl.id] = ctrl.default
		}
	}
	return out
}

export default function ControlledChart({ url, chartDefinition }) {
	const controlsDefinition = chartDefinition.controls || []
	const [ controls, setControls ] = useState(getInitialControlsState(controlsDefinition))

	const id = chartDefinition.id
	const query = chartDefinition.query(controls)

	const subscribe = useCallback(getSubscribeFunction(url, id, query), [url, id, query])
	const getSnapshot = getGetSnapshotFunction(chartDefinition.id)
	const data = useSyncExternalStore(subscribe, getSnapshot)

	return (
		<>
		<TimeSeries
			data={data}
			controls={controls}
			chartDefinition={chartDefinition}
		/>
		{controlsDefinition.map((cd) => cd.type === 'dropdown' ? (
			<div className="card flex justify-content-center" key={cd.id}>
				<Dropdown
					value={controls[cd.id]}
					onChange={(e) => {
						let newControls = structuredClone(controls)
						newControls[cd.id] = e.value
						setControls(newControls)
					}}
					options={cd.options}
					placeholder="Select a value"
					className="w-full md:w-14rem"
				/>
			</div>
		) : (<></>))}
		</>
	)
}
