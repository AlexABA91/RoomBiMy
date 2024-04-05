import { LatLngBounds } from 'leaflet'
import React, { useEffect } from 'react'
import { useMapEvents } from 'react-leaflet'
interface MapEventsProps {
	bounds: LatLngBounds | null
}

const MapEventsComponent: React.FC<MapEventsProps> = ({ bounds }) => {
	const map = useMapEvents({
		locationfound(e) {
			if (bounds) map.flyToBounds(bounds)
		},
	})

	useEffect(() => {
		map.locate()
	}, [map, bounds])

	return null // MapEventsComponent does not render any DOM elements
}

export default MapEventsComponent
