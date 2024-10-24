export function loadState(key: string) {
	try {
		const jsonState = localStorage.getItem(key);
		if (!jsonState) {
			return undefined;
		}
		return JSON.parse(jsonState);
	} catch (e) {
		console.error(e);
		return undefined;
	}
}

export function saveState<T>(stete: T, key: string) {
	const stringState = JSON.stringify(stete);
	localStorage.setItem(key, stringState);
}
