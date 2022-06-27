import { Text, View } from 'react-native'
import React from 'react'
import { FlatList, Image, TouchableOpacity } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const data = [
    {
        id: "123",
        title: "Get a ride",
        image: "https://s2.loli.net/2022/06/27/z2JdYfw9sInBGug.png",
        screen: "MapScreen",
    },
    {
        id: "456",
        title: "Order food",
        image: "https://links.papareact.com/28w",
        screen: "EatsScreen",
    },
];

const NavOptions = () => {
    const navigation = useNavigation();

  return (
    <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
            <TouchableOpacity
                onPress={() => navigation.navigate(item.screen)}
                style={tw`p-2 pl-6 pr-6 pb-6 pt-6 bg-white m-2 w-40`}
            >
                <View>

                    <Image 
                        style={{width: 130, height: 130, resizeMode: 'contain'}}
                        source={{uri: item.image}}
                    />   
                    <Text style={tw`text-lg mt-2 font-semibold `}>{item.title}</Text> 
                    <Icon 
                    style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                    name="arrowright"
                    color="white"    
                    type='antdesign'
                        
                    />
                </View>
            </TouchableOpacity>
        )}
    />
  );
};

export default NavOptions
