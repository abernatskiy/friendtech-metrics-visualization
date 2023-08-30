import ControlledChart from './controlledChart'

export default function Multichart({ url, chartDefinitions }) {
	let k = 0
	return (
		<div className="flex flex-wrap w-full justify-center">
			{
				chartDefinitions.map(cd => (
					<div className={cd.className} key={k++}>
						<ControlledChart url={url} chartDefinition={cd} />
					</div>
				))
			}
		</div>
	)
}
