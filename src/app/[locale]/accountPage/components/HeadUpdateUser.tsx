'use client'
import { AuthenticationBtn } from '@/app/ui/authenticationBtn/AuthenticationBtn'
import Link from 'next/link'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import style from './Header.module.css'
import { useAppDispatch, useAppSelector, useWindowSize } from '@/app/redux/hook'
import { SearchBtnEnum } from '@/app/type/type'
import { useTranslation } from 'react-i18next'
import { setState } from '@/app/redux/searchInHeader/SearchSlice'

const HeaderUpdateUser: FC = () => {
	const { t } = useTranslation()
	const [width, height] = useWindowSize()
	const [isTeamBlack, setTeamBlack] = useState(false)

	const dispatch = useAppDispatch()
	const btnState = useAppSelector(state => state.searchBtnStateReducer.bntState)
	useEffect(() => {
		setTeamBlack(btnState === SearchBtnEnum.DisableAll ? false : true)
	}, [btnState])
	useEffect(() => {
		const data = sessionStorage.getItem('dataSearch')
		if (data !== null) {
			const dataParse = JSON.parse(data)
			console.log('dataParse', dataParse)
			dispatch(setState(dataParse))
			sessionStorage.removeItem('dataSearch')
		}
	})
	return (
		<div
		className={style.header}
		>
			<div className={style.LogoContainer}>
				<Link
					href={'/'}
					className={`${isTeamBlack && style.logoBlack} ${style.logo}`}
				>
					RoomBi
				</Link>
			</div>
			<div className={style.linkContainer}>
				<Link
					className={`${style.customText} ${style.link} ${
						isTeamBlack && style.colorW
					} `}
					href='/#'
				>
					{t('OfferApartment')}
					<strong> &nbsp;RoomBi</strong>
				</Link>
			</div>
			<div className={style.authBtn}>
				<AuthenticationBtn isTeamBlack={isTeamBlack} />
			</div>
		</div>
	)
}
export { HeaderUpdateUser }
