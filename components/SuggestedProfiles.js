import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { AppButton, SuggestedProfileCardComponent } from '.'
import { GlobalStyles } from '../styles/GlobalStyles'


const SuggestedProfiles = ({ userProfile, token, data, secondary }) => {
    const navigation = useNavigation()
    return (
        <>
        <View style={[styles.storiesContainer, { marginBottom: !secondary ? 8: 0, marginTop: !secondary ? 0 : 0.5, paddingVertical: ! secondary ? 0 : 8, paddingLeft: !secondary ? 0 : 18 }]}>

            <View style={styles.feedContainerTwo}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{...GlobalStyles.headerText, fontSize: 15}}>Suggested for you</Text>
                </View>

                    <AppButton small text="View All" onPress={() => console.warn('Power accounts') } />
    
            </View> 
            
        <View >
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                
            {data.map(item => (
                <TouchableWithoutFeedback key={item.id} >
                <View  style={{ paddingHorizontal: 4, paddingVertical: 15}}>
                    <SuggestedProfileCardComponent topBrand={item} token={token} />
                </View>
                </TouchableWithoutFeedback>
            ))}
            
            </ScrollView>
        </View> 

        </View>
        </>
    )
}

const styles = StyleSheet.create({
    feedContainerTwo: {
        paddingTop: 5,
        marginRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', 
      },
    storiesContainer: {
        backgroundColor: '#f5f4f4',
        // marginBottom: 8,
        width: '100%',
    },
      topProduct: {
          alignItems: 'center',
          flexDirection: "row",
          backgroundColor: "white",
          marginBottom: 8,
      },
      topStories: { 
        alignItems: 'center',
        alignSelf: 'center',
        width: 73, 
        height: 73, 
        marginLeft: 25,
        backgroundColor: GlobalStyles.themeColor.color,
        borderRadius: 73/2,
        marginRight: 10,
        justifyContent: 'center',
      },
})
export default SuggestedProfiles

