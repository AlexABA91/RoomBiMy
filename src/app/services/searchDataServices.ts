'use server'
debugger
import { CardBiProps, DataSearchForSorting } from '../type/type'
const searchDataService = async (
	data: DataSearchForSorting,
	page = 1,
	pageSize = 6
) => {
	const urlSearch = process.env.NEXT_GET_SEARCH_DATA //'https://localhost:7158/api/DataSearchForSorting/sort/'
	if (urlSearch === undefined) return null
	try {
		// const requestData = { ...data, page, pageSize }
		console.log('requestData', data)
		const response = await fetch(
			`${urlSearch}?page=${page}&pageSize=${pageSize}`,
			{
				method: 'POST',
				cache: 'no-store',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			}
		)
		if (!response.ok) {
			console.log(`HTTP error! status: ${response.status}`)
			return [] as CardBiProps[]
		}

		const searchDataList: CardBiProps[] = await response.json()
		console.log('searchDataList', searchDataList)
		return searchDataList
	} catch (e) {
		console.error('Could not fetch data:', e)
		return [] as CardBiProps[]
	}
}
export default searchDataService
