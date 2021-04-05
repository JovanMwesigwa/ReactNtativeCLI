import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const DrawerLinkComponent = ({ link, screenName, navigation}) => {
        
    return (
        <TouchableOpacity style={styles.linkContainer} onPress={() => navigation.navigate(screenName)}>
            <Text style={{ paddingLeft: 15, fontSize: 16, color: '#777' }}>{link}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    linkContainer: { 
        alignItems: 'center', 
        flexDirection: 'row', 
        paddingHorizontal: 12, 
        paddingVertical: 12 
    },
})

export default DrawerLinkComponent
