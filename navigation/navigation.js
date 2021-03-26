import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { connect } from 'react-redux'



import DrawerContent  from '../screens/DrawerContent/DrawerContent'
import MainTabsNavigation from './MainTabsNavigation';
import {AddComment, Cart, ChatRoom, Checkout, Messages, PostProduct } from '../screens/'



const Drawer = createDrawerNavigator();


// Root Drawer navigator
const NavigationComponent = ({ navigation,  }) => {

  return(
   <NavigationContainer >
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent = {props => <DrawerContent {...props} />}
        drawerType="front"
        drawerStyle={{
            width: 250,
        }}
    >
      <Drawer.Screen name="HomeTab" component={MainTabsNavigation} />
      <Drawer.Screen name="Messages" component={Messages} />
      <Drawer.Screen name="Chat" component={ChatRoom} />
      <Drawer.Screen name="Cart" component={Cart} />
      <Drawer.Screen name="Checkout" component={Checkout} />
      <Drawer.Screen name="Post Product" component={PostProduct} />
      <Drawer.Screen name="AddComment" component={AddComment} />
    </Drawer.Navigator>
   </NavigationContainer>
   )
 }

const mapStateToProps = state => {
  return{
    authToken: state.auth.token
  }
}

export default connect(mapStateToProps, null)(NavigationComponent);