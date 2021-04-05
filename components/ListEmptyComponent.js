import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { AppText } from '.'
import { GlobalStyles } from '../styles/GlobalStyles'

const ListEmptyComponent = () => {
    return (
        <View style={styles.container}>
            <AppText {...styles.text}>Hmmm, Looks like a desert here, </AppText>
            <AppText {...styles.text}>wanna know why?</AppText>
            <TouchableOpacity style={styles.btnContainer}>
                <AppText {...styles.btnText}>Learn</AppText>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    btnContainer: {
        alignItems: 'center',
        backgroundColor: GlobalStyles.themeColor.color,
        borderRadius: 24,
        padding: 2,
        paddingHorizontal: 12,
        justifyContent: 'center',
        marginVertical: 8
    },
    btnText: {
        color: "#fff",
        fontSize: 14
    },
    container: {
        flex: 1,
        alignItems: 'center',
        margin: 24
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#5f5d5d'
    }
})
export default ListEmptyComponent

