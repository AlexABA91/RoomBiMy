'use client'
import React, { useEffect, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import style from '../components/searchResult.module.css'
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet'
import { useAppSelector } from '@/app/redux/hook'
import { DivIcon, LatLngBounds } from 'leaflet'
import { CardBiProps } from '@/app/type/type'
import { CardMap } from '@/app/components/map-main/card-map/CardMap'
import MapEventsComponent from './mapEventsComponent'

interface MarkerItem {
	geocode: [number, number]
	apartment: CardBiProps
	customIcon: DivIcon
}

const MapForSearch = () => {
	const bbox = useAppSelector(state =>
		state.searchReducer.DataSearchObj?.whereObj?.boundingbox?.map(value =>
			parseFloat(value)
		)
	)

	const [bounds, setBounds] = useState<LatLngBounds | null>(
		bbox == null || bbox.length === 0
			? new LatLngBounds([26, -15], [76, 35])
			: new LatLngBounds([bbox[0], bbox[2]], [bbox[1], bbox[3]])
	)
	useEffect(() => {
		if (bbox) {
			const newBounds = new LatLngBounds([bbox[0], bbox[2]], [bbox[1], bbox[3]])
			if (!bounds || !bounds.equals(newBounds)) {
				setBounds(newBounds)
			}
		}
	}, [bbox, bounds])

	const markerArray: MarkerItem[] = []

	const searchFilterData = useAppSelector(
		state => state.searchFilterReducer.collection
	)
	if (searchFilterData !== null)
		searchFilterData.map(item => {
			const markerItem: MarkerItem = {
				geocode: [parseFloat(item.ingMap), parseFloat(item.latMap)],
				apartment: item,
				customIcon: new DivIcon({
					className: 'custom-marker',
					html: `<div class="custom-marker-content"><p class="custom-marker-txt">$${item.pricePerNight}</p></div>`,
				}),
			}
			markerArray.push(markerItem)
		})

	return (
		<div className={style.mapContainer}>
			{bounds !== null && (
				<MapContainer
					bounds={bounds}
					scrollWheelZoom={true}
					style={{ width: '100%', height: '100%' }}
				>
					<TileLayer
						attribution={`<p class="tileLayer" >RoomBi Map</p>`}
						url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
					/>
					<MapEventsComponent bounds={bounds} />
					{markerArray.map((marker, index) => (
						<Marker
							key={index}
							position={marker.geocode}
							icon={marker.customIcon}
						>
							<Popup>
								<CardMap {...marker.apartment} />
							</Popup>
						</Marker>
					))}
				</MapContainer>
			)}
		</div>
	)
}

export default MapForSearch
