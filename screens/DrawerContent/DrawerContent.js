import React,{ useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { Ionicons, } from '@expo/vector-icons'
import { Caption, Paragraph, Drawer, Text,} from 'react-native-paper'
import {  DrawerContentScrollView  } from '@react-navigation/drawer'
import { connect } from 'react-redux';



import {AppText, DrawerLinkComponent, ErrorView, } from '../../components/';
import { fetchUserProfile } from '../../redux/userProfile/userProfileRedux';
import SplashLoadingScreen from '../SplashLoadingScreen.js/SplashLoadingScreen';
import { signOut } from '../../redux/auth/authRedux'


const logo = require('../../assets/Logos/logo.png')
const logo2 = require('../../assets/Logos/myLogo.png')


const DrawerContent = ({navigation, authToken, signOut, userProfile, fetchUser}) => {

    const token = authToken;

    useEffect(() => {
        fetchUser(token)
    },[])
    
    const logOutUser = () => signOut(token)
    
    const reloadPosts = () => {
        fetchUser(token)
    }

    if (userProfile.loading) return <SplashLoadingScreen />

    if (userProfile.error) return <ErrorView onPress={reloadPosts} error={userProfile.error} />

        return(
            <>
             <DrawerContentScrollView showsVerticalScrollIndicator={false} >
                <View style={styles.drawerContent}>

                    <View style={styles.userInfoSection}>
                        <View>
                        <View style={styles.accountContainer}>
                                <Image source={{ uri: userProfile.profile.profile_pic }} style={styles.imageStyles} />
                            <View>
                                <AppText {...styles.title}>{userProfile.profile.user}</AppText>
                                <AppText {...styles.caption}>{userProfile.profile.location}</AppText>
                            </View>
                        </View>
                        
                        <View style={styles.row}>
                            <View style={styles.section}>
                                <View style={styles.infoContainer}>
                                    <Paragraph style={[styles.paragraph,styles.caption, { color: "#fff" }]}>
                                        {userProfile.profile.followers.length}</Paragraph>
                                    <Caption style={styles.caption}>followers</Caption>
                                </View>
                                <View style={styles.infoContainer}>
                                    <Paragraph style={[styles.paragraph,styles.caption, { color: "#fff" }]}
                                    >{userProfile.profile.followers.length}</Paragraph>
                                    <AppText {...styles.caption}>following</AppText>
                                </View>
                            </View>
                        </View>
                        </View>

                        <TouchableWithoutFeedback onPress={() => navigation.navigate('Cart', {ID: userProfile.profile.id})} >
                            <View style={styles.cartContainer}>
                                <AppText {...styles.sectionText}>My Cart</AppText>
                                <View style={styles.dot} />
                            </View>
                        </TouchableWithoutFeedback>

                    </View> 

                    <Drawer.Section style={styles.drawerSection}>

                        <DrawerLinkComponent link="Home" screenName='Find' navigation={navigation}/>

                        <DrawerLinkComponent link="Profile" screenName='Profile' navigation={navigation} />

                        <DrawerLinkComponent link="Messages" screenName='Messages' navigation={navigation}/>

                        <DrawerLinkComponent link="Settings" screenName='Settings' navigation={navigation} />

                    </Drawer.Section>

                </View>
                
             </DrawerContentScrollView>


<View style={styles.promoLogo}>
                        <Image source={logo} style={{ width: 34, height: 34, borderRadius: 5 }} />
                        <Image source={logo2} style={styles.cartStyles} />
                        <View>
                            <Text style={styles.textStyle}>Bookabie</Text>
                            <Text style={styles.capTextStyle}>Sell & Buy Beyond</Text>
                        </View>
                    </View> 
             <Drawer.Section style={styles.bottomDrawerSection}>
                 <TouchableOpacity style={styles.logoutContainer}
                    onPress={logOutUser}
                    >
                    <Ionicons name="md-exit" size={28} color="#777" />
                    <Text style={{ paddingLeft: 15, fontSize: 15, color: '#777' }}>Sign Out</Text>
                 </TouchableOpacity>
             </Drawer.Section>
        </>
     )
 }

 const styles = StyleSheet.create({
     accountContainer: { 
         alignItems: 'center', 
         flexDirection: 'row', 
         marginTop: 15, 
         paddingHorizontal: 20 
        },
     cartContainer: { 
        alignItems: 'center', 
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        marginTop: 20,
        borderTopColor: "#bbb7b7",
        borderBottomColor: "#bbb7b7",
        paddingHorizontal: 20,
        flexDirection: 'row', 
        paddingVertical: 12,
        justifyContent: 'space-between'
    },
     drawerContent: {
         flex: 1,
     },
     dot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: '#23e837'
     },
     imageStyles: { 
         borderRadius: 55, 
         height: 55, 
         marginRight: 10,
         width: 55, 
    },
     userInfoSection: {
         backgroundColor: '#651414',
         paddingBottom: 35,
         height: 250,
         paddingTop: 10,
         justifyContent: 'space-between',
         width: '100%',
     },
     logoutContainer: { 
         alignItems: 'center', 
         flexDirection: 'row', 
        paddingHorizontal: 12, 
        paddingVertical: 12 
    },
     title: {
         fontSize: 16,
         color: "#fff",
         fontWeight: 'bold'
     },
     textStyle: {
        fontSize: 15,
        paddingHorizontal: 10,
        color: '#B83227',
     },
     infoContainer: {
         alignItems: 'center',
        flexDirection: 'row',
     },
     capTextStyle: {
        paddingHorizontal: 10,
        color: '#B83227',
        fontSize: 12
     },
     caption: {
         fontSize: 14,
         lineHeight: 14,
         color: "#bbb7b7"
     },
     row: {
         marginTop: 10,
         flexDirection: 'row',
         marginRight: 15
     },
     section: {
         flexDirection: 'row',
         alignItems: 'center',
         width: '90%',
         marginRight: 15,
         justifyContent: 'space-between',
         paddingHorizontal: 20
     },
     sectionText: { 
         paddingRight: 15, 
         fontSize: 15, 
         color: '#fff', 
         fontWeight: 'bold' 
    },
     cartStyles: { 
         width: 40, 
         height: 40,
         marginLeft: 5,
         borderRadius: 5
        },
     paragraph: {
         fontWeight: 'bold',
         marginRight: 3
     },
     promoLogo: { flexDirection: 'row', elevation: 5, paddingHorizontal: 15, marginTop: 25 },
     drawerSection: {
        paddingBottom: 25
     },
     bottomDrawerSection: {
         marginBottom: 15,
         borderTopColor: '#f4f4f4',
         borderTopWidth: 1
     },
 })

 const mapStateToProps = state => {
     return{
         authToken: state.auth.token,
         userProfile: state.userProfile
     }
 } 

 const mapDispatchToProps = dispatch => {
     return{
        signOut: (token) => dispatch(signOut(token)),
        fetchUser: token => dispatch(fetchUserProfile(token))
     }
 }

 export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);