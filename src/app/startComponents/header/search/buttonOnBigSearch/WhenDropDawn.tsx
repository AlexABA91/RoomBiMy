import { useAppDispatch, useAppSelector, useWindowSize } from '@/app/redux/hook'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import style from '../Search.module.css'
import PrevArrow from '../../../../ui/arrow/PrevArrow'
import NextArrow from '../../../../ui/arrow/NextArrow'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { useTranslation } from 'react-i18next'

interface SetWhenObjDate {
	setWhenObjDate: ActionCreatorWithPayload<string, string>
}

const WhenDropDawn: React.FC<SetWhenObjDate> = ({ setWhenObjDate }) => {
	const [width, height] = useWindowSize()
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const calendarValueDataCome = useAppSelector(
		state => state.searchReducer.DataSearchObj.whenObj.dateCome
	)
	const calendarValueDataD = useAppSelector(
		state => state.searchReducer.DataSearchObj.whenObj.dateOut
	)
	return (
		<div className={`d-grid  ${style.whenDropDawn}`}>
			<Calendar
				onClickDay={value => {
					dispatch(setWhenObjDate(value.toString()))
				}}
				defaultValue={
					calendarValueDataCome !== '' && calendarValueDataD !== ''
						? [new Date(calendarValueDataCome), new Date(calendarValueDataD)]
						: calendarValueDataCome !== ''
						? new Date(calendarValueDataCome)
						: calendarValueDataD !== ''
						? new Date(calendarValueDataD)
						: null
				}
				locale={t('ISOLocale')}
				showDoubleView={width > 900 || width === undefined ? true : false}
				showNeighboringMonth={false}
				minDetail='month'
				prevLabel={<PrevArrow />}
				nextLabel={<NextArrow />}
				selectRange={true}
				minDate={new Date()}
			/>
		</div>
	)
}
export default WhenDropDawn
