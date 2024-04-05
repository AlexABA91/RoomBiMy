import { Footer } from '@/app/startComponents/footer/Footer'
import { Header } from '@/app/startComponents/header/Header'
import { HomeParams } from '@/app/type/type'
import React from 'react'
import FilterMain from './components/filterMain'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/app/configs/TranslationsProvider'

const i18nNamespaces = ['translation']

export default async function SearchDataView({
	params: { locale },
}: {
	params: HomeParams
}) {
	const { resources } = await initTranslations(locale, ['translation'])

	return (
		<TranslationsProvider
			namespaces={i18nNamespaces}
			locale={locale}
			resources={resources}
		>
			<div className={'header-main'}>
				<Header />
			</div>
			<FilterMain />
			<Footer />
		</TranslationsProvider>
	)
}
