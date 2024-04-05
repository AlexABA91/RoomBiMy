import { useAppDispatch, useAppSelector } from '@/app/redux/hook'
import { SearchBtnEnum, ThemProps } from '@/app/type/type'
import React, { useEffect, useState } from 'react'
import style from '../Search.module.css'
import WhenDropDawn from './WhenDropDawn'

import { setBtnState } from '@/app/redux/searchInHeader/SearchBtnStateSlice'
import {
	setWhenObjDateCome,
	setWhenObjDateOut,
} from '@/app/redux/searchInHeader/SearchSlice'
import ClearInputBtn from '@/app/ui/clearInput/ClearInputBtn'
import { useTranslation } from 'react-i18next'

const WhenCome: React.FC<ThemProps> = ({ isTeamBlack }) => {
	const { t } = useTranslation()

	const [dateVieOnButtonSearch, setDateVieOnButtonSearch] = useState(
		t('AddADate')
	)
	const [drop, setWhenDropDawn] = useState(false)
	const dispatch = useAppDispatch()
	const calendarDateComStr = useAppSelector(
		state => state.searchReducer.DataSearchObj.whenObj.dateCome
	)
	const calendarDateDStr = useAppSelector(
		state => state.searchReducer.DataSearchObj.whenObj.dateOut
	)
	const btnState = useAppSelector(state => state.searchBtnStateReducer.bntState)
	useEffect(() => {
		btnState === SearchBtnEnum.WhenCome
			? setWhenDropDawn(true)
			: setWhenDropDawn(false)
	}, [btnState])

	useEffect(() => {
		if (calendarDateComStr !== '') {
			const calendarDate = new Date(calendarDateComStr)

			if (
				calendarDateDStr !== '' &&
				calendarDate > new Date(calendarDateDStr)
			) {
				dispatch(setWhenObjDateCome(calendarDateDStr))
				dispatch(setWhenObjDateOut(calendarDateComStr))
			} else if (
				calendarDateDStr !== '' &&
				calendarDate.toString() === new Date(calendarDateDStr).toString()
			) {
				const date = new Date(calendarDateDStr)
				const newDate = new Date(date.setDate(date.getDate() + 1))

				dispatch(setWhenObjDateCome(calendarDateComStr))
				dispatch(setWhenObjDateOut(newDate.toString()))
				setDateVieOnButtonSearch(formatted(calendarDate))
			} else {
				setDateVieOnButtonSearch(formatted(calendarDate))
				if (btnState !== SearchBtnEnum.SearchBtn) {
					dispatch(setBtnState(SearchBtnEnum.WhenDeparture))
				}
			}
		} else {
			setDateVieOnButtonSearch(t('AddADate'))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [calendarDateComStr, dispatch])

	const clearDateOnButton = (event: any) => {
		if (dateVieOnButtonSearch !== t('AddADate')) {
			event.preventDefault()
			dispatch(setWhenObjDateCome(''))
		}
	}
	const formatted = (date: Date): string => {
		const formatter = new Intl.DateTimeFormat(t('locale'), {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		})
		return formatter.format(date)
	}
	return (
		<>
			<div
				id='when'
				className={`p-0 ${style.resetButton} text-start  ${style.pText} ${
					isTeamBlack && drop ? style.btnBlackBacActive : style.btnStyle
				} ${isTeamBlack && !drop && style.btnBlackBac}`}
				onClick={() => dispatch(setBtnState(SearchBtnEnum.WhenCome))}
			>
				<div
					className={`mt-3 mb-3 ps-lg-4 ps-md-4 ps-xs-2 ${
						isTeamBlack ? `${style.borderRightWhite} ` : style.borderRightBlack
					} ${style.overflow}`}
				>
					<p className={`m-0 ${style.head}`}>{t('Arrival')}</p>
					<p className={`${style.colorTwo} m-0`}>{dateVieOnButtonSearch}</p>
				</div>
				{dateVieOnButtonSearch !== t('AddADate') && (
					<ClearInputBtn clearInput={clearDateOnButton} />
				)}
			</div>
			{drop && <WhenDropDawn setWhenObjDate={setWhenObjDateCome} />}
		</>
	)
}

export default WhenCome
