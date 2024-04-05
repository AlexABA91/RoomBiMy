import Image from 'next/image'
import style from './ClearInputBtn.module.css'

interface ClearInputBtnProps {
	clearInput: (event: any) => void
}

const ClearInputBtn: React.FC<ClearInputBtnProps> = ({ clearInput }) => {
	return (
		<div className={style.main} onClick={event => clearInput(event)}>
			<div>
				<Image alt='close' width={16} height={16} src={'/icon/close.svg'} />
			</div>
		</div>
	)
}

export default ClearInputBtn
