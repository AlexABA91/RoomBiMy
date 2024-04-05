import Image from 'next/image'

const PrevArrow: React.FC = () => {
	return (
		<Image src={'/icon/prev.svg'} width={12} height={12} alt='arrow left' />
	)
}

export default PrevArrow
