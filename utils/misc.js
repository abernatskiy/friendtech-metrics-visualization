export function arraysAreEqual(rhs, lhs) {
	return Array.isArray(rhs) && Array.isArray(lhs) && rhs.length===lhs.lenght && rhs.every((e, i) => e === lhs[i])
}

export function createOrIncrementMapField(map, key, increment) {
	if (map.has(key)) {
		map.set(key, map.get(key)+increment)
	}
	else {
		map.set(key, increment)
	}
}
