import React, {  useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { GlobalStyles } from '../styles/GlobalStyles'
import { useNavigation } from '@react-navigation/native';
import { Title } from 'react-native-paper';
import { fetchCartData } from '../redux/cart/CartRedux';


import SearchComponent from '../components/searchComponent';
import { fetchUserProfile } from '../redux/userProfile/userProfileRedux';



const MainHeaderComponent = ({authToken, parentCartData, cartData,  cartDataFetch, main, userProfile, fetchUser }) => {

    const navigation = useNavigation();

    const token = authToken
    
    useEffect(() => {
      cartDataFetch(token)
      fetchUser(token)
    },[])


const { container } = styles
 return(
   <>
   <View style={styles.mainContainer}>
      { main && <Title style={styles.headerText}>Bookabie</Title>}

     <View style={[styles.lowerContainer, { marginTop: !main ? 20 : 10}]}>

          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image source={{ uri: userProfile.profile.profile_pic }} style={[GlobalStyles.smallRoundedPictContainer]} />
          </TouchableOpacity>
        
          <SearchComponent />

        <View style={styles.cartStyleContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("Cart", {ID: userProfile.profile.id})} style={styles.cartContainer}>
              <AntDesign name='shoppingcart' size={33} 
              color="#4D4D4D"  />
            </TouchableOpacity>

            {
              !parentCartData.errors && 
              <>
                  <View style={styles.cartNumberContainer}>
                      <Text style={styles.cartNumber}>{parentCartData.loading ? '..' : cartData.product.length}</Text>
                  </View> 
                
              </>
            }
        </View>

     </View>
   </View>
    </>
  )
}


const styles = StyleSheet.create({
  cartStyleContainer: {
    alignItems: 'center',
    height: 55,
    marginLeft: 15,
    justifyContent: 'center',
    width: 55,

  },
  mainContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    elevation: 2,
    width: '100%',
  },
  lowerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 10,
    justifyContent: 'space-between',
    width: '100%',
  },
  cartContainer: {

  },
  container: {
    backgroundColor: 'white', 
    elevation: 2,  
    paddingHorizontal: 15, 
    width: "100%"
  },
  headerText: {
    fontSize: 30,
    letterSpacing: 2,
    paddingTop: 8,
    color: GlobalStyles.themeColor.color,
    fontWeight: "600",
  },
  profileContainer: { 
    width: 25, 
    height: 25, 
    borderRadius: 65 
},
logoStyles: {  
  height:34, 
  resizeMode: 'contain',
},
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    justifyContent: 'center',
  },
  cartNumber: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: 'center',
    color: "#fff",
    backgroundColor: "#B83227",
    padding: 1,
    borderWidth: 1,
    borderColor: 'white',
    paddingHorizontal: 5,
    borderRadius: 18
  },
  cartNumberContainer: {
    position: "absolute",
    bottom: 32,
    right: 0,
    zIndex: 1,
  }
})

const mapStateToProps = state => {
  return{
    cartData: state.cart.cartItems,
    parentCartData: state.cart,
    authToken: state.auth.token,
    userProfile: state.userProfile
  }
}

const mapDispatchToProps = dispatch => {
  return{
    cartDataFetch: token => dispatch(fetchCartData(token)),
    fetchUser: token => dispatch(fetchUserProfile(token))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MainHeaderComponent)