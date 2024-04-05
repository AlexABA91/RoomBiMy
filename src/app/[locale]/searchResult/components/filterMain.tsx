'use server'
import React, { useMemo } from 'react'
import style from '@/app/[locale]/searchResult/components/searchResult.module.css'
import SearchResultList from './searchResultList'
import dynamic from 'next/dynamic'

const FilterMain = () => {
	const MapForSearch = useMemo(
		() =>
			dynamic(
				() =>
					import('@/app/[locale]/searchResult/components/mapForSearch').then(
						mod => mod.default
					),
				{
					// loading: () => <Loading />,
					ssr: false,
				}
			),
		[]
	)
	return (
		<main className={style.main}>
			<SearchResultList />
			<MapForSearch />
		</main>
	)
}

export default FilterMain
