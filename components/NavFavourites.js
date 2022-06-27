import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames'

const data = [
    {
        id: "123",
        icon: "home",
        location: "Home",
        destination: "XXX, XXX, XXX"
    },
    {
        id: "456",
        icon: "briefcase",
        location: "work",
        destination: "YYY, YYY, YYY"
    },
]


const NavFavourites = () => {
  return (
    <FlatList 
        data = {data}
        keyExtractor = {(item) => {
            item.id
        }}
        
        renderItem = {({item: {location, destination, icon}}) => (
            <TouchableOpacity style={tw`flex-row items-center p-5`}>

                <Icon 
                    style={tw`mr-4 rounded-full bg-gray-300 p-3`}
                    name={icon}
                    type="ionicon"
                    color="white"
                    size={18}
                
                />

                <View>
                    <Text style={tw`font-semibold text-lg`}>{location}</Text>
                    <Text style={tw`text-gray-500`}>{destination}</Text>

                </View>


            </TouchableOpacity>
        )}
    />
  )
}

export default NavFavourites

const styles = StyleSheet.create({})