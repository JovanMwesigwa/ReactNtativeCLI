import React from 'react'
import Geolocation from '@react-native-community/geolocation';

const useFetchUserLocation = () => {

    const [ userLocation, setUserLocation ] = React.useState(null);

    const fetchCurrentLocation = async() => {
        try {
          await Geolocation.getCurrentPosition(info => setUserLocation(info))
        } catch (error) {
          console.log(error)
        }
      }

    return {
        userLocation, setUserLocation, fetchCurrentLocation
    }
}

export default useFetchUserLocation

