import React, { useEffect } from 'react'
import { ActivityIndicator, StyleSheet, FlatList, View } from 'react-native'

import { ListEmptyComponent, CompanyCard, ErrorView } from '.'
import { GlobalStyles } from '../styles/GlobalStyles'


const SearchSellerComponent = ({ request, searchSellerFetchAPI, authUserName }) => {


    useEffect(() => {
        request()
    },[])

    if(searchSellerFetchAPI.loading) return <View style={{ marginTop: 12 }}><ActivityIndicator size={18} color={GlobalStyles.themeColor.color} /></View>

    if (searchSellerFetchAPI.errors) return <ErrorView onPress={() => console.log("more post")} error={errors} />

    return (
        <>
            <View style={styles.container}>
                <FlatList
                    data={searchSellerFetchAPI.data.results}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <ListEmptyComponent />
                    )}
                    renderItem={({ item }) => (
                        <CompanyCard item={item} authUserName={authUserName} />
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
    }
})

export default SearchSellerComponent
