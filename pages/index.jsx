import Head from 'next/head'

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
					<a href="https://nextjs.org/docs" className="border-2 border-black basis-1/2">
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
			</main>
		</div>
	)
}
