import { DataSearchForSorting } from '@/app/type/type'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type SearchPriviesSearchObject = {
	searchObject: DataSearchForSorting
}
const initialState: SearchPriviesSearchObject = {
	searchObject: {} as DataSearchForSorting,
}
const searchPriviesSearchObjectSlice = createSlice({
	name: 'searchPriviesSearchObject',
	initialState,
	reducers: {
		setSearchObject(state, action: PayloadAction<DataSearchForSorting>) {
			state.searchObject = action.payload
		},
	},
})

export const { setSearchObject } = searchPriviesSearchObjectSlice.actions
export default searchPriviesSearchObjectSlice.reducer
