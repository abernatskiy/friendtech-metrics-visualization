import Link from 'next/link'

import { title, streamConfigs } from '../streams'

export default function Layout({ children, currentPageId }) {
	const highlightedLinkClassName = 'border-black border-2'
	const overviewLinkClass = currentPageId==='Overview' ? highlightedLinkClassName : ''
	const streams = Object.keys(streamConfigs)
	return (
		<div className="flex flex-col items-center">
		{
			streams.length>1 ?
			<>
				<h1 className="text-4xl max-w-xl">{title}</h1>
				<div className="flex w-full h-full max-w-2xl justify-between">
					<Link href="/" className={overviewLinkClass} key='Overview'>Overview</Link>
					{
						streams.map(k => (
							<Link href={`/${k}`} className={currentPageId===k ? highlightedLinkClassName : ''} key={k}>{streamConfigs[k].description}</Link>
						))
					}
				</div>
			</> :
			<>
				<h1 className="text-4xl max-w-xl">{`${title}: ${streamConfigs[streams[0]].description}`}</h1>
			</>
		}
		<main className="w-full h-full">
			{children}
		</main>
		</div>
	)
}
