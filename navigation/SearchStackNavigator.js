import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'


import {Cart, SearchScreen} from '../screens/'
import HeaderComponent from '../components/header'


const Stack = createStackNavigator()

const SearchStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                headerTitle: () => <HeaderComponent Cart={Cart} />
            }}
        >
            <Stack.Screen name="Search" component={SearchScreen} />
        </Stack.Navigator>
    )
}

export default SearchStackNavigator