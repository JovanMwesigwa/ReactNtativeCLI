import React from 'react'
import { StyleSheet, Text, Image, View, Dimensions, TouchableOpacity } from 'react-native'
import moment from 'moment';
import { MaterialIcons } from '@expo/vector-icons';




const StoryComponent = ({item, onPress, user}) => {

    return (
        <View style={styles.container}>
        <Image
            source={{ uri: item.image }}
            style={{ flex: 1, width: null, height: null, resizeMode: "contain" }}
        />
            <View style={styles.headerDark}>
                
            </View>
            <View style={styles.accountContainer}>
                <View style={styles.header}>
                    <Image source={{ uri: user.profile_pic }} style={styles.userImage} />
                    <View >
                        <Text style={styles.userStyles} >{user.user}</Text>
                        <Text style={[styles.userStyles, { fontSize: 14, color: "#777" }]} >{ moment(item.created).startOf('hour').fromNow()}</Text>
                    </View>
                </View>

                    <TouchableOpacity style={styles.topBtnContainer}  onPress={onPress} >
                        <MaterialIcons name="close" size={25} color="#fff" /> 
                    </TouchableOpacity>
            </View>
            <View style={styles.textContainer}>
                <View style={styles.contentContainer}>
                    <Text style={styles.text} numberOfLines={4}>{item.content}</Text>
                </View>
            </View>
        </View>
    )
}

const dimensions = Dimensions.get('screen')

const styles = StyleSheet.create({
    accountContainer: {
        alignItems: 'center',
        position: 'absolute',
        height: 80,
        width: '100%',
        top: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        left: 0,
        right: 0,
        bottom: 0
    },
    container: {
        height: dimensions.height,
        width: dimensions.width
    },
    contentContainer: {
        flex: 1,
        padding: 12,
        opacity: 0.8
    },
    topBtnContainer: {
        padding: 15, 
        borderRadius: 64, 
    },
    header: { 
        alignItems: 'center', 
        flexDirection: 'row',
        justifyContent: 'center',
    },
    headerDark: {
        height: 80,
        backgroundColor: 'black',
        opacity: 0.6,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: '100%'
    },
    userContainer: {
        alignItems: 'center',
        backgroundColor: 'brown',
        borderRadius: 55/2,
        height: 55,
        marginRight: 10,
        flexDirection: 'row',
        overflow: 'hidden',
        width: 55,
    },
    imageContainer: {
        backgroundColor: 'black',
        height: 560,
        flex: 2,
        width: '100%',
    },
    infoContainer: {
        bottom: 0,
        position: 'absolute', 
        width: "100%", 
        opacity: 0.6,
        height: 140, 
        backgroundColor: 'black' 
    },
    imageStyles: {
        opacity: 1,
        height: '100%',
        width: '100%'
    },
    userImage: {  
        borderRadius: 45/2, 
        height:45,
        marginRight: 8,
        width: 45, 
      },
    textContainer: {
        alignSelf: 'center',
        bottom: 50,
        position: 'absolute',
        flexDirection: 'row',
        width: "100%"
    },
    text: {
        color: '#fff',
        fontSize: 15,
        fontWeight: "normal",
        zIndex: 99
    },
    userStyles: {
        color: '#fff',
        fontSize: 16,
        fontWeight: "bold",
    }
})

export default StoryComponent
