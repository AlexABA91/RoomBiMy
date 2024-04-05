import { useAppDispatch, useAppSelector, useWindowSize } from '@/app/redux/hook'
import { setBtnState } from '@/app/redux/searchInHeader/SearchBtnStateSlice'
import {
	setWhenObjDateCome,
	setWhenObjDateOut,
} from '@/app/redux/searchInHeader/SearchSlice'
import { SearchBtnEnum, ThemProps } from '@/app/type/type'
import ClearInputBtn from '@/app/ui/clearInput/ClearInputBtn'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import style from '../Search.module.css'
import WhenDropDawn from './WhenDropDawn'
const WhenDeparture: React.FC<ThemProps> = ({ isTeamBlack }) => {
	const [width, hight] = useWindowSize()
	const [borderStyle, setBorderStyle] = useState('')
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const calendarDateComStr = useAppSelector(
		state => state.searchReducer.DataSearchObj.whenObj.dateCome
	)
	const calendarDateDStr = useAppSelector(
		state => state.searchReducer.DataSearchObj.whenObj.dateOut
	)

	const [dateVieOnButtonSearch, setDateVieOnButtonSearch] = useState(
		t('AddADate')
	)
	const [drop, setWhenDropDawn] = useState(false)
	const btnState = useAppSelector(state => state.searchBtnStateReducer.bntState)

	useEffect(() => {
		btnState === SearchBtnEnum.WhenDeparture
			? setWhenDropDawn(true)
			: setWhenDropDawn(false)
	}, [btnState])

	useEffect(() => {
		setBorderStyle(
			width < 576
				? ''
				: isTeamBlack
				? style.borderRightWhite
				: style.borderRightBlack
		)
	}, [isTeamBlack, width])

	useEffect(() => {
		if (calendarDateDStr !== '') {
			const calendarDateD = new Date(calendarDateDStr)
			if (
				calendarDateComStr !== '' &&
				calendarDateD < new Date(calendarDateComStr)
			) {
				dispatch(setWhenObjDateCome(calendarDateDStr))
				dispatch(setWhenObjDateOut(calendarDateComStr))
			} else if (
				calendarDateDStr !== '' &&
				calendarDateD.toString() === new Date(calendarDateComStr).toString()
			) {
				const date = new Date(calendarDateD)
				const newDate = new Date(date.setDate(date.getDate() + 1))

				dispatch(setWhenObjDateCome(calendarDateComStr))
				dispatch(setWhenObjDateOut(newDate.toString()))
				setDateVieOnButtonSearch(formatted(calendarDateD))
			} else {
				setDateVieOnButtonSearch(formatted(calendarDateD))

				if (btnState !== SearchBtnEnum.SearchBtn) {
					dispatch(setBtnState(SearchBtnEnum.Who))
				}
			}
		} else {
			setDateVieOnButtonSearch(t('AddADate'))
		}
	}, [dispatch, calendarDateDStr])
	const clearDateOnButton = (event: any) => {
		if (dateVieOnButtonSearch !== t('AddADate')) {
			event.preventDefault()
			dispatch(setWhenObjDateOut(''))
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
				className={`p-0 ${style.resetButton} text-start  ${style.pText} ${
					isTeamBlack && drop ? style.btnBlackBacActive : style.btnStyle
				} ${isTeamBlack && !drop && style.btnBlackBac}`}
				id='whenD'
				onClick={() => dispatch(setBtnState(SearchBtnEnum.WhenDeparture))}
			>
				<div className={`mt-3 mb-3 ps-lg-4 ps-md-4 ps-xs-2  ${borderStyle}`}>
					<p className={`${style.head} m-0`}>{t('Departure')}</p>
					<p className={`${style.colorTwo}  m-0`}>{dateVieOnButtonSearch}</p>
				</div>
				{dateVieOnButtonSearch !== t('AddADate') && (
					<ClearInputBtn clearInput={clearDateOnButton} />
				)}
			</div>
			{drop && <WhenDropDawn setWhenObjDate={setWhenObjDateOut} />}
		</>
	)
}

export default WhenDeparture
