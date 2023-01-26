import Head from 'next/head'

import Layout from '../components/layout'
import Multichart from '../components/multichart'

import { streamConfigs } from '../streams'

export default function Home() {
	return (
		<Layout currentPageId='Overview'>
			<Head>
				<title>Dopex data dashboard - Overview</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Multichart chartDefinitions={[...Object.keys(streamConfigs).map(k => (streamConfigs[k].mainChart()))]}/>
		</Layout>
	)
}
