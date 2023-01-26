import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'

export default function Multichart({ chartDefinitions }) {
	console.log(chartDefinitions)
	let k = 0
	return (
		<div className="flex flex-wrap w-full justify-center">
			{
				chartDefinitions.map(cd => (
					<div className={cd.className} key={k++}>
						<Chart
							type={cd.type}
							data={cd.data}
							options={cd.options}
							plugins={cd.plugins || []}
						/>
					</div>
				))
			}
		</div>
	)
}
