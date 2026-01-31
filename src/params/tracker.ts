// Matches 't' or 't-<id>' patterns
export function match(param: string): boolean {
	return param === 't' || param.startsWith('t-');
}
