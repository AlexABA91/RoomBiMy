import style from '../Search.module.css'
import Image from 'next/image'
import { SearchDataState, ThemProps, WhoState } from '@/app/type/type'
import { Col, Row } from 'react-bootstrap'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/redux/hook'
import Modal from 'react-bootstrap/Modal'
import {
	setWhoObjAnimalsCount,
	setWhoObjBabyCount,
	setWhoObjChildrenCount,
	setWhoObjGestCount,
} from '@/app/redux/searchInHeader/SearchSlice'
import { useTranslation } from 'react-i18next'
import AnimalModal from '@/app/ui/modal/AnimalModal'

const WhoDropDawn: React.FC = () => {
	const { t } = useTranslation()
	const why = useAppSelector(state => state.searchReducer.DataSearchObj.whyObj)
	const dispatch = useAppDispatch()
	const [modalShow, setModalShow] = useState(false)
	useEffect(() => {
		if (why.gestsCount === 0) {
			dispatch(setWhoObjChildrenCount(0))
			dispatch(setWhoObjBabyCount(0))
			dispatch(setWhoObjAnimalsCount(0))
		}
	}, [dispatch, why])

	return (
		<>
			<div className={style.actionWhoDropDawnOn}>
				<Row className='d-flex align-items-center border-bottom pb-3 '>
					<Col xs={6}>
						<h2 className='h6 mb-1'>{t('Adults')}</h2>
						<p className='m-0'>{t('FromOld')}</p>
					</Col>
					<Col xs={6} className='d-flex align-items-center justify-content-end'>
						<Row>
							<Col xs={4}>
								<button
									className={`${style.resetButton} ${style.counterBtn}`}
									onClick={() => {
										if (why.gestsCount > 0)
											dispatch(setWhoObjGestCount(why.gestsCount - 1))
									}}
								>
									<span>
										<Image
											src={`/icon/minus.svg`}
											alt='minus'
											width={12}
											height={12}
										/>
									</span>
								</button>
							</Col>
							<Col xs={2}>
								<span className='text-center fs-6'>{why.gestsCount}</span>
							</Col>
							<Col xs={4}>
								<button
									className={`${style.resetButton} ${style.counterBtn}`}
									onClick={() => {
										dispatch(setWhoObjGestCount(why.gestsCount + 1))
									}}
								>
									<span>
										<Image
											src={`/icon/plus.svg`}
											alt='minus'
											width={12}
											height={12}
										/>
									</span>
								</button>
							</Col>
						</Row>
					</Col>
				</Row>
				<Row className='d-flex align-items-center border-bottom pb-3 pt-3 '>
					<Col xs={6}>
						<h2 className='h6 mb-1'>{t('Children')}</h2>
						<p className='m-0'>2-12&nbsp;{t('Years')}</p>
					</Col>
					<Col xs={6} className='d-flex align-items-center justify-content-end'>
						<Row>
							<Col xs={4}>
								<button
									className={`${style.resetButton} ${style.counterBtn}`}
									onClick={() => {
										if (why.childrenCount > 0)
											dispatch(setWhoObjChildrenCount(why.childrenCount - 1))
									}}
								>
									<span>
										<Image
											src={`/icon/minus.svg`}
											alt='minus'
											width={12}
											height={12}
										/>
									</span>
								</button>
							</Col>
							<Col xs={2}>
								<span className='text-center fs-6'>{why.childrenCount}</span>
							</Col>
							<Col xs={4}>
								<button
									className={`${style.resetButton} ${style.counterBtn}`}
									onClick={() => {
										dispatch(setWhoObjChildrenCount(why.childrenCount + 1))
										if (why.gestsCount === 0) dispatch(setWhoObjGestCount(1))
									}}
								>
									<span>
										<Image
											src={`/icon/plus.svg`}
											alt='minus'
											width={12}
											height={12}
										/>
									</span>
								</button>
							</Col>
						</Row>
					</Col>
				</Row>
				<Row className='d-flex align-items-center border-bottom pb-3 pt-3 '>
					<Col xs={6}>
						<h2 className='h6 mb-1'>{t('Babies')}</h2>
						<p className='m-0'>{t('Younger')}&nbsp;2</p>
					</Col>
					<Col xs={6} className='d-flex align-items-center justify-content-end'>
						<Row>
							<Col xs={4}>
								<button
									className={`${style.resetButton} ${style.counterBtn}`}
									onClick={() => {
										if (why.babyCount > 0)
											dispatch(setWhoObjBabyCount(why.babyCount - 1))
									}}
								>
									<span>
										<Image
											src={`/icon/minus.svg`}
											alt='minus'
											width={12}
											height={12}
										/>
									</span>
								</button>
							</Col>
							<Col xs={2}>
								<span className='text-center fs-6'>{why.babyCount}</span>
							</Col>
							<Col xs={4}>
								<button
									className={`${style.resetButton} ${style.counterBtn}`}
									onClick={() => {
										dispatch(setWhoObjBabyCount(why.babyCount + 1))
										if (why.gestsCount === 0) dispatch(setWhoObjGestCount(1))
									}}
								>
									<span>
										<Image
											src={`/icon/plus.svg`}
											alt='minus'
											width={12}
											height={12}
										/>
									</span>
								</button>
							</Col>
						</Row>
					</Col>
				</Row>
				<Row className='d-flex align-items-center   pt-3 '>
					<Col xs={6}>
						<h2 className='h6 mb-1'>{t('Pets')}</h2>
					</Col>
					<Col xs={6} className='d-flex align-items-center justify-content-end'>
						<Row>
							<Col xs={4}>
								<button
									className={`${style.resetButton} ${style.counterBtn}`}
									onClick={() => {
										if (why.animalsCount > 0)
											dispatch(setWhoObjAnimalsCount(why.animalsCount - 1))
									}}
								>
									<span>
										<Image
											src={`/icon/minus.svg`}
											alt='minus'
											width={12}
											height={12}
										/>
									</span>
								</button>
							</Col>
							<Col xs={2}>
								<span className='text-center fs-6'>{why.animalsCount}</span>
							</Col>
							<Col xs={4}>
								<button
									className={`${style.resetButton} ${style.counterBtn}`}
									onClick={() => {
										dispatch(setWhoObjAnimalsCount(why.animalsCount + 1))
										if (why.gestsCount === 0) dispatch(setWhoObjGestCount(1))
									}}
								>
									<span>
										<Image
											src={`/icon/plus.svg`}
											alt='minus'
											width={12}
											height={12}
										/>
									</span>
								</button>
							</Col>
						</Row>
					</Col>
					<Row>
						<p className='m-0 pt-1'>
							<button
								className={style.buttonReset}
								onClick={() => setModalShow(true)}
							>
								{t('TravelingWith')}
							</button>
						</p>
					</Row>
				</Row>
			</div>
			<AnimalModal show={modalShow} onHide={() => setModalShow(false)} />
		</>
	)
}

export default WhoDropDawn
