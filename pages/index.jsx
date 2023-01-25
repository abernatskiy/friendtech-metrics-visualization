import Head from 'next/head'
import Script from 'next/script'
import { doAllPlotting } from '../apichart/main'

export default function Home() {
	return (
		<div className="place-content-center">
			<Head>
				<title>Dopex data dashboard</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="flex flex-col items-center">
				<h1 className="text-4xl max-w-2xl">
					Dopex data dashboard
				</h1>

				<div className="flex flex-wrap max-w-2xl justify-center">
					<a href="https://google.com" className="border-2 border-black basis-1/2">
						<h3>Documentation &rarr;</h3>
						<p>Find in-depth information about Next.js features and API.</p>
					</a>

					<a href="https://nextjs.org/learn" className="border-2 border-black basis-1/2">
						<h3>Learn &rarr;</h3>
						<p>Learn about Next.js in an interactive course with quizzes!</p>
					</a>

					<a href="https://github.com/vercel/next.js/tree/master/examples" className="border-2 border-black basis-1/2">
						<h3>Examples &rarr;</h3>
						<p>Discover and deploy boilerplate example Next.js projects.</p>
					</a>

					<a href="https://vercel.com/" className="border-2 border-black basis-1/2">
						<h3>Deploy &rarr;</h3>
						<p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
					</a>
				</div>

				<div>

		<div style={{width: '1000px'}}>
			<canvas id="liquidations-chart">
			</canvas>
		</div>

{/*
		<Script id="test-chart" onReady={() => {
			doAllPlotting('1 month')
		}}>

			// global handles for use in the UI
			var processTimescaleChange
			var resetZoom
			var recolorPoints
			var restylePoints

			// doAllPlotting('1 month')
		</Script>
*/}
		<Script id="test-chart" onReady={() => { doAllPlotting('1 month') }}>
			console.log('apparently I have to do something here')
		</Script>

{/*
		<label for="timescalesSelect">Timescale:</label>
		<select name="timescalesSelect" onchange="processTimescaleChange(this.value)" autocomplete="off">
			<option value="1 week">1 week</option>
			<option value="1 month" selected="selected">1 month</option>
			<option value="1 year">1 year</option>
			<option value="all">all</option>
		</select>
		<button onclick="resetZoom()">Reset zoom</button>
		<label for="colorChannelSelect">Colored with:</label>
		<select name="colorChannelSelect" onchange="recolorPoints(this.value)" autocomplete="off">
			<option value="collateralAsset">collateralAsset</option>
			<option value="debtAsset">debtAsset</option>
			<option value="user">user</option>
			<option value="liquidator" selected="selected">liquidator</option>
		</select>
		<label for="styleChannelSelect">Styled with:</label>
		<select name="styleChannelSelect" onchange="restylePoints(this.value)" autocomplete="off">
			<option value="collateralAsset">collateralAsset</option>
			<option value="debtAsset" selected="selected">debtAsset</option>
			<option value="user">user</option>
			<option value="liquidator">liquidator</option>
		</select>
		<p>WARNING! This version only shows liquidations collateralized with WETH. Other liquidations are not shown.</p>
*/}

				</div>

			</main>
		</div>
	)
}
