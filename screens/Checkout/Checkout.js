import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity,Platform, useColorScheme, PermissionsAndroid } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { connect } from 'react-redux'
import Geolocation from '@react-native-community/geolocation';


import {AppText, CheckoutItemCard, OtherHeaderComponent, } from '../../components/'
import { fetchCartData } from '../../redux/cart/CartRedux';
import { GlobalStyles } from '../../styles/GlobalStyles'
import useFetchData from '../../hooks/useFetchData'
import ConfirmedOrderModal from '../../components/Modals/ConfirmedOrderModal'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'





const Checkout = ({ cartData,cartDataErrors }) => {

    const [ confirmedOrder, setConfirmedOrder ] = useState(true)

    const [ openModal, setOpenModal ] = useState(false)

    const open = () => {
      if(confirmedOrder) {
        setOpenModal(true)
      }else{
        setOpenModal(false)
      }
    }

    const close = () => setOpenModal(false)
    
    const route = useRoute()

    const navigation = useNavigation()

    const { token, ID } = route.params;

    const cartPrice = useFetchData(token, `api/cart_cost/${ID}/`)

    const requestLocationPermission = async () => {
      // Refactor this code into a custom hook
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message:
              "Bookabie needs access to your location " +
              "so you can take awesome orders.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can access the location");
        } else {
          console.log("Location permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    };

    // const checkPlatform = () => {
    //   if(Platform.OS === 'android') requestLocationPermission()
    //   Geolocation.requestAuthorization()
    // }

  useEffect(() => {
    requestLocationPermission()
    fetchCartData(token)
    cartPrice.request()
  },[])

    return (
        <>
        <OtherHeaderComponent name="Checkout" />
            <View style={styles.container}>
                <FlatList
                    ListHeaderComponent={
                      <TouchableOpacity style={{ marginVertical: 20 }}>
                          <AppText 
                            paddingHorizontal={8}
                            color={GlobalStyles.blue.color} 
                            >Current Location</AppText>
                      </TouchableOpacity>
                    }
                    data={cartData.product}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={{ height: 1, width: '100%', backgroundColor: "#ddd" }} />}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                      <View >
                          <CheckoutItemCard item={item} token={token} />
                      </View>
                    )}
                    ListFooterComponent={
                      <>
                        <View  style={styles.priceContainer}>
                          <AppText 
                            paddingHorizontal={8}
                            fontSize={18} 
                            fontWeight='bold'
                            alignSelf="flex-end"
                            > Shs - {cartPrice.data.cost}</AppText>
                        </View>
                        {
                          !confirmedOrder &&
                          <View style={styles.pricingBtns}>
                              <TouchableOpacity style={styles.checkoutBtn} onPress={() => navigation.navigate('DeliveryLocationSetup',{token: token, ID: ID})}>
                                <Text style={styles.checkoutText}>Confirm Order</Text>
                              </TouchableOpacity>
                          </View>
                        }
                        
                      </>
                    }
                />
                {
                    cartDataErrors ? 
                    <View style={styles.errorStyles}>
                        <Text>{cartDataErrors}</Text>
                    </View> :
                    null
                }

            </View>
            {
              confirmedOrder && 
              <TouchableWithoutFeedback onPress={() => open()}>
                <View style={styles.bottomLink}>
                  <AppText fontSize={15} color="#E9F0F0" fontWeight="bold">
                    Your Order Is Coming
                  </AppText>
                  <AppText fontSize={13} color="#DEE3E3">
                    You can track it
                    <AppText 
                      fontSize={16} 
                      fontWeight="600"
                      color="#DEE3E3"
                      > HERE</AppText>
                  </AppText>
                </View>
              </TouchableWithoutFeedback>
            }
            <ConfirmedOrderModal visible={openModal} onPress={close} cost={cartPrice.data.cost} />
        </>
    )
}


const styles = StyleSheet.create({
  bottomLink: {
    backgroundColor: "#137BD1",
    padding: 18,
  },  
    container: {
        backgroundColor: "#fff",
        flex: 1,
        paddingHorizontal: 15,
    },
    checkoutBtn: {
      padding: 8,
      backgroundColor: GlobalStyles.themeColor.color,
      margin: 8,
      borderRadius: 25,
    },
    checkoutText: {
      color: "#fff",
      textAlign: "center",
      fontSize: 17
    },
    errorStyles: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    priceContainer: {
      paddingVertical: 20,
      borderTopWidth: 0.5,
      borderTopColor: "#ddd",
      marginVertical: 20
    },
    pricingBtns: { 
      backgroundColor: '#fff',
      paddingVertical: 20,
    },
})

const mapStateToProps = state => {
    return{
      cartData: state.cart.cartItems,
      cartDataLoading: state.cart.loading,
      cartDataErrors: state.cart.errors,
      authToken: state.auth.token
    }
  }
  const mapDispatchToProps = dispatch => {
    return{
      fetchCartData: (token) => dispatch(fetchCartData(token)),    
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(Checkout)

