import { useAppDispatch, useAppSelector, useWindowSize } from '@/app/redux/hook'
import { setBtnState } from '@/app/redux/searchInHeader/SearchBtnStateSlice'
import {
	setWhoObjAnimalsCount,
	setWhoObjBabyCount,
	setWhoObjChildrenCount,
	setWhoObjGestCount,
} from '@/app/redux/searchInHeader/SearchSlice'
import { SearchBtnEnum, ThemProps } from '@/app/type/type'
import ClearInputBtn from '@/app/ui/clearInput/ClearInputBtn'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import style from '../Search.module.css'
import WhoDropDawn from './WhoDropDawn'
const Who: React.FC<ThemProps> = ({ isTeamBlack }) => {
	const [width, hight] = useWindowSize()
	const { t } = useTranslation()
	const [gestString, SetGestString] = useState(t('AddGuests'))
	const [isClearActive, setIsClearActive] = useState(false)
	const [borderStyle, setBorderStyle] = useState('')
	const [drop, setWhenDropDawn] = useState(false)
	const dispatch = useAppDispatch()
	const btnState = useAppSelector(state => state.searchBtnStateReducer.bntState)
	const whoObj = useAppSelector(
		state => state.searchReducer.DataSearchObj.whyObj
	)
	const clearWhoInput = (event: any) => {
		event.preventDefault()
		event.stopPropagation()

		dispatch(setWhoObjGestCount(0))
		dispatch(setWhoObjChildrenCount(0))
		dispatch(setWhoObjBabyCount(0))
		dispatch(setWhoObjAnimalsCount(0))
	}
	useEffect(() => {
		setBorderStyle(
			width > 992 || width < 576
				? ''
				: isTeamBlack
				? style.borderRightWhite
				: style.borderRightBlack
		)
	}, [isTeamBlack, width])

	useEffect(() => {
		let str = `${whoObj.gestsCount + whoObj.childrenCount}`
		switch (str) {
			case '0':
				str = t('AddGuests')
				break
			case '1':
				str = t('Guest')
				break
			case '2':
			case '3':
				str = `${str} ${t('AGuests')}`
				break
			default:
				str = `${str} ${t('Guests')}`
				break
		}
		if (whoObj.babyCount > 0) {
			str = `${str}, ${whoObj.babyCount} ${t('Babies')} `
		}
		if (whoObj.animalsCount > 0) {
			str = `${str}, ${whoObj.animalsCount} ${t('Animals')} `
		}
		setIsClearActive(str !== t('AddGuests') ? true : false)
		SetGestString(() => {
			return str
		})
	}, [t, whoObj])
	useEffect(() => {
		btnState === SearchBtnEnum.Who
			? setWhenDropDawn(true)
			: setWhenDropDawn(false)
	}, [btnState])

	return (
		<>
			<div
				id='who'
				className={`p-0 ${style.resetButton} text-start  ${style.pText} ${
					isTeamBlack && drop ? style.btnBlackBacActive : style.btnStyle
				} ${isTeamBlack && !drop && style.btnBlackBac}`}
				onClick={() => dispatch(setBtnState(SearchBtnEnum.Who))}
			>
				<div
					className={`mt-3 mb-3 ps-lg-4 ps-md-4 ps-xs-2 position-relative
				${borderStyle}`}
				>
					<p className={`${style.head}  m-0`}>{t('Why')}</p>
					<p
						className={
							gestString === t('AddGuests')
								? `${style.colorTwo} text-truncate`
								: `${style.head} m-0 text-truncate`
						}
						style={{ maxWidth: '95%' }}
					>
						{gestString}
					</p>
				</div>
				{isClearActive && <ClearInputBtn clearInput={clearWhoInput} />}
			</div>
			{drop && <WhoDropDawn />}
		</>
	)
}

export default Who
