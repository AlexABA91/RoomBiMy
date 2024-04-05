import React from 'react'
import style from './btnShowMoreInSearch.module.css'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '@/app/redux/hook'
import searchDataService from '@/app/services/searchDataServices'
import { setAddNextFilterData } from '@/app/redux/searchInHeader/searchFilterSlice'
interface props {
	pageSize: number
	page: number
	setPage: React.Dispatch<React.SetStateAction<number>>
	setIsFetch: React.Dispatch<React.SetStateAction<boolean>>
	isOnFetch: boolean
}

const BtnShowMoreInSearch: React.FC<props> = ({
	pageSize,
	page,
	setPage,
	setIsFetch,
	isOnFetch,
}) => {
	const { t } = useTranslation()
	const resultCollection = useAppSelector(
		state => state.searchFilterReducer.collection
	)
	const searchData = useAppSelector(
		state => state.searchPriviesSearchObjectReducer.searchObject
	)
	const dispatch = useAppDispatch()
	const handleClickShowMore: React.MouseEventHandler<
		HTMLButtonElement
	> = () => {
		setIsFetch(true)
		let nextPage = page
		if (resultCollection !== null && resultCollection !== undefined) {
			nextPage = resultCollection.length / pageSize + 1

			searchDataService(searchData, nextPage, pageSize).then(result => {
				if (result) dispatch(setAddNextFilterData(result))
				setIsFetch(false)
			})
			setPage(nextPage)
		}
	}

	return (
		<button className={style.btnShowMore} onClick={handleClickShowMore}>
			{isOnFetch ? (
				<div className='spinner-border text-light' role='status'>
					<span className='visually-hidden'>Loading...</span>
				</div>
			) : (
				t('showMoreBtn')
			)}
		</button>
	)
}

export default BtnShowMoreInSearch
