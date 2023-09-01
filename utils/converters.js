export function weiStringToEthAmount(weiStr) {
	const integerPartDigits = weiStr.length - 18
	const integerPart = integerPartDigits>0 ? weiStr.substr(0, integerPartDigits) : '0'
	const fractionalPart = integerPartDigits>0 ? weiStr.substr(integerPartDigits) : '0'.repeat(-integerPartDigits)+weiStr
	return Number(integerPart + '.' + fractionalPart)
}
