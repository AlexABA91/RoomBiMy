import { SearchBtnEnum } from '@/app/type/type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SearchBtnSwitcherState = {
	bntState: number
}

const initialState: SearchBtnSwitcherState = {
	bntState: SearchBtnEnum.DisableAll,
}

const searchBtnStateSlice = createSlice({
	name: 'btnSearchState',
	initialState,
	reducers: {
		setBtnState(state, action: PayloadAction<number>) {
			if (state.bntState === action.payload)
				action.payload = SearchBtnEnum.DisableAll

			state.bntState = action.payload
		},
	},
})
export const { setBtnState } = searchBtnStateSlice.actions

export default searchBtnStateSlice.reducer
