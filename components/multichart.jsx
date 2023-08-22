import Livechart from './livechart'

export default function Multichart({ chartDefinitions }) {
	let k = 0
	return (
		<div className="flex flex-wrap w-full justify-center">
			{
				chartDefinitions.map(cd => (
					<div className={cd.className} key={k++}>
						<Livechart chartDefinition={cd} />
					</div>
				))
			}
		</div>
	)
}
