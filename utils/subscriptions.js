import * as graphqlWs from 'graphql-ws'

let client

export function subscribeToTrades() {
	client = graphqlWs.createClient({url: 'wss://squid.subsquid.io/friendtech-metrics/graphql'})
	client.subscribe(
		{
			query: `
				subscription { trades(orderBy: block_DESC, limit: 1) {
					block txnHash
				}}
			`,
		},
		{
			next: (data) => { console.log(`Latest trades: ${JSON.stringify(data.data.trades[0])}`) },
			error: (error) => { console.error('error', error) },
			complete: () => { console.log('done!') },
		}
	)
	client.subscribe(
		{
			query: `
				subscription { trades(orderBy: block_DESC, limit: 3) {
					block txnHash
				}}
			`,
		},
		{
			next: (data) => { console.log(`Not-so-latest trades: ${JSON.stringify(data.data.trades.slice(-1)[0])}`) },
			error: (error) => { console.error('error', error) },
			complete: () => { console.log('done!') },
		}
	)
}
