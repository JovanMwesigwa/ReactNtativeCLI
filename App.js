import React, { useState, useEffect } from 'react'
import { View, ActivityIndicator, Text, StyleSheet, Keyboard, Image, StatusBar, TouchableOpacity, TouchableWithoutFeedback, FlatList } from 'react-native'
import store from './redux/store'
import { Provider } from 'react-redux'
import NavigationComponent from './navigation/navigation'
import { Provider as PaperProvider } from 'react-native-paper';
import MainApp from './MainApp'
import CompanyContextProvider from './context/profiles/CompanyContextProvider'
import PostContextProvider from './context/posts/PostContextProvider'
import CategoryContextProvider from './context/profiles/CategoryContextProvider'
import  UserAuthenticationProvider  from './context/authentication/UserAuthenticationContextProvider'
import AccountContextProvider from './context/accounts/AccountContextProvider'
import AuthContextProvider from './context/authentication/Context'
import UserInfoContextProvider from './context/userInfoContext/UserInfoContextProvider'
import Geolocation from '@react-native-community/geolocation';



navigator.geolocation = require('@react-native-community/geolocation');


const App = (props) => {
  

 return(
   <Provider store={store}>
    <PaperProvider>
      <AuthContextProvider>
        <UserInfoContextProvider>
          <UserAuthenticationProvider>
              <CompanyContextProvider>
                <AccountContextProvider>
                  <CategoryContextProvider>
                      <PostContextProvider>
                        <MainApp />
                      </PostContextProvider>
                  </CategoryContextProvider>
                </AccountContextProvider>
              </CompanyContextProvider>
          </UserAuthenticationProvider>
        </UserInfoContextProvider>
      </AuthContextProvider>
    </PaperProvider>
   </Provider>
  )
}

export default App