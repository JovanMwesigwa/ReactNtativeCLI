import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'


import {AddComment, DeliveryConfirm, DeliveryLocationSetup, TrackDeliveryMap, Cart, ChatRoom, Checkout, CompanyList, companyProfile, Find, PostProduct, Messages, ProductDetails, ProductEdit, SearchResults, Stories, SettingsComponent} from '../screens/'
import ProfileStackNavigator from './ProfileStackNavigator'
import HeaderComponent from '../components/header'

const Stack = createStackNavigator()

const HomeStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                headerTitle: () => <HeaderComponent Cart={Cart} />
            }}
        >
            <Stack.Screen 
                name="Home" 
                component={Find}
            />
            <Stack.Screen 
                name="Product Details" 
                component={ProductDetails}
                options={{ 
                headerShown: false,
                headerTitle: () => <HeaderComponent Cart={Cart} />
                }} 
            />
            <Stack.Screen 
                name="CompanyProfile" 
                component={companyProfile}
                options={{ 
                headerShown: false,
                headerTitle: () => <HeaderComponent Cart={Cart} />
                }}
            />
            <Stack.Screen 
                    name="Company List" 
                    component={CompanyList}
                    options={{ 
                    headerShown: false,
                    headerTitle: () => <HeaderComponent Cart={Cart} />
                    }}
                    />
                <Stack.Screen 
                    name="Edit Post" 
                    component={ProductEdit}
                    options={{ 
                        headerShown: false,
                        headerTitle: () => <HeaderComponent Cart={Cart} />
                    }}
            />
            <Stack.Screen 
                    name="Post Product" 
                    component={PostProduct}
                    options={{ 
                    headerShown: false,
                    headerTitle: () => <HeaderComponent Cart={Cart} />
                    }}
            />  
            <Stack.Screen 
                    name="AddComment" 
                    component={AddComment}
                    options={{ 
                    headerShown: false,
                    headerTitle: () => <HeaderComponent Cart={Cart} />
                    }}
          /> 
            <Stack.Screen 
                    name="Search Results" 
                    component={SearchResults}
                    options={{ 
                    headerShown: false,
                    headerTitle: () => <HeaderComponent Cart={Cart} />
                    }}
          /> 
          <Stack.Screen 
                    name="Cart" 
                    component={Cart}
                    options={{ 
                    headerShown: false,
                    headerTitle: () => <HeaderComponent Cart={Cart} />
                    }}
         />
        <Stack.Screen name="Chat" 
                    component={ChatRoom}
                    options={{ 
                        headerShown: false,
                        headerTitle: () => <HeaderComponent Cart={Cart} />
                    }} 
        />
         <Stack.Screen name="Messages" 
                component={Messages}
                options={{ 
                    headerShown: false,
                    headerTitle: () => <HeaderComponent Cart={Cart} />
                }} 
        />
        <Stack.Screen 
                name="Settings" 
                component={SettingsComponent}
                options={{ 
                headerShown: false,
                headerTitle: () => <HeaderComponent Cart={Cart} />
                }}
          /> 
        <Stack.Screen 
                name="Stories" 
                component={Stories}
                options={{ 
                headerShown: false,
                headerTitle: () => <HeaderComponent Cart={Cart} />
                }}
          /> 
        <Stack.Screen 
                name="Checkout" 
                component={Checkout}
                options={{ 
                headerShown: false,
                headerTitle: () => <HeaderComponent Cart={Cart} />
                }}
          /> 
         <Stack.Screen
                name="Profile"
                component={ProfileStackNavigator}
                options={{ 
                    headerShown: false,
                    headerTitle: () => <HeaderComponent Cart={Cart} />
                    }}    
         />
        <Stack.Screen
                name="DeliveryLocationSetup"
                component={DeliveryLocationSetup}
                options={{ 
                    headerShown: false,
                    headerTitle: () => <HeaderComponent Cart={Cart} />
                    }}    
         />
         <Stack.Screen
                name="DeliveryConfirm"
                component={DeliveryConfirm}
                options={{ 
                    headerShown: false,
                    headerTitle: () => <HeaderComponent Cart={Cart} />
                    }}    
         />
         <Stack.Screen
                name="TrackDeliveryMap"
                component={TrackDeliveryMap}
                options={{ 
                    headerShown: false,
                    headerTitle: () => <HeaderComponent Cart={Cart} />
                    }}    
         />
        </Stack.Navigator>
    )
}

export default HomeStackNavigator

