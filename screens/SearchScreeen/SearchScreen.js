import React, { useState } from 'react'
import { StyleSheet, View, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import Fontisto from 'react-native-vector-icons/Fontisto';
import { connect } from 'react-redux'


import {  Tab, Tabs } from 'native-base';
import { GlobalStyles } from '../../styles/GlobalStyles';
import {SearchMediaComponent, SearchProductComponent, SearchSellerComponent} from '../../components/';
import useFetchData from '../../hooks/useFetchData';


const SearchScreen = ({authToken, userProfile}) => {

    const [ searchedText, setSearchedText ] = useState("");

    const token = authToken;

    const searchProductFetchAPI = useFetchData(token, `api/posts/?search=${searchedText}`)

    const searchSellerFetchAPI = useFetchData(token, `api/profiles/?search=${searchedText}`)

    const searchedTextHandler = (text) =>{
        setSearchedText(text)
    }

    const handleSubmitText = () => {
        searchProductFetchAPI.request()
        Keyboard.dismiss()
        fetchSellerHandler()
    }

    const fetchSellerHandler = () => {
        searchSellerFetchAPI.request()
    }

    const fetchGalleryHandler = () => {
        searchSellerFetchAPI.request()
    }

    return (
    <View style={styles.container}>
        <View style={styles.searchContainer}>
            <TextInput
                placeholder="Search for any product..."
                style={styles.inputStyles}
                value={searchedText}
                onChangeText={searchedTextHandler}
            />
            <TouchableOpacity style={styles.btnStyles} onPress={handleSubmitText}>
                <Fontisto name="search" color="#525252"size={18} /> 
            </TouchableOpacity>
        </View>
  
        <>
                <Tabs 
                    tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
                    tabContainerStyle={styles.tabContainerStyle}
                    >
                    <Tab 
                        heading="Product"
                        tabStyle={styles.tabStyle} 
                        textStyle={styles.tabText} 
                        activeTabStyle={styles.activeTabStyle} 
                        activeTextStyle={styles.activeTextStyle}
                    >

                        {/* Show searched products */}
                        <View style={styles.tabContainer}>
                            <SearchProductComponent 
                                item={searchProductFetchAPI.data}
                                authUserID={userProfile.profile.id}
                             />
                        </View>
                        
                    </Tab>

                    <Tab 
                        heading="Seller"
                        tabStyle={styles.tabStyle} 
                        textStyle={styles.tabText} 
                        activeTabStyle={styles.activeTabStyle} 
                        activeTextStyle={styles.activeTextStyle}
                    >

                        {/* Show searched sellers */}
                        <View style={styles.tabContainer}>
                            <SearchSellerComponent
                                token={token}
                                request={fetchSellerHandler} 
                                searchSellerFetchAPI={searchSellerFetchAPI}
                                authUserName={userProfile.user}
                            />
                        </View>

                    </Tab>

                    <Tab heading="Gallery"
                        tabStyle={styles.tabStyle} 
                        textStyle={styles.tabText} 
                        activeTabStyle={styles.activeTabStyle} 
                        activeTextStyle={styles.activeTextStyle}
                    >

                        {/* show searched Media, pics */}
                        <View style={styles.tabContainer}>
                            <SearchMediaComponent
                                token={token}
                                request={fetchGalleryHandler} 
                                searchSellerFetchAPI={searchProductFetchAPI}
                                authUserName={userProfile.user}
                            />
                        </View>

                    </Tab>

                    <Tab heading="Media"
                        tabStyle={styles.tabStyle} 
                        textStyle={styles.tabText} 
                        activeTabStyle={styles.activeTabStyle} 
                        activeTextStyle={styles.activeTextStyle}
                    >

                        {/* show map */}

                    </Tab>

                </Tabs>
            </>

    </View>
    )
}

const styles = StyleSheet.create({
    activeTabStyle: {
        backgroundColor: 'white'
    },
    activeTextStyle: {
        color: GlobalStyles.themeColor.color, 
        fontWeight: '700'
    },
    btnStyles: {
        alignItems: 'center',
        backgroundColor: '#efeeee',
        borderRadius: 8,
        marginLeft: 8,
        height: "100%",
        padding: 2,
        justifyContent: 'center',
        width: 38
    },
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    inputStyles: {
        flex: 1,
        backgroundColor: "#e6e5e5",
        borderRadius: 8,
        fontSize: 15,
        paddingHorizontal: 25
    },
    tabContainer: {
        flex: 1
    },
    tabContainerStyle: { 
        height: 45,
        width: '100%',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ddd',
     },
    tabBarUnderlineStyle: {
        borderBottomWidth:4, 
        borderBottomColor: 
        GlobalStyles.themeColor.color
    },
    tabText: {color: '#777'},
    tabStyle: {backgroundColor: 'white'},
    searchContainer: {
        height: 40,
        flexDirection: 'row',
        margin: 10,
    },
    
})

const mapStateToProps = state => {
    return{
      authToken: state.auth.token,
      userProfile: state.userProfile,
    }
  }
  

export default connect(mapStateToProps, null)(SearchScreen)
