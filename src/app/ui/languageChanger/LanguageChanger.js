'use client'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import i18nConfig from '../../../../i18nConfig'
import { Form } from 'react-bootstrap'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/redux/hook'
import { setLocation } from '@/app/redux/appState/appSlice'

const LanguageChanger = () => {
	const { i18n } = useTranslation()
	const currentLocale = i18n.language
	const router = useRouter()
	const currentPathname = usePathname()
	const dispatch = useAppDispatch()

	const handleChange = e => {
		const newLocale = e.target.value
		dispatch(setLocation(newLocale))
		// set cookie for next-i18n-router
		const days = 30
		const date = new Date()
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
		const expires = date.toUTCString()
		document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`

		// redirect to the new locale path
		if (
			currentLocale === i18nConfig.defaultLocale &&
			!i18nConfig.prefixDefault
		) {
			router.push('/' + newLocale + currentPathname)
		} else {
			router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`))
		}

		router.refresh()
	}

	return (
		<Form.Select size='sm' onChange={handleChange} value={currentLocale}>
			<option value='ua'>Українська (UA)</option>
			<option value='en'>English (EN)</option>
		</Form.Select>
	)
}

export { LanguageChanger }
