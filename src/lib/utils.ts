export function getAvailableID(items: any[]) {
	if (items.length === 0) return 1;
	const itemsIDs = items.map((item) => item.id);
	return Math.max(...itemsIDs) + 1;
}
