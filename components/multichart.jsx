import Livechart from './livechart'

export default function Multichart({ url, chartDefinitions }) {
	let k = 0
	return (
		<div className="flex flex-wrap w-full justify-center">
			{
				chartDefinitions.map(cd => (
					<div className={cd.className} key={k++}>
						<Livechart url={url} chartDefinition={cd} />
					</div>
				))
			}
		</div>
	)
}
