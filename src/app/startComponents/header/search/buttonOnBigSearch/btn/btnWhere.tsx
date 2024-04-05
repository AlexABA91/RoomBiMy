import React from 'react'
import style from '@/app/startComponents/header/search/Search.module.css'
import Image from 'next/image'
interface PropsBtn {
	value: string
	imgSrc: string
	onClick: (e: any, direction?: string, value?: string) => void
}

const BtnWhereTile: React.FC<PropsBtn> = ({ value, imgSrc, onClick }) => {
	return (
		<>
			<button
				className={`${style.imgDiv} p-0`}
				value={value}
				onClick={e => {
					onClick(e, value)
				}}
			>
				<Image
					src={imgSrc}
					alt={`picture of map with  ${value}`}
					width={122}
					height={122}
				/>
			</button>
			<p className={style.imageDis}>{value}</p>
		</>
	)
}

export default BtnWhereTile
