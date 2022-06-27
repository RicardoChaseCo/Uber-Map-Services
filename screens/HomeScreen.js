import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import React from 'react'
import tw from "tailwind-react-native-classnames";
import NavOptions from '../components/NavOptions';
import NavFavourites from '../components/NavFavourites';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from "@env";
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';


const HomeScreen = () => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={tw`bg-gray-100 h-full`}>
      <View style={tw`p-5`}>
        <Image 
          style={{
            width: 50,
            height: 50,
            resizeMode: "contain",
          }}
          source={{
            uri: "https://s2.loli.net/2022/06/27/V7jMHng1r5fqUPK.jpg",
          }}
        />
        
        <GooglePlacesAutocomplete 
          placeholder='Where From?' 
          styles={{
            container: {
              flex: 0,
              padding: 10,
            },
            textInput: {
              fontSize: 18,
            },
          }} 
          onPress={(data, details = null) => {
            dispatch(setOrigin({
                location: details.geometry.location,
                description: data.description,
            }))

            dispatch(setDestination(null))
          }}
          fetchDetails={true}
          enablePoweredByContainer={false}
          minLength={2}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: 'en',
          }}
          nearbyPlacesAPI='GooglePlacesSearch'
          debounce={400}
        />

        <NavOptions />
        <NavFavourites />
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})