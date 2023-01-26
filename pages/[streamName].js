import Head from 'next/head'

import Layout from '../components/layout'
import Multichart from '../components/multichart'

import { streamConfigs } from '../streams'

export default function StreamDetailsPage({ streamName }) {
	return (
		<Layout currentPageId={streamName}>
			<Head>
				<title>Dopex data dashboard - {streamConfigs[streamName].description}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Multichart chartDefinitions={streamConfigs[streamName].allCharts.map(cc => cc())}/>
		</Layout>
	)
}

export async function getStaticProps({ params }) {
	return {
		props: {
			streamName: params.streamName
		}
	}
}

export async function getStaticPaths() {
	return {
		paths: Object.keys(streamConfigs).map(k => ({
			params: {
				streamName: k
			}
		})),
		fallback: false
	}
}
