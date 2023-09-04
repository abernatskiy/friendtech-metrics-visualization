import ControlledChart from './controlledChart'

export default function Multichart({ url, chartDefinitions }) {
	let k = 0
	return (
		<div className="flex flex-wrap w-full justify-center">
			{
				chartDefinitions.map(cd => (
					<div className="p-4 m-4 border-2 rounded-xl" key={k++}>
						<ControlledChart url={url} chartDefinition={cd} />
					</div>
				))
			}
		</div>
	)
}
