import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';

const EmptyCartComponent = () => {
    return (
        <View style={styles.container}>
            <View style={styles.firstContainer}>
              <AntDesign name='shoppingcart' size={50} color="#777" />
              <Text style={styles.fillerText}>You have nothing in your cart</Text>
            </View>
          </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: 'yellow',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        zIndex: 99
    },
    firstContainer: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    fillerText: {
        fontSize: 15,
        color: "#777",
        fontWeight: "700",
        letterSpacing: 1,
        textAlign: "center"
    },
})

export default EmptyCartComponent
