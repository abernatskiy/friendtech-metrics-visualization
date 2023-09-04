export default function Text({ data, controls, chartDefinition }) {
	const processedData = chartDefinition.data(data)
	console.log('data:', data)
	return (
		<div className="h-full flex flex-col justify-top items-left content-center align-middle">
			{processedData.text.map((t, i) => (<p key={i} className="pt-1 pb-1">{t}</p>))}
		</div>
	)
}
