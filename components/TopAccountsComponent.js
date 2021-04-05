import React from 'react'
import { StyleSheet,  View, ScrollView } from 'react-native'
import { AppText } from '.'

import data from '../data/data'


const TopAccountsComponent = () => {

    return (
        <>
        <View style={styles.top}>
            <AppText {...styles.header}>UPDATES FROM BOOKABIE</AppText>
            <View style={styles.dot} />
        </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.main}>

                {
                    data.map(item => (
                        <View key={item.id} style={styles.container}>
                            <AppText {...styles.title}>{item.title}</AppText>
                            <View style={styles.body}>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <AppText {...styles.bodyText}>{item.content}</AppText>
                                    <View style={[styles.imageContainer, {backgroundColor: item.color}]}>

                                    </View>
                                </View>
                            </View>
                        </View>
                    ))
                }


            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    body: {
        flexDirection: 'row',
        flex: 1,
    },
    bodyText: {
        flex: 1,
        marginTop: 8,
        fontSize: 14
    },
    dot: {
        backgroundColor: 'grey',
        borderRadius: 5,
        height: 10,
        width: 10,
    },
    container: {
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
        height: 120,
        padding: 12,
        marginBottom: 8,
        marginHorizontal: 8,
        width: 300,
    },
    header: {
        fontSize: 14,
        fontWeight: '600',
        color: "#3c3a3a"
    },
    imageContainer: {
        backgroundColor: "#4695b1",
        borderRadius: 50/2,
        height: 50,
        marginLeft: 5,
        width: 50,
    },
    title: {
        fontWeight: 'bold',
        color: "#3e3c3c"
    },
    top: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 8,
        marginHorizontal: 8,
        paddingHorizontal: 8,
        justifyContent: 'space-between'
    },
    main: {
        paddingLeft: 8
    }
})

export default TopAccountsComponent
