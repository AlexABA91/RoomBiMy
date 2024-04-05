import React from 'react'
import { Modal } from 'react-bootstrap'
import Image from 'next/image'
import style from '@/app/startComponents/header/search/Search.module.css'
import { useTranslation } from 'react-i18next'
interface ModalProps {
	show: boolean
	onHide: () => void
	size?: 'sm' | 'lg' | 'xl'
	// Add any other props here
}
const AnimalModal: React.FC<ModalProps> = props => {
	const { t } = useTranslation()
	return (
		<Modal
			{...props}
			size='sm'
			aria-labelledby='contained-modal-title-vcenter'
			centered
		>
			<Modal.Header closeButton />

			<Modal.Body className={style.modalBody}>
				<div>
					<Image
						className={style.modalImg}
						src={'/img/adafb11b-41e9-49d3-908e-049dfd6934b6.webp'}
						alt='animal with blind person enter to apartment'
						width={300}
						height={350}
					/>
				</div>
				<h4>{t('ServiceAnimals')}</h4>
				<p>{t('ServiceAnimalsInfo')}</p>
			</Modal.Body>
		</Modal>
	)
}

export default AnimalModal
