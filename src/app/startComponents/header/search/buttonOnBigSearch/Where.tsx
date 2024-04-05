import {
	ThemProps,
	SearchBtnEnum,
	AutoCompleteList,
	AutoCompleteItem,
} from '@/app/type/type'
import autoCompleteService from '@/app/services/autoCompleteService'
import style from '../Search.module.css'
import WhereDropDawn from './WhereDropDawn'
import React, { useEffect, useRef, useState } from 'react'
import WhereOptionDropDawn from './WhereOptionDropDawn'
import { useAppDispatch, useAppSelector } from '@/app/redux/hook'
import { setBtnState } from '@/app/redux/searchInHeader/SearchBtnStateSlice'
import ClearInputBtn from '@/app/ui/clearInput/ClearInputBtn'
import { setWhereEmptyObj } from '@/app/redux/searchInHeader/SearchSlice'
import { useTranslation } from 'react-i18next'

interface whereProps {
	inputRef: React.RefObject<HTMLInputElement>
	setTeamBlack: (setWhenDrop: boolean) => void
}
const Where: React.FC<whereProps & ThemProps> = ({
	inputRef,
	setTeamBlack,
	isTeamBlack,
}) => {
	const { t } = useTranslation()
	//const inputRef = useRef<HTMLInputElement>(null)
	const [autoList, setAutoList] = useState<AutoCompleteItem[]>([])

	const [drop, setWhenDropDawn] = useState(false)
	const dispatch = useAppDispatch()
	const btnState = useAppSelector(state => state.searchBtnStateReducer.bntState)
	const stateString = useAppSelector(state =>
		state.searchReducer.DataSearchObj.whereObj?.name === undefined
			? ''
			: state.searchReducer.DataSearchObj.whereObj?.name
	)

	const [stringInput, setStringInput] = useState('')

	useEffect(() => {
		stateString !== '' ? stateString : ''
		setStringInput(stateString)
	}, [stateString])
	const [whereOptionBlack, setWhereOptionBlack] = useState(false)
	useEffect(() => {
		if (btnState === SearchBtnEnum.Where) {
			setWhenDropDawn(true)
			if (inputRef.current) inputRef.current.focus()
		} else {
			setWhenDropDawn(false)
			setWhereOptionBlack(false)
		}
	}, [btnState, isTeamBlack, inputRef])

	const clearDataOnButton = (event: any) => {
		event.preventDefault()
		event.stopPropagation()
		setStringInput('')
		dispatch(setWhereEmptyObj())
	}

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value.trim()
		if (value.length > 2) {
			autoCompleteService(value, t('locale')).then(
				(data: AutoCompleteItem[] | null) => {
					if (data) {
						setAutoList(data)
					} else {
						console.log('Where handleInputChange No data fetched.')
					}
				}
			)
		}
		setStringInput(event.target.value)
		setWhereOptionBlack(true)
		setTeamBlack(true)
	}

	return (
		<>
			<div
				id='where'
				onClick={(event: React.MouseEvent<HTMLDivElement>) => {
					if ((event.target as HTMLElement).tagName === 'INPUT') {
						return
					}
					dispatch(setBtnState(SearchBtnEnum.Where))
				}}
				className={`p-0 ${style.resetButton} ${style.pText} ${
					(isTeamBlack && drop) || whereOptionBlack
						? style.btnBlackBacActive
						: style.btnStyle
				} ${isTeamBlack && !drop && style.btnBlackBac} text-start`}
			>
				<div
					className={` mt-3 mb-3 ps-lg-4 ps-md-4 ps-xs-5 ${
						isTeamBlack ? `${style.borderRightWhite} ` : style.borderRightBlack
					}`}
				>
					<p className={`m-0 ${style.head}`}>{t('Where')}</p>
					<input
						id='inputWhere'
						ref={inputRef}
						type='text'
						autoComplete='off'
						onClick={() => {
							if (!isTeamBlack) {
								setTeamBlack(true)
								if (btnState !== SearchBtnEnum.Where)
									dispatch(setBtnState(SearchBtnEnum.Where))
							} else {
								if (btnState !== SearchBtnEnum.Where)
									dispatch(setBtnState(SearchBtnEnum.Where))
							}
						}}
						placeholder={t('DirectionSearch')}
						className={` ${style.inputReset} m-0 ${
							inputRef.current !== null &&
							inputRef.current === document.activeElement
								? style.colorTwo
								: isTeamBlack &&
								  btnState !== SearchBtnEnum.Where &&
								  inputRef.current
								? style.colorTextBlackThem
								: style.colorTwo
						}`}
						value={stringInput}
						onChange={handleInputChange}
					/>
				</div>
				{stringInput !== undefined && stringInput.length > 0 && (
					<ClearInputBtn clearInput={clearDataOnButton} />
				)}
			</div>
			{drop && stringInput !== undefined && stringInput.length === 0 && (
				<WhereDropDawn setStringInput={setStringInput} />
			)}

			{whereOptionBlack &&
				stringInput.length > 2 &&
				autoList !== undefined &&
				autoList.length > 0 && (
					<WhereOptionDropDawn
						setWhereOptionBlack={setWhereOptionBlack}
						autoList={autoList}
						setStringInput={setStringInput}
					/>
				)}
		</>
	)
}

export default Where
