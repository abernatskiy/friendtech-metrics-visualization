/* A React-compatible WS client supporting multiple subscriptions */

import * as graphqlWs from 'graphql-ws'

let wsurl
let client
let currentSubscriptions = new Map() // subscriptionId -> { query, mostRecentOutput, cleanup }

export function getSubscribeFunction(url, subscriptionId, query) {
	return (callback) => {
		if (!client) {
			client = graphqlWs.createClient({
				url,
				shouldRetry: () => true,
			})
			wsurl = url
		}
		else if (wsurl !== url) {
			console.error('error: multiple WebSocket connections are not yet supported')
			return undefined
		}

		currentSubscriptions.set(subscriptionId, { query })
		const cleanup = client.subscribe({ query }, {
			next: (data) => {
				// console.log(`got new data for ${subscriptionId}`)
				currentSubscriptions.get(subscriptionId).mostRecentOutput = data
				callback()
			},
			complete: () => {
				console.log(`all data received for ${subscriptionId}`)
			},
			error: (error) => {
				console.error('error:', error)
			},
		})
		currentSubscriptions.get(subscriptionId).cleanup = cleanup

		return () => {
			currentSubscriptions.get(subscriptionId).cleanup()
			currentSubscriptions.delete(subscriptionId)
			if (currentSubscriptions.size === 0) {
				client.dispose()
				client = undefined
				wsurl = undefined
			}
		}
	}
}

export function getGetSnapshotFunction(subscriptionId) {
	return () => {
		if (!currentSubscriptions.has(subscriptionId)) {
			// console.error('error:', `snapshot of ${subscriptionId} requested before the creation of the subscription`)
			return undefined
		}
		return currentSubscriptions.get(subscriptionId).mostRecentOutput
	}
}
