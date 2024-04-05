'use client'
import React, { useState } from 'react'
import style from '@/app/[locale]/searchResult/components/searchResult.module.css'
import { useAppSelector } from '@/app/redux/hook'
import { CardBi } from '@/app/components/card/CardBi'
import { useTranslation } from 'react-i18next'
import LadingSpinner from './ladingSpinner'
import BtnShowMoreInSearch from '@/app/ui/btnShowMoreInSearch/btnShowMoreInSearch'

const SearchResultList = () => {
	const { t } = useTranslation()
	const searchFilterData = useAppSelector(
		state => state.searchFilterReducer.collection
	)
	const [page, setPage] = useState(1)
	const [isOnFetch, setOnFetch] = useState(false)
	const pageSize = 6

	return (
		<div className={style.itemTopCon}>
			{searchFilterData !== undefined && searchFilterData !== null ? (
				searchFilterData.length > 0 ? (
					<>
						<div className={style.itemList}>
							{searchFilterData.map(item => {
								return (
									<div className={style.item} key={item.id}>
										<CardBi {...item} />
									</div>
								)
							})}
						</div>
						<div className={style.btnCont}>
							{searchFilterData &&
								(isOnFetch ||
									searchFilterData.length / pageSize / page === 1) && (
									<BtnShowMoreInSearch
										pageSize={pageSize}
										page={page}
										setPage={setPage}
										setIsFetch={setOnFetch}
										isOnFetch={isOnFetch}
									/>
								)}
						</div>
					</>
				) : (
					<>
						<h2 className={style.searchNoResult}>{t('searchNoResult')}</h2>
					</>
				)
			) : (
				<LadingSpinner />
			)}
		</div>
	)
}
export default SearchResultList
