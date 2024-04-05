'use server'

import { AutoCompleteItem, AutoCompleteList } from '@/app/type/type'

const autoCompleteService = async (
	inputString: string,
	locale: string = 'en'
) => {
	//const urlSearch = process.env.NEXT_AUTOCOMPLETE
	const urlSearch = 'https://nominatim.openstreetmap.org/search?'
	if (urlSearch === undefined) return null

	const queryParams = new URLSearchParams({
		q: inputString,
		addressdetails: '1',
		format: 'jsonv2',
		limit: '6',
	})

	try {
		const response = await fetch(`${urlSearch}${queryParams.toString()}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept-Language': locale,
			},
		})
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}
		const data: AutoCompleteItem[] = await response.json()

		console.log(data)
		return data
	} catch (e) {
		console.error('Could not fetch data:', e)
		return null
	}
}
export default autoCompleteService
