'use client'
import { AuthenticationBtn } from '@/app/ui/authenticationBtn/AuthenticationBtn'
import Link from 'next/link'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import style from './Header.module.css'
import SmallSearch from './smallSearch/SmallSearch'
import Search from './search/Search'
import { useAppDispatch, useAppSelector, useWindowSize } from '@/app/redux/hook'
import { SearchBtnEnum } from '@/app/type/type'
import { useTranslation } from 'react-i18next'
import { setState } from '@/app/redux/searchInHeader/SearchSlice'

const Header: FC = () => {
	const { t } = useTranslation()
	const [width, height] = useWindowSize()
	//переключение между видами поика
	const [isSmallSearchOn, setSmallSearchOn] = useState(false)
	const [isBigSearchOn, setBigSearchOn] = useState(true)
	const [isBigSearchOnBySmall, setBigSearchOnBySmall] = useState(false)
	// переключатель кнопок на большом поиске
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
			className={` pt-xs-1 pt-sm-2 pt-md-4  pb-3   ps-md-3 pe-md-3 ps-lg-3 pe-lg-3 pe-xl-4 ps-xl-4' ${
				style.header
			} ${isTeamBlack ? style.headerBlaCk : style.headerWhite} `}
		>
			<div className={style.LogoContainer}>
				<Link
					href={'/'}
					className={`${isTeamBlack && style.logoBlack} ${style.logo}`}
				>
					RoomBi
				</Link>
			</div>
			<div className={style.searchBar}>
				{width > 576
					? isSmallSearchOn && (
							<SmallSearch
								setSmallSearchOn={setSmallSearchOn}
								setBigSearchOn={setBigSearchOn}
								setBigSearchOnBySmall={setBigSearchOnBySmall}
							/>
					  )
					: null}
				{width > 576 ? (
					isBigSearchOn && (
						<Search
							setTeamBlack={setTeamBlack}
							isTeamBlack={isTeamBlack}
							propsKindSwitch={{
								isSmallSearchOn,
								isBigSearchOn,
								isBigSearchOnBySmall,
								setSmallSearchOn,
								setBigSearchOn: setBigSearchOn,
								setBigSearchOnBySmall,
							}}
						/>
					)
				) : (
					<Search
						setTeamBlack={setTeamBlack}
						isTeamBlack={isTeamBlack}
						propsKindSwitch={{
							isSmallSearchOn,
							isBigSearchOn,
							isBigSearchOnBySmall,
							setSmallSearchOn,
							setBigSearchOn: setBigSearchOn,
							setBigSearchOnBySmall,
						}}
					/>
				)}
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
export { Header }
