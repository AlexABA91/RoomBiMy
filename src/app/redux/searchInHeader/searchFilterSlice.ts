import { CardBiProps } from '@/app/type/type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type searchFilterState = {
	collection: CardBiProps[] | null
}

const initialState: searchFilterState = {
	collection: null,
}

const searchFilterSlice = createSlice({
	name: 'filterSearchState',
	initialState,
	reducers: {
		setSearchFilterState(state, action: PayloadAction<CardBiProps[] | null>) {
			state.collection = action.payload
		},
		setAddNextFilterData(state, action: PayloadAction<CardBiProps[]>) {
			if (action.payload.length > 0) {
				action.payload.forEach(item => {
					state.collection?.push(item)
				})
			}
		},
		setSearchFilterStateDefault(state) {
			state.collection = null
		},
	},
})
export const {
	setSearchFilterState,
	setSearchFilterStateDefault,
	setAddNextFilterData,
} = searchFilterSlice.actions

export default searchFilterSlice.reducer
