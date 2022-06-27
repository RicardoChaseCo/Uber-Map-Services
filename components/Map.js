import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import MapView, {Marker} from 'react-native-maps'
import tw from 'tailwind-react-native-classnames'
import { useSelector } from 'react-redux'
import { selectDestination, selectOrigin } from '../slices/navSlice'
import MapViewDirections from 'react-native-maps-directions'
import { useRef } from 'react'

const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef = useRef(null);

    useEffect( () => {
        if (!origin || !destination) return;

        mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
            edgePadding: {top: 50, right: 50}
        })
    }, [origin, destination] )


  return (
        <MapView
        ref={mapRef}
        style={tw`flex-1`}
        
        mapType='mutedStandard'

        initialRegion={{
            latitude: 39.299236,
            longitude: -76.609383,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            }}
        >
            {origin && destination && (
                <MapViewDirections 
                    origin={origin.description}
                    destination={destination.description}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor="black"
                />
            )}

            {origin?.location && (
                <Marker 
                    coordinate={{
                        latitude: 39.299236,
                        longitude: -76.609383,
                    }}
                />
            )}
        </MapView>    
  )
}

export default Map

const styles = StyleSheet.create({})