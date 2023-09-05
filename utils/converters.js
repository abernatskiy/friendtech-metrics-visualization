export function weiStringToEthAmount(weiStr) {
	const signlessWeiStr = weiStr[0] === '-' ? weiStr.substr(1) : weiStr.substr(0)
	const integerPartDigits = signlessWeiStr.length - 18
	const integerPart = integerPartDigits>0 ? signlessWeiStr.substr(0, integerPartDigits) : '0'
	const fractionalPart = integerPartDigits>0 ? signlessWeiStr.substr(integerPartDigits) : '0'.repeat(-integerPartDigits)+signlessWeiStr
	const signlessNum = Number(integerPart + '.' + fractionalPart)
	return weiStr[0] === '-' ? -signlessNum : signlessNum
}
