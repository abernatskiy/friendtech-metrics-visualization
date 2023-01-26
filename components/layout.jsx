import Link from 'next/link'

import { streamConfigs } from '../streams'

export default function Layout({ children, currentPageId }) {
	let highlightedLinkClassName = 'border-black border-2'
	let overviewLinkClass = currentPageId==='Overview' ? highlightedLinkClassName : ''
	return (
		<div className="flex flex-col items-center">
		<h1 className="text-4xl max-w-xl">Dopex data dashboard</h1>
		<div className="flex w-full max-w-2xl justify-between">
			<Link href="/" className={overviewLinkClass} key='Overview'>Overview</Link>
			{
				Object.keys(streamConfigs).map(k => (
					<Link href={`/${k}`} className={currentPageId===k ? highlightedLinkClassName : ''} key={k}>{streamConfigs[k].description}</Link>
				))
			}
		</div>
		<main>
			{children}
		</main>
		</div>
	)
}
