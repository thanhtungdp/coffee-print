export function checkLoadMore({ itemPerPage, page, totalItem }) {
	if (!itemPerPage) return false;
	if (page * itemPerPage < totalItem) return true;
	return false;
}
