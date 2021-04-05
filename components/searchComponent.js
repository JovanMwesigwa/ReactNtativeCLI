import React from 'react'
import { View,  StyleSheet,TouchableWithoutFeedback } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'



import { AppText } from '.'


const SearchComponent = () => {

  const navigation  = useNavigation()

const { container } = styles
 return(
  <View style={container}>
    <TouchableWithoutFeedback onPress={() => navigation.navigate('Search')}>
      <View style={styles.input}>
          <MaterialIcons name="search" size={18} color="#827e7e" style={styles.icon} />
          <AppText {...styles.placeholderText}>Search for any product...</AppText>
      </View>
    </TouchableWithoutFeedback>
  </View>
  )
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
  },
  headerText: {
      padding: 20
  },
  icon: {

  },
  placeholderText: {
    color: "#827e7e",
    fontSize: 14,
    marginLeft: 12
  },
  input: {
    alignItems: 'center',
    backgroundColor: '#e6e5e5',
    borderRadius: 5,
    flexDirection: 'row',
    padding: 8,
    marginHorizontal: 15,
    width: "100%",
},
})
export default SearchComponent;