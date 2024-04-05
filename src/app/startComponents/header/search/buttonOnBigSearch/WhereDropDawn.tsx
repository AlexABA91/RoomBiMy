import { Col, Row } from 'react-bootstrap'
import style from '../Search.module.css'
import {
	AutoCompleteItem,
	AutoCompleteList,
	SearchBtnEnum,
} from '@/app/type/type'
import { useAppDispatch, useWindowSize } from '@/app/redux/hook'
import { setBtnState } from '@/app/redux/searchInHeader/SearchBtnStateSlice'
import BtnWhereTile from './btn/btnWhere'
import {
	setWhereEmptyObj,
	setWhereObj,
} from '@/app/redux/searchInHeader/SearchSlice'
import autoCompleteService from '@/app/services/autoCompleteService'
import { btnDataArray, btnDataI } from './btn/btnWhereData'
import { useTranslation } from 'react-i18next'

const WhereDropDawn = ({
	setStringInput,
}: {
	setStringInput: React.Dispatch<React.SetStateAction<string>>
}) => {
	const [width, height] = useWindowSize()
	const dispatch = useAppDispatch()
	const { t } = useTranslation()
	const clickImgEvent = (e: any, value?: string) => {
		e.currentTarget.classList.add(`${style.dropDawnImgClickAnimation}`)
		const str = e.currentTarget.value

		setTimeout(() => {
			setStringInput(str)

			dispatch(setBtnState(SearchBtnEnum.WhenCome))
			if (
				value !== '' &&
				value !== undefined &&
				value !== t('FlexibleSearch')
			) {
				autoCompleteService(value, t('locale')).then(
					(data: AutoCompleteItem[] | null) => {
						if (data) {
							dispatch(setWhereObj(data[0]))
						} else {
							console.log('Where handleInputChange No data fetched.')
						}
					}
				)
			}
			if (value === t('FlexibleSearch')) {
				dispatch(setWhereEmptyObj())
			}
		}, 250)
	}
	const chunkArray = (array: btnDataI[], chunkSize: number): btnDataI[][] => {
		const results: btnDataI[][] = []
		while (array.length) {
			results.push(array.splice(0, chunkSize))
		}
		return results
	}

	const rows = chunkArray([...btnDataArray], width > 992 ? 3 : 2)
	return (
		<div className={`${style.actionWhereDropDawnOn}`}>
			<p className={`h5 mt-2 text-center fw-bold `}>{t('SearchDirection')}</p>
			{rows.map((row, rowIndex) => (
				<Row key={rowIndex}>
					{row.map((item, itemIndex) => (
						<Col key={itemIndex}>
							<BtnWhereTile
								value={
									item.value === 'FlexibleSearch'
										? t('FlexibleSearch')
										: item.value
								}
								imgSrc={item.imgSrc}
								onClick={clickImgEvent}
							/>
						</Col>
					))}
				</Row>
			))}
		</div>
	)
}

export default WhereDropDawn
