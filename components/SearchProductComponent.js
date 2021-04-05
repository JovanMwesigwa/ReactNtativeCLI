import React  from 'react'
import { StyleSheet, View, FlatList } from 'react-native'


import { ProductCard } from '.'



const SearchProductComponent = ({ authUserID, item }) => {


    return (
        <View style={styles.container}>
            <FlatList
                data={item.results}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <ProductCard 
                        item={item} 
                        reloadPosts={() => console.log('Reload post from search component')} 
                        authUserID={authUserID} 
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default SearchProductComponent
