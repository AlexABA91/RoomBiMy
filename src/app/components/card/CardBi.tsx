'use client'
import React, { useEffect, useState } from 'react'
import style from './cardBi.module.css'
import { CarouselBi } from './carousel/CarouselBi'
import { Col, Row } from 'react-bootstrap'
import { CardBiProps } from '../../type/type'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { useSession } from 'next-auth/react'
import { putWishlists } from '@/app/services/wishlistsService'
const CardBi: React.FC<CardBiProps> = ({
	id,
	pictures,
	title,
	country,
	bookingFree,
	pricePerNight,
	objectRating,
	wish,
}) => {
	const session = useSession()
	const [saveUrlImg, setSaveUrlImg] = useState('heart')
	const { t } = useTranslation()
	useEffect(() => {
		if (wish && session.data?.user?.name) setSaveUrlImg('save2')
		else setSaveUrlImg('heart')
	}, [wish, session.data?.user?.name])

	const handleClickRouter = () => {
		const newTabUrl = `/${id}`
		window.open(newTabUrl, '_blank')
	}

	const handleClickHeart = async () => {
		if (session.data?.user?.name) {
			const res = await putWishlists(id, session.data?.user?.name)
			console.log('res--1', res)

			if (res) {
				if (res === 'Ok') {
					setSaveUrlImg('save2')
				} else if (res === 'No') {
					setSaveUrlImg('save')
				}
			}
		}
	}
	return (
		<div className={style.card}>
			<div className={style.cardHeader}>
				<div>
					{objectRating >= 5 && (
						<span onClick={handleClickRouter} className={style.choiceGuests}>
							{t('choiceOfGuestsCard')}
						</span>
					)}
				</div>
				<div>
					<button
						onClick={handleClickHeart}
						style={{
							border: 'none',
							backgroundColor: 'rgba(240, 248, 255, 0)',
						}}
					>
						{session.data?.user?.name && (
							<Image
								className={style.image}
								src={`/userInfo/${saveUrlImg}.png`}
								alt={'save'}
								width={20}
								height={20}
								priority
							/>
						)}
					</button>
				</div>
			</div>
			<div className={style.caruselContainer}>
				<div className={style.carusel}>
					<CarouselBi
						pictures={pictures}
						handleClick={event => handleClickRouter()}
					/>
				</div>
			</div>
			<div className={style.textContainet} onClick={handleClickRouter}>
				<Row>
					<Col xs={{ span: 8 }}>
						<p className={style.subtitle}>{title}</p>
					</Col>
					{objectRating !== 0 && (
						<Col xs={{ span: 4 }}>
							<div className={style.thisRating}>
								<Image
									src='/star.svg'
									width={15}
									height={15}
									alt='Picture of the author'
									sizes='(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw'
								/>
								<span> {objectRating}</span>
							</div>
						</Col>
					)}
				</Row>
				<p className={style.text}> {country}</p>
				<p className={style.text}> {bookingFree}</p>
				<p className={style.subtitle}>
					{' '}
					{pricePerNight}$ {t('nightCard')}
				</p>
			</div>
		</div>
	)
}
export { CardBi }
