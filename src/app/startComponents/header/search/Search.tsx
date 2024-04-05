import Image from 'next/image'
import style from './Search.module.css'
import { Col, Row } from 'react-bootstrap'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
	SearchDataState,
	SearchKindSwitch,
	ThemProps,
	SearchBtnEnum,
} from '@/app/type/type'
import Where from './buttonOnBigSearch/Where'
import Who from './buttonOnBigSearch/why'
import WhenCome from './buttonOnBigSearch/WhenCome'
import WhenDeparture from './buttonOnBigSearch/WhenDeparture'
import { useAppDispatch, useAppSelector } from '@/app/redux/hook'
import { setBtnState } from '@/app/redux/searchInHeader/SearchBtnStateSlice'
import SearchBtn from './buttonOnBigSearch/searchBtn'

interface propsSearchKindSwitchP {
	propsKindSwitch: SearchKindSwitch
}
interface TeamSetter {
	setTeamBlack: (setTeamBlack: boolean) => void
}
const Search: React.FC<TeamSetter & propsSearchKindSwitchP & ThemProps> = ({
	setTeamBlack,

	propsKindSwitch: propsKindSwitch,
	isTeamBlack,
}) => {
	const {
		isBigSearchOnBySmall,
		setSmallSearchOn,
		setBigSearchOn,
		setBigSearchOnBySmall,
	} = propsKindSwitch

	const dispatch = useAppDispatch()
	const btnState = useAppSelector(state => state.searchBtnStateReducer.bntState)

	const [scroll, setScroll] = useState(Number)
	const [scrollAfterSmallSearch, setScrollAfterSmallSearch] = useState(-1)
	const [flag, setFlag] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)
	const searchBig = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handler = () => {
			setScroll(window.scrollY)
			window.removeEventListener('scroll', handler)
		}
		dispatch(setBtnState(SearchBtnEnum.DisableAll))
		window.addEventListener('scroll', handler)
		return () => {
			window.removeEventListener('scroll', handler)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		const handleClickOutside = (event: any) => {
			if (
				searchBig.current &&
				!searchBig.current.contains(event.target as Node)
			) {
				if (!isBigSearchOnBySmall) {
					document.removeEventListener('click', handleClickOutside)
					dispatch(setBtnState(SearchBtnEnum.DisableAll))
				} else if (isBigSearchOnBySmall) {
					dispatch(setBtnState(SearchBtnEnum.DisableAll))
					searchBig?.current.classList.add(style.animateBigToSmall)
					setTimeout(() => {
						setBigSearchOn(false)
						setBigSearchOnBySmall(false)
						setSmallSearchOn(true)
					}, 150)
				}
			}
		}
		if (btnState !== SearchBtnEnum.DisableAll)
			document.addEventListener('click', handleClickOutside)
		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [
		dispatch,
		btnState,
		isBigSearchOnBySmall,
		setBigSearchOn,
		setBigSearchOnBySmall,
		setSmallSearchOn,
	])

	const handelScrollFromSmall = useCallback(() => {
		if (flag) setScrollAfterSmallSearch(window.scrollY)
		setFlag(true)
	}, [flag, setScrollAfterSmallSearch])

	useEffect(() => {
		if (scrollAfterSmallSearch !== -1) {
			window.removeEventListener('scroll', handelScrollFromSmall)
			if (searchBig.current)
				searchBig.current.classList.add(style.animateBigToSmall)
			dispatch(setBtnState(SearchBtnEnum.DisableAll))
			setTimeout(() => {
				setSmallSearchOn(true)
				setBigSearchOn(false)
			}, 150)
		}
	}, [
		dispatch,
		scrollAfterSmallSearch,
		handelScrollFromSmall,
		setBigSearchOn,
		setSmallSearchOn,
	])

	useEffect(() => {
		if (!isBigSearchOnBySmall && scroll !== 0) {
			//анимация старт
			if (searchBig.current)
				searchBig?.current.classList.add(style.animateBigToSmall)
			dispatch(setBtnState(SearchBtnEnum.DisableAll))
			setTimeout(() => {
				setSmallSearchOn(true)
				setBigSearchOn(false)
			}, 150)
		} else if (isBigSearchOnBySmall) {
			window.addEventListener('scroll', handelScrollFromSmall)
		}
		return () => {
			window.removeEventListener('scroll', handelScrollFromSmall)
		}
	}, [
		dispatch,
		scroll,
		handelScrollFromSmall,
		isBigSearchOnBySmall,
		setBigSearchOn,
		setSmallSearchOn,
	])

	return (
		<div
			ref={searchBig}
			className={`  ${style.main}  ${
				isTeamBlack ? style.borderWhite : style.borderBlack
			} ${style.searchAllContainer} text-end`}
		>
			<div className={` ${style.item_1} ${style.searchStyleBtn} `}>
				<Where
					inputRef={inputRef}
					setTeamBlack={setTeamBlack}
					isTeamBlack={isTeamBlack}
				/>
			</div>
			<div className={` ${style.item_2} ${style.searchStyleBtn} `}>
				<WhenCome isTeamBlack={isTeamBlack} />
			</div>
			<div className={` ${style.item_3} ${style.searchStyleBtn}`}>
				<WhenDeparture isTeamBlack={isTeamBlack} />
			</div>
			<div className={` ${style.item_4} ${style.searchStyleBtn}`}>
				<Who isTeamBlack={isTeamBlack} />
			</div>
			<SearchBtn inputRef={inputRef} />
		</div>
	)
}

export default Search
