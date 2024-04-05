import React from 'react'
import Image from 'next/image'
import style from '../Search.module.css'
import { useAppDispatch, useAppSelector } from '@/app/redux/hook'
import {
	AutoCompleteItem,
	DataSearchForSorting,
	SearchBtnEnum,
} from '@/app/type/type'
import { setBtnState } from '@/app/redux/searchInHeader/SearchBtnStateSlice'
import autoCompleteService from '@/app/services/autoCompleteService'
import {
	setWhenObjDateCome,
	setWhenObjDateOut,
	setWhereObj,
	setWhoObjGestCount,
} from '@/app/redux/searchInHeader/SearchSlice'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import convertData from '@/app/services/conwertDate'
import searchDataService from '@/app/services/searchDataServices'
import {
	setSearchFilterState,
	setSearchFilterStateDefault,
} from '@/app/redux/searchInHeader/searchFilterSlice'
import { setSearchObject } from '@/app/redux/searchInHeader/searchPriviesSearchObjectSliec'

interface props {
	inputRef: React.RefObject<HTMLInputElement>
}
debugger
const SearchBtn: React.FC<props> = ({ inputRef }) => {
	const router = useRouter()
	const dispatch = useAppDispatch()
	const dataSearch = useAppSelector(state => state.searchReducer.DataSearchObj)
	const { t } = useTranslation()

	const fetchData = async (transferData: DataSearchForSorting) => {
		if (transferData === null) {
			console.log('transferData is bad')
			return
		}
		searchDataService(transferData).then(list => {
			dispatch(setSearchFilterState(list))
		})
	}

	const transferDataToServer = (transferData: DataSearchForSorting) => {
		// проверка дат на пустоту( пустой даты быть не должно)
		let newDate: string = ''
		if (
			dataSearch.whenObj.dateCome === '' &&
			dataSearch.whenObj.dateOut !== ''
		) {
			const date = new Date(dataSearch.whenObj.dateOut)
			newDate = new Date(date.setDate(date.getDate() + 1)).toString()
			dispatch(setWhenObjDateCome(dataSearch.whenObj.dateOut))
			dispatch(setWhenObjDateOut(newDate))
			transferData.when = {
				start: convertData(new Date(dataSearch.whenObj.dateOut)),
				end: convertData(new Date(newDate)),
			}
		} else if (
			dataSearch.whenObj.dateCome !== '' &&
			dataSearch.whenObj.dateOut === ''
		) {
			const date = new Date(dataSearch.whenObj.dateCome)
			dispatch(
				setWhenObjDateOut(new Date(date.setDate(date.getDate() + 1)).toString())
			)
			transferData.when = {
				start: convertData(new Date(dataSearch.whenObj.dateCome)),
				end: convertData(new Date(date.setDate(date.getDate() + 1))),
			}
		} else if (
			dataSearch.whenObj.dateCome === '' &&
			dataSearch.whenObj.dateOut === ''
		) {
			const toDay = new Date()
			dispatch(setWhenObjDateCome(toDay.toString()))
			dispatch(
				setWhenObjDateOut(
					new Date(toDay.setDate(toDay.getDate() + 1)).toString()
				)
			)
			transferData.when = {
				start: convertData(toDay),
				end: convertData(new Date(toDay.setDate(toDay.getDate() + 1))),
			}
		} else {
			transferData.when = {
				start: convertData(new Date(dataSearch.whenObj.dateCome)),
				end: convertData(new Date(dataSearch.whenObj.dateOut)),
			}
		}
		// проверка количества гостей
		if (dataSearch.whyObj.gestsCount === 0) {
			dispatch(setWhoObjGestCount(1))
			transferData.why = 1
		} else {
			transferData.why =
				dataSearch.whyObj.gestsCount +
				dataSearch.whyObj.childrenCount +
				dataSearch.whyObj.babyCount
		}
		dispatch(() => {
			setBtnState(SearchBtnEnum.DisableAll)
		})
		dispatch(setSearchFilterStateDefault())

		dispatch(setSearchObject(transferData))
		fetchData(transferData)
	}

	const checkAutoCompleteObjectFull: React.MouseEventHandler<
		HTMLDivElement
	> = () => {
		const transferData: DataSearchForSorting = {
			where: undefined,
			when: undefined,
			why: undefined,
		}
		const searchDirection = inputRef.current?.value
		if (searchDirection) {
			// В случае если через автокомплит не чего не выбрано выбрать по первому вхождению

			if (
				searchDirection !== t('FlexibleSearch') &&
				searchDirection.trim().length > 2 &&
				(dataSearch.whereObj === undefined ||
					Object.keys(dataSearch.whereObj).length === 0)
			) {
				console.log(t('FlexibleSearch'))
				autoCompleteService(searchDirection.trim(), t('locale')).then(
					(data: AutoCompleteItem[] | null) => {
						const transferData: DataSearchForSorting = {
							where: undefined,
							when: undefined,
							why: undefined,
						}
						if (data) {
							for (let i = 0; i < data.length; i++) {
								if (
									data[i].addresstype === 'country' ||
									data[i].addresstype === 'city' ||
									data[i].addresstype === 'region'
								) {
									dispatch(setWhereObj(data[i]))
									transferData.where = {
										type: data[i].addresstype,
										countryCode: data[i].address.country_code,
										placeId: data[i].place_id,
									}
									transferDataToServer(transferData)
								}
							}
						} else {
							console.log('Where handleInputChange No data fetched.')
						}
					}
				)
			} else if (Object.keys(dataSearch.whereObj).length > 0) {
				transferData.where = {
					type: dataSearch.whereObj.addresstype,
					countryCode: dataSearch.whereObj.address.country_code,
					placeId: dataSearch.whereObj.place_id,
				}
				transferDataToServer(transferData)
			} else {
				transferData.where = null
				transferDataToServer(transferData)
			}
		} else {
			transferData.where = null
			transferDataToServer(transferData)
		}
	}

	return (
		<div
			onClick={e => {
				checkAutoCompleteObjectFull(e)
				router.push('/searchResult')
			}}
			className={`${style.search} ${style.item_5} ${style.item}  ${style.link}`}
		>
			<div
				className={`${style.search}  `}
				onClick={() => {
					dispatch(setBtnState(SearchBtnEnum.DisableAll))
				}}
			>
				<Image
					src={'/icon/search.svg'}
					width={30}
					height={30}
					alt='search icon'
				/>
			</div>
		</div>
	)
}

export default SearchBtn
