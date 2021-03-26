import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList,RefreshControl, TouchableOpacity, PermissionsAndroid } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { connect } from 'react-redux'


import {AppText, CheckoutItemCard, ErrorView, OtherHeaderComponent, } from '../../components/'
import { fetchCartData } from '../../redux/cart/CartRedux';
import { GlobalStyles } from '../../styles/GlobalStyles'
import useFetchData from '../../hooks/useFetchData'
import useFetchUserLocation from '../../hooks/useFetchUserLocation'
import useRequestLocationPermissions from '../../hooks/useRequestLocationPermissions'
import ConfirmedOrderModal from '../../components/Modals/ConfirmedOrderModal'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import SplashLoadingScreen from '../SplashLoadingScreen.js/SplashLoadingScreen'
 




const Checkout = ({ cartData, cartDataErrors, cartDataLoading, fetchCartData }) => {

    const [ openModal, setOpenModal ] = useState(false)

    const route = useRoute()

    const { token, ID } = route.params;

    useEffect(() => {
      requestLocationPermission()
      fetchCartData(token)
      cartPrice.request()
    },[])

    const close = () => setOpenModal(false)
       
    const cartPrice = useFetchData(token, `api/cart_cost/${ID}/`)

    const confirmOrderFunc = useFetchData(token, `api/confirm_order/${ID}/`)

    const { fetchCurrentLocation, userLocation } = useFetchUserLocation()

    const requestLocationPermission = useRequestLocationPermissions(fetchCurrentLocation)


    const open = () => {
      if(cartData.confirmed) {
        setOpenModal(true)
      }else{
        setOpenModal(false)
      }
    }

    // if (cartDataLoading) return <SplashLoadingScreen />

    if (cartDataErrors) return <ErrorView onPress={refreshOrder} error={cartDataErrors} />
    
    const refreshOrder = () => {
      requestLocationPermission()
      fetchCartData(token)
      cartPrice.request()
    }

    const fetchConfirmOrder = () => {
      confirmOrderFunc.request()
      fetchCartData(token)
    }

    const refreshControl = <RefreshControl 
      refreshing={cartDataLoading}
      onRefresh={refreshOrder}
    />

    return (
        <>
        <OtherHeaderComponent name="Checkout" />
            <View style={styles.container}>
              <View style={{ flex: 1 }}>
                <FlatList
                    ListHeaderComponent={
                      <TouchableOpacity style={{ marginVertical: 20 }}>
                          <AppText 
                            paddingHorizontal={8}
                            color={GlobalStyles.blue.color} 
                            >...</AppText>
                      </TouchableOpacity>
                    }
                    data={cartData.product}
                    showsVerticalScrollIndicator={false}
                    refreshControl={refreshControl}
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
                          !cartDataLoading &&
                          <>
                            {
                              !cartData.confirmed &&
                              <View style={styles.pricingBtns}>
                                  <TouchableOpacity style={styles.checkoutBtn} onPress={fetchConfirmOrder}>
                                    <Text style={styles.checkoutText}>Confirm Order</Text>
                                  </TouchableOpacity>
                              </View>
                            }
                          </>
                        }
                      </>
                    }
                />
                </View>
                {
                    cartDataErrors ? 
                    <View style={styles.errorStyles}>
                        <Text>{cartDataErrors}</Text>
                    </View> :
                    null
                }

            </View>
            <View >
            {
              cartData.confirmed && 
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
            <ConfirmedOrderModal 
              visible={openModal} 
              onPress={close} 
              cost={cartPrice.data.cost}
              userLocation={userLocation}
            />
          </View>
        </>
    )
}


const styles = StyleSheet.create({
  bottomLink: {
    justifyContent: 'flex-end',
    backgroundColor: "#137BD1",
    padding: 18,
  },  
    container: {
        backgroundColor: "#fff",
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    checkoutBtn: {
      padding: 8,
      backgroundColor: GlobalStyles.themeColor.color,
      margin: 8,
      borderRadius: 15,
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

