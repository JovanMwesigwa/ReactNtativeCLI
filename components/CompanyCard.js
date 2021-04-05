import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useNavigation} from '@react-navigation/native'
import {  AntDesign,  } from '@expo/vector-icons';


import { AppText } from '.'
import { GlobalStyles } from '../styles/GlobalStyles'
import useVerifyNavigation from '../hooks/useVerifyNavigation';



const CompanyCard = ({  item, authUserName }) => {

  const navigation = useNavigation();

  const navigateToProfile = (item) => {
    if(authUserName === item.user) {
      navigation.navigate("Profile", { ID: item.id, })
    }else{
      navigation.navigate("CompanyProfile", { ID: item.id, }) 
    }
  }

const { container } = styles
 return(
      <View style={styles.cardContainer}>

          <TouchableOpacity onPress={() => navigateToProfile(item)}>
            <Image source={{ uri: item.profile_pic }} style={GlobalStyles.largeRoundedPictContainer} />
          </TouchableOpacity> 

            <View style={styles.middle}>

                <TouchableOpacity onPress={() => navigateToProfile(item)} style={styles.account}>
                    <Text style={{...GlobalStyles.text, fontWeight: '700', marginRight: 2}}>{item.user}</Text>
                    {item.verified && <AntDesign name="star" size={10} color={GlobalStyles.darkFontColor.color} />}
                </TouchableOpacity>

                <View>
                  <AppText {...GlobalStyles.mutedText}>{item.profile_type}</AppText>
                  <AppText {...styles.locationStyles}>{item.location}</AppText>
                  <AppText {...styles.statusStyles}>Open</AppText>
                </View>
                
            </View>
      </View>
  )
}


const styles = StyleSheet.create({
account: {
    flexDirection: 'row',
},
cardContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.8,
    borderTopColor: "#ddd",
    padding: 18,
  },
  mainText: {
      flex: 1,
      fontSize: 15,
      fontWeight: '600'
  },
  middle: { 
    flex: 2, 
    marginLeft: 20, 
    justifyContent: 'center' 
  },
  secondaryText: {
    color: '#777E8B'
  },
  cartBtnContainer: {
      padding: 5,
      paddingLeft: 0,
  },
  locationStyles: { 
    flex: 1,
    color: GlobalStyles.greenColor.color, 
    fontWeight: "700" 
  },
  statusStyles: {
    flex: 1, 
    fontSize: 13,
    color: '#2C3335', 
    fontWeight: "bold", 
    color: "gold", 
  }
})
export default CompanyCard