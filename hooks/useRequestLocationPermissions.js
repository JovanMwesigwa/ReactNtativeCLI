import React from 'react'
import { PermissionsAndroid } from 'react-native'



const useRequestLocationPermissions = (fetchCurrentLocationFunc) => {

    const requestLocationPermission = async () => {
        // Refactor this code into a custom hook
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "Location Permission",
              message:
                "Bookabie needs access to your location " +
                "so that we can deliver to your package",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            fetchCurrentLocationFunc()
          } else {
            console.log("Location permission denied");
          }
        } catch (err) {
          console.warn(err);
        }
      };

    return requestLocationPermission
}

export default useRequestLocationPermissions

