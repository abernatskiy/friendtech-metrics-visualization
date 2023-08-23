import Head from 'next/head'

import Layout from '../components/layout'
import Multichart from '../components/multichart'

import { url, title, streamConfigs } from '../streams'

export default function Home() {
	const streams = Object.keys(streamConfigs)
	return (
		<Layout currentPageId='Overview'>
			{
				streams.length>1 ?
				<>
					<Head>
						<title>{`${title} - Overview`}</title>
						<link rel="icon" href="/favicon.ico" />
					</Head>
					<Multichart url={url} chartDefinitions={[...Object.keys(streamConfigs).map(k => (streamConfigs[k].mainChart()))]}/>
				</> :
				<>
					<Head>
						<title>{`${title} - ${streams[0]}`}</title>
						<link rel="icon" href="/favicon.ico" />
					</Head>
					<Multichart url={url} chartDefinitions={streamConfigs[streams[0]].allCharts.map(cc => cc())}/>
				</>
			}
		</Layout>
	)
}
