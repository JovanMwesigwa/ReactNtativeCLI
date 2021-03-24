import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import {AppText, CheckoutItemCard, OtherHeaderComponent, } from '../../components/'
import { GlobalStyles } from '../../styles/GlobalStyles'

const DeliveryLocationSetup = () => {
    return (
        <View style={styles.container}>
            {/* <AppText {...styles.text}>Your Delivery details</AppText> */}
            <View style={styles.firstContainer}>

            </View>
            <View style={styles.middle}>

            </View>
            <View style={styles.last}>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    firstContainer: {

    },
    middle: {

    },
    last: {
        
    }
})

export default DeliveryLocationSetup
