import { setLocation } from '@/app/redux/appState/appSlice'
import { useAppDispatch } from '@/app/redux/hook'
import style from '@/app/ui/languageBtnPlanet/languageBtnPlanet.module.css'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import i18nConfig from '../../../../i18nConfig'

const LanguageBtnPlanet: React.FC = () => {
	const dropdownRef = useRef<HTMLDivElement>(null)
	const btnRef = useRef<HTMLButtonElement>(null)
	const { t, i18n } = useTranslation()
	const currentLocale = i18n.language
	const router = useRouter()
	const currentPathname = usePathname()
	const dispatch = useAppDispatch()
	const [active, setActive] = useState(false)

	const flagImagePath = () => {
		switch (currentLocale) {
			case 'en':
				return '/flag/en.svg'
			case 'ua':
				return '/flag/ua.svg'
			default:
				return '/flag/ua.svg'
		}
	}

	const handleChange = (e: React.MouseEvent, newLocale: string) => {
		e.preventDefault()
		dispatch(setLocation(newLocale))
		// set cookie for next-i18n-router
		const days = 30
		const date = new Date()
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
		const expires = date.toUTCString()
		document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`

		// redirect to the new locale path
		if (
			currentLocale === i18nConfig.defaultLocale
			//&& !i18nConfig.prefixDefault
		) {
			router.push('/' + newLocale + currentPathname)
		} else {
			router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`))
		}

		// router.refresh()
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(target) &&
				btnRef.current &&
				!btnRef.current.contains(target)
			) {
				setActive(false)
			}
		}

		// Add event listener
		document.addEventListener('click', handleClickOutside)
		return () => {
			// Remove event listener on cleanup
			document.removeEventListener('click', handleClickOutside)
		}
	}, [dropdownRef, setActive, active])
	return (
		<>
			<button
				ref={btnRef}
				className={style.resetButton}
				title={t('language')}
				onMouseUp={event => {
					event.preventDefault()
					setActive(!active)
				}}
			>
				<div className={style.planetWithFlag}>
					<Image
						src={'/icon/planet.svg'}
						width={22}
						height={22}
						alt='change language button'
					/>
					<div className={style.flagBadge}>
						<Image
							className={style.flagSvg}
							src={flagImagePath()}
							width={15}
							height={12}
							alt='flag'
						/>
					</div>
				</div>
			</button>
			{active && (
				<div ref={dropdownRef} className={style.DropDawnLanguage}>
					<button
						className={style.languageItem}
						onClick={e => handleChange(e, 'en')}
					>
						<Image
							src={'/flag/en.svg'}
							width={35}
							height={27}
							alt='change language button'
						/>
					</button>
					<button
						className={style.languageItem}
						onClick={e => handleChange(e, 'ua')}
					>
						<Image
							src={'/flag/ua.svg'}
							width={35}
							height={27}
							alt='change language button'
						/>
					</button>
				</div>
			)}
		</>
	)
}

export default LanguageBtnPlanet
