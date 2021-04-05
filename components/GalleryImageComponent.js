import React from 'react'
import { Image } from 'react-native'
import { StyleSheet, Dimensions, View, Text } from 'react-native'
import { AppText } from '.'
import { GlobalStyles } from '../styles/GlobalStyles'

const GalleryImageComponent = ({ image, price, profile, title  }) => {

    if(!image) return null

    return (
        <View style={styles.container}>

            <Image source={{ uri: image }} style={styles.imageStyles} />

            <View style={styles.infoContainer}>

                <View style={{ flex: 2, flexDirection: 'row' }}>
                    <View style={styles.sellerContainer}>
                        <Image source={{ uri: profile }} style={styles.profileImageStyles} />
                    </View>
                    <View style={styles.infoTextStyles}>
                        <Text style={styles.titleText} numberOfLines={1}>
                        {title}
                        </Text>  
                        <AppText {...styles.text} numberOfLines={1}>
                        Shs: {price}
                        </AppText>               
                    </View>
                </View>
                <View style={styles.btnContainer}>
                    <AppText {...styles.btnText}>Details</AppText>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    btnText: {
        color: "#fff",
        fontSize: 14
    },
    btnContainer: {
        alignItems: 'center',
        backgroundColor: '#1287A5',
        borderRadius: 8,
        paddingHorizontal: 8,
        marginRight: 25,
        height: 30,
        justifyContent: 'center'
    },
    container: {
        margin: 12
    },
    imageStyles: {
        aspectRatio: 3 / 2, 
        borderRadius: 8,
        width: "100%",
        resizeMode: 'cover'
    },
    titleText: {
        color: GlobalStyles.darkFontColor.color,
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: 8
    },
    text: {
        fontSize: 15,
    },
    infoContainer: {
        flexDirection: 'row',
        marginVertical: 8,
        justifyContent: 'space-between',
        width: Dimensions.get('screen').width
    },
    infoTextStyles: {
        
    },
    profileImageStyles: {
        height: '100%',
        resizeMode: 'cover',
        width: '100%',
    },
    sellerContainer: {
        backgroundColor: GlobalStyles.themeColor.color,
        borderRadius: 55/2,
        marginRight: 8,
        overflow: 'hidden',
        width: 55,
        height: 55
    }
})

export default GalleryImageComponent
