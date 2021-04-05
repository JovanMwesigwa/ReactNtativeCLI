import React from 'react'
import { View,  StyleSheet, Image } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'



import { useNavigation } from '@react-navigation/native'
import { AppText } from '.'
import { TouchableOpacity } from 'react-native'


const SuggestedProfileCardComponent = ({ topBrand, token }) => {

  const navigation = useNavigation()

const { container } = styles
 return(
   <>
    <TouchableWithoutFeedback onPress={() => navigation.navigate("CompanyProfile", {ID: topBrand.id})}>
        <View style={styles.outer}>
          <View style={container}>
                <Image source={{ uri: topBrand.profile_pic }} style={styles.imageStyles} />
          </View>
          <AppText {...styles.username}>{topBrand.user}</AppText>
          <TouchableOpacity style={styles.viewBtn}>
              <AppText {...styles.viewText}>View</AppText>
          </TouchableOpacity>
        </View>
    </TouchableWithoutFeedback>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 55,
    backgroundColor: "black",
    width: 55,
    borderRadius: 55/2,
    overflow: 'hidden',
  },
  imageStyles: {
      flex: 1, 
      borderRadius: 5, 
      width: null, 
      height:null, 
      resizeMode: "cover" 
},
  outer: {
      backgroundColor: '#fff',
    alignItems: 'center',
    borderWidth: 0.2,
    borderRadius: 5,
    height: 140, 
    width: 120,
    justifyContent: 'center'
  },
  username: {
      fontSize: 14,
      fontWeight: '700',
      marginTop: 5,
      textAlign: 'center'
  },
  viewBtn: {
      alignItems: 'center',
      backgroundColor: '#1287A5',
      justifyContent: 'center',
      borderRadius: 3,
      marginVertical: 8,
      width: '80%',
  },
  viewText: {
      color: '#fff',
        fontSize: 14,
        padding: 1,
  }
})
export default SuggestedProfileCardComponent