import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, ScrollView } from 'react-native'
import { MaterialCommunityIcons} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'

import { AppButton, TopProductCat } from '.'
import { GlobalStyles } from '../styles/GlobalStyles'
import { Image } from 'react-native';



const StoriesComponent = ({ userProfile, token, data, secondary }) => {
    const navigation = useNavigation()
    return (
        <>
        <View style={[styles.storiesContainer, { marginBottom: !secondary ? 8: 0, marginTop: !secondary ? 0 : 0.5, paddingVertical: ! secondary ? 0 : 8, paddingLeft: !secondary ? 0 : 18 }]}>

            {
                !secondary &&
                <View style={styles.feedContainerTwo}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, }}>
                        <MaterialCommunityIcons name="trending-up" size={20} color="green" />
                        <Text style={{...GlobalStyles.headerText, fontSize: 16}}>STORIES</Text>
                    </View>

                        <AppButton small text="View All" onPress={() => {
                        navigation.navigate('Company List', { authUser: userProfile.profile })
                        }} />
        
                </View> 
            }
        <View >
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {
                    !secondary &&
                    <View style={styles.topStories} >
                        <Image source={{ uri: userProfile.profile.profile_pic }} style={styles.picture} />
                        <MaterialCommunityIcons name="plus" size={23} color="#fff" style={styles.icon} />
                    </View>
                }
            {data.map(item => (
                <TouchableWithoutFeedback key={item.id} >
                <View  style={{ paddingHorizontal: 8, paddingVertical: 15}}>
                    <TopProductCat topBrand={item} token={token} />
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
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', 
      },
    storiesContainer: {
        backgroundColor: "#fff",
        marginBottom: 8,
        width: '100%',
    },
      topProduct: {
          alignItems: 'center',
          flexDirection: "row",
          backgroundColor: "white",
          marginBottom: 8,
      },
      icon: {
          borderRadius: 25,
        position: 'absolute',
        fontWeight: 'bold',
        top: 46,
        right: 0,
        padding: 2,
        backgroundColor: '#1287A5'
      },
      picture: {
        borderRadius: 73/2,
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
      },
      topStories: { 
        alignSelf: 'center',
        width: 73, 
        height: 73, 
        marginLeft: 25,
        borderRadius: 73/2,
        marginRight: 10,
        justifyContent: 'center',
      },
})

export default StoriesComponent

