import { useSyncExternalStore, useCallback, useState, useRef } from 'react'
import { Chart } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
//import { Chart } from 'primereact/chart'
import { Dropdown } from 'primereact/dropdown'

import { getSubscribeFunction, getGetSnapshotFunction } from '../utils/subscriptions'

function getInitialControlsState(controlsDefinition) {
	const out = {}
	for (let ctrl of controlsDefinition) {
		if (ctrl.type === 'dropdown') {
			out[ctrl.id] = ctrl.default
		}
	}
	return out
}

function pointsEqual(p0, p1) {
	return p0.x === p1.x && p0.y === p1.y
}

function getTail(tailless, tailful) {
	if (tailful.length === 0) {
//		console.log('empty tailful -> null')
		return null
	}
	if (tailless.length === 0) {
		return tailful
	}

	let i
	let j = 0
	for (i=0; i<tailless.length; i++) {
		if (pointsEqual(tailful[j], tailless[i])) {
			break
		}
	}
	if (i === tailless.length) {
//		console.log('end of tailless -> null')
		return null
	}

	for (; i<tailless.length; i++, j++) {
		if ( !tailful[j] ) {
			return []
		}
		if ( !pointsEqual(tailless[i], tailful[j]) ) {
//			console.log('alignment check failed -> null')
			return null
		}
	}
	return tailful.slice(j)
}

export default function Livechart({ url, chartDefinition }) {
	const controlsDefinition = chartDefinition.controls || []
	const [ controls, setControls ] = useState(getInitialControlsState(controlsDefinition))

	// console.log('controls are', controls)

	const id = chartDefinition.id
	const query = chartDefinition.query()

	const subscribe = useCallback(getSubscribeFunction(url, id, query), [url, id, query])
	const getSnapshot = getGetSnapshotFunction(chartDefinition.id)
	const data = useSyncExternalStore(subscribe, getSnapshot)

	const chartRef = useRef()
	const [ chartData, setChartData ] = useState({ datasets: [ { label: 'Tot eth vol', data: [] } ]})

	if (data) {
		const newChartData = chartDefinition.data(data)
		const tail = getTail(chartData.datasets[0].data, newChartData.datasets[0].data)
		console.log('particular datas:', JSON.stringify([chartData.datasets[0].data, newChartData.datasets[0].data]))
		console.log('tail:', tail)
		if (tail) {
			console.log('pushing the tail:', tail)
			chartData.datasets[0].data.push(...tail)
			console.log('new length of dataset0:', chartData.datasets[0].data.length)
			chartRef.current.update()
		}
		else {
//			console.log('datas', chartData, newChartData)
			console.log('replacing dataset')
//			setChartData(newChartData)
			chartData.datasets[0].data.length = 0
			chartData.datasets[0].data.push(...newChartData.datasets[0].data)
			chartRef.current.update()
		}
	}

	return (
		<>
		<Chart
			ref={chartRef}
			type={chartDefinition.type}
			data={chartData}
			options={chartDefinition.options()}
			plugins={chartDefinition.plugins || []}
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
