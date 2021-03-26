import React from 'react'
import { StyleSheet, View,Modal, TouchableOpacity, Image } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from 'react-native-maps'
// import MapViewDirections from 'react-native-maps-directions';
import {  AntDesign, Entypo } from '@expo/vector-icons';
import { AppText } from '../';



const origin = {latitude: 37.18825, longitude: -122.0324};
const destination = {latitude: 37.771707, longitude: -122.4053769};
const GOOGLE_MAPS_APIKEY = 'AIzaSyABpOgm2KMydgx1yg_p46YZJpT787-tEr8';


const ConfirmedOrderModal = ({ cost, visible, onPress, userLocation}) => {

    const userLatitude = () => {
        const lat = userLocation["coords"]["latitude"]
        return lat
    } 

    const userLongitude = () => {
        const long = userLocation["coords"]["longitude"]
        return long
    }

    if(!userLocation) return <View style={{ flex: 1 }}><AppText>No content</AppText></View>


    return (
        <Modal visible={visible}>
            <View  style={styles.container}>
                <TouchableOpacity onPress={onPress} style={styles.closeBtn}>
                        <AntDesign name="left" color="black" size={18} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onPress} style={styles.address}>
                        <Entypo name="address" color="black" size={20} />
                </TouchableOpacity>
                <MapView
                    style={{ height: '100%', width: '100%' }}
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation={true}
                    initialRegion={{
                        latitude: userLatitude(),
                        longitude: userLongitude(),
                        latitudeDelta: 0.3952,
                        longitudeDelta: 0.5951,
                    }}
                >
                
                <Marker
                    coordinate={{
                        latitude: 0.315690,
                        longitude: 32.578110,
                    }}
                    style={{ width: 35, height: 35 }}
                >
                    <Image source={require('../../assets/images/bike.png')}
                        style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                    />
                    </Marker>

                {/* <Circle
                    coordinate={{
                        latitude: userLatitude(),
                        longitude: userLongitude(),
                    }}
                    style={{ width: 35, height: 35 }}
                 /> */}

                    {/* <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={3}
                        strokeColor="hotpink"
                    /> */}

                </MapView>
                <View  style={styles.lowerView}>
                        <View style={{ width: 30, height: 8, marginBottom: 12, backgroundColor: '#B4B8B8', alignSelf: 'center' }} />
                    <View style={styles.innerContainer}>
                        <Image source={require('../../assets/images/bike.png')}
                            style={{ width: 65, height: 65, resizeMode: 'cover'}}
                        />
                        <View style={styles.middle}>
                            <AppText fontSize={15} fontWeight="bold">Order No: 237849</AppText>
                            <AppText fontSize={14} color="#838587">arrives in 2 mins</AppText>
                        </View>

                        <View style={styles.last}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <Entypo name="price-tag" color="gold" size={20} />
                                <AppText fontSize={15} fontWeight="bold"> $ {cost}</AppText>
                            </View>
                            <AppText fontSize={14} color="#fff">...</AppText>
                        </View>

                    </View>
                    
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    address: {
        borderRadius: 45/2,
        backgroundColor: '#fff',
        elevation: 10,
        top: 24,
        right: 24,
        position: 'absolute',
        padding: 12,
        shadowColor: 'black',     
        shadowOffset: { width: 0, height: 8 },     
        shadowOpacity: 0.16,     
        shadowRadius: 16,
        zIndex: 999,
    },
    container: {
        flex: 1,
    },
    closeBtn: {
        borderRadius: 45/2,
        backgroundColor: '#fff',
        elevation: 10,
        top: 24,
        left: 24,
        position: 'absolute',
        padding: 12,
        shadowColor: 'black',     
        shadowOffset: { width: 0, height: 8 },     
        shadowOpacity: 0.16,     
        shadowRadius: 16,
        zIndex: 999,
    },
    innerContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    middle: {
        // marginLeft: 8
    },
    last: {

    },
    lowerView: {
        backgroundColor: '#fff',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        bottom: 0,
        elevation: 10,
        left: 0,
        right: 0,
        position: 'absolute',
        height: 180,
        padding: 12,
        margin: 0,
        width: '100%',
        shadowColor: 'black',     
        shadowOffset: { width: 0, height: 8 },     
        shadowOpacity: 0.16,     
        shadowRadius: 16,
        zIndex: 10,
    }
})

export default ConfirmedOrderModal
