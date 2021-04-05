import React, { useEffect } from 'react'
import { ActivityIndicator, StyleSheet, FlatList, View } from 'react-native'


import { ErrorView, GalleryImageComponent, ListEmptyComponent } from '.'
import { GlobalStyles } from '../styles/GlobalStyles'

const SearchMediaComponent = ({ request, searchSellerFetchAPI, authUserName }) => {

    
    useEffect(() => {
        request()
    },[])

    if(searchSellerFetchAPI.loading) return <View><ActivityIndicator size={18} color={GlobalStyles.themeColor.color} /></View>

    if (searchSellerFetchAPI.errors) return <ErrorView onPress={() => console.log("more post")} error={errors} />


    return (
        <>
            <View style={styles.container}>
                <FlatList
                    data={searchSellerFetchAPI.data.results}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={styles.lineSeparator} />}
                    ListEmptyComponent={() => (
                        <ListEmptyComponent />
                    )}
                    renderItem={({ item }) => (
                        <GalleryImageComponent image={item.image}  price={item.price} profile={item.author.profile_pic} title={item.title}  />
                    )}
                    keyExtractor={(item) => item.id.toString()} 
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    lineSeparator: {
        backgroundColor: "#ddd",
        height: 0.8,
        marginBottom: 12,
        width: '100%'
    }

})

export default SearchMediaComponent
