import { useSyncExternalStore, useCallback, useState, useRef } from 'react'
import { Dropdown } from 'primereact/dropdown'

import { getSubscribeFunction, getGetSnapshotFunction } from '../utils/subscriptions'
import TimeSeries from './timeSeries'
import DoughnutOrPie from './doughnutOrPie'
import Text from './text'

function getInitialControlsState(controlsDefinition) {
	const out = {}
	for (let ctrl of controlsDefinition) {
		if (ctrl.type === 'dropdown') {
			out[ctrl.id] = ctrl.default
		}
	}
	return out
}

function renderChart(data, controls, chartDefinition) {
	switch (chartDefinition.type) {
		case 'line':
		case 'scatter':
			return <TimeSeries data={data} controls={controls} chartDefinition={chartDefinition}/>
		case 'doughnut':
		case 'pie':
		case 'bar':
			return <DoughnutOrPie data={data} controls={controls} chartDefinition={chartDefinition}/>
		case 'text':
			return <Text data={data} controls={controls} chartDefinition={chartDefinition}/>
		default:
			console.error(`Unsupported chart type ${chartDefiniton.type}`)
			return null
	}
}

function renderControl(controls, setControls, controlDefinition) {
	switch (controlDefinition.type) {
		case 'dropdown':
			return (
				<div className="card flex justify-content-center content-center" key={controlDefinition.id}>
					{controlDefinition.title ?
						<div className="flex items-center pr-2"><p>{controlDefinition.title}</p></div> :
						<></>
					}
					<Dropdown
						value={controls[controlDefinition.id]}
						onChange={(e) => {
							let newControls = structuredClone(controls)
							newControls[controlDefinition.id] = e.value
							setControls(newControls)
						}}
						options={controlDefinition.options}
						placeholder="Select a value"
						className=""
					/>
				</div>
			)
		default:
			console.error(`Unsupported control type ${controlDefinition.type}`)
			return null
	}
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
		{chartDefinition.title ?
			<div className="w-full text-center font-bold text-lg pb-4">
				{chartDefinition.title}
			</div> :
			<></>
		}
		{renderChart(data, controls, chartDefinition)}
		<div className="flex flex-wrap justify-left">
			{controlsDefinition.map((cd) => renderControl(controls, setControls, cd))}
		</div>
		</>
	)
}
