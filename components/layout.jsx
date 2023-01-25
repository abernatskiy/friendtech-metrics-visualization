import Link from 'next/link'

import { streamConfigs } from '../streams'

export default function Layout({ children, currentPageId }) {
	return (
		<div className="flex flex-col items-center">
		<h1 className="text-4xl max-w-xl">Dopex data dashboard</h1>
		<div className="flex w-full max-w-2xl justify-between">
			<Link href="/">Overview</Link>
			{Object.keys(streamConfigs).map(k => (
				<Link href={`/${k}`}>{streamConfigs[k].description}</Link>
			))}
		</div>
		<main>
			{children}
		</main>
		</div>
	)
}
