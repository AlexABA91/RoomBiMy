import { AutoCompleteItem, SearchBtnEnum } from '@/app/type/type'
import style from '../Search.module.css'
import React from 'react'
import { useAppDispatch } from '@/app/redux/hook'
import { setWhereObj } from '@/app/redux/searchInHeader/SearchSlice'
import { setBtnState } from '@/app/redux/searchInHeader/SearchBtnStateSlice'
import Image from 'next/image'

interface WhereOptionDropDawnProps {
	setWhereOptionBlack: React.Dispatch<React.SetStateAction<boolean>>
	autoList: AutoCompleteItem[]
	setStringInput: React.Dispatch<React.SetStateAction<string>>
}

const WhereOptionDropDawn: React.FC<WhereOptionDropDawnProps> = ({
	setWhereOptionBlack,
	autoList,
	setStringInput,
}) => {
	const dispatch = useAppDispatch()

	const setItemToStore = (
		item: AutoCompleteItem
	): React.MouseEventHandler<HTMLDivElement> | undefined => {
		dispatch(setWhereObj(item))
		setStringInput(item.display_name)
		setWhereOptionBlack(false)
		dispatch(setBtnState(SearchBtnEnum.WhenCome))
		return
	}

	const addressTypeValidation = (addresstype: string): boolean => {
		return (
			addresstype === 'country' ||
			addresstype === 'city' ||
			addresstype === 'town' ||
			addresstype === 'village'
		)
	}

	return (
		<div className={`${style.whereOptionDropDawnBlok}`}>
			{autoList !== undefined &&
				autoList.map(
					item =>
						addressTypeValidation(item.addresstype) === true && (
							<div
								onClick={() => {
									setItemToStore(item)
								}}
								className={`${style.whereOptionDropDawnBlokItem}`}
								key={item.place_id}
							>
								<div>
									<div className={`${style.imagePoint}`}>
										<Image
											src={'/icon/pointOnMap.svg'}
											width={38}
											height={38}
											alt='point on map icon'
										/>
									</div>
									<div className={`${style.whereOptionDropDawnBlokItemText}`}>
										{item.addresstype === 'country'
											? `${item.address.country} `
											: `${item.address.country}, ${item.name}`}
									</div>
								</div>
							</div>
						)
				)}
		</div>
	)
}

export default WhereOptionDropDawn
