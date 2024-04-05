import Image from 'next/image'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import style from '@/app/[locale]/searchResult/components/searchResult.module.css'

const LadingSpinner: FC = () => {
	const { t } = useTranslation()
	return (
		<div className={style.spinnerContainer}>
			<p>{t('searchSpinnerMessage')}</p>
			<Image
				src={`/spinners/Magnify-1.8s-400px.svg`}
				width={50}
				height={50}
				alt='search icon spin by circle'
			/>
		</div>
	)
}

export default LadingSpinner
