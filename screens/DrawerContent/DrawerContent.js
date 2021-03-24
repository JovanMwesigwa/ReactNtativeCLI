import React,{ useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Ionicons, MaterialCommunityIcons,Feather, FontAwesome, AntDesign } from '@expo/vector-icons'
import { Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch } from 'react-native-paper'
import {  DrawerContentScrollView  } from '@react-navigation/drawer'
import { connect } from 'react-redux';
import { signOut } from '../../redux/auth/authRedux'



import {ErrorView, } from '../../components/';
import { fetchUserProfile } from '../../redux/userProfile/userProfileRedux';
import SplashLoadingScreen from '../SplashLoadingScreen.js/SplashLoadingScreen';


const logo = require('../../assets/Logos/round.png')
const logo2 = require('../../assets/Logos/myLogo.png')


const DrawerContent = ({navigation, authToken, signOut, userProfile, fetchUser}) => {

    const token = authToken;

    const reloadPosts = () => {
        fetchUser(token)
    }

    const logOutUser = () => signOut(token)

    useEffect(() => {
        fetchUser(token)
    },[])

    if (userProfile.loading) return <SplashLoadingScreen />

    if (userProfile.error) return <ErrorView onPress={reloadPosts} error={userProfile.error} />

        return(
         <View style={{ flex: 1 }}>
             <DrawerContentScrollView >
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
                                <Image source={{ uri: userProfile.profile.profile_pic }} style={{ width: 50, height: 50, borderRadius: 50, borderWidth: 0.5, borderColor: '#777'}} />
                            <View style={{ marginLeft: 12 }}>
                                <Title style={styles.title}>{userProfile.profile.user}</Title>
                                <Caption style={styles.caption}>{userProfile.profile.location}</Caption>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph,styles.caption]}>{userProfile.profile.followers.length}</Paragraph>
                                <Caption style={styles.caption}>followers</Caption>
                            </View>
                        </View>
                    </View> 

                    <Drawer.Section style={styles.drawerSection}>

                    <TouchableOpacity style={{ flexDirection: 'row', 
                        alignItems: 'center', paddingHorizontal: 12, 
                        paddingVertical: 12 }}
                        onPress={() => navigation.navigate('Find')}
                        >
                        {/* <Ionicons name="md-exit"  /> */}
                        <FontAwesome name="home" size={28} color="#777" />

                        <Text style={{ paddingLeft: 15, fontSize: 16, color: '#777' }}>Home</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: 'row', 
                        alignItems: 'center', paddingHorizontal: 12,   
                        paddingVertical: 12 }}
                        onPress={() => navigation.navigate('Profile')}
                        >
                        {/* <Ionicons name="md-exit"  /> */}
                        <MaterialCommunityIcons name="account-circle" size={28} color="#777" />
                        <Text style={{ paddingLeft: 15, fontSize: 15, color: '#777' }}>Profile</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: 'row', 
                        alignItems: 'center', paddingHorizontal: 12, 
                        paddingVertical: 12 }}
                        onPress={() => navigation.navigate('Cart', {ID: userProfile.profile.id})}
                        >
                    {/* <FontAwesome name="cart"  /> */}
                        <AntDesign name='shoppingcart' size={28} color="#777" />
                        <Text style={{ paddingLeft: 15, fontSize: 15, color: '#777' }}>Cart</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Messages')} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 12 }}>
                        <AntDesign name='mail' size={25} color="#777" />
                        <Text style={{ paddingLeft: 15, fontSize: 15, color: '#777' }}>Messages</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', 
                        paddingHorizontal: 12, paddingVertical: 12 }}
                        onPress={() => navigation.navigate('Settings')}
                        >
                        <Feather name="settings" size={24} color="#777" />
                        <Text style={{ paddingLeft: 15, fontSize: 15, color: '#777' }}>Settings </Text>
                    </TouchableOpacity>

                    </Drawer.Section>

                    <Drawer.Section title="Preferences">
                            <TouchableRipple>
                                <View style={styles.preference}>
                                    <Text style={{fontSize: 15, color: '#777' }}>Dark Theme</Text>
                                    <View pointerEvents="none">
                                        <Switch />
                                    </View>
                                </View>
                            </TouchableRipple>
                    </Drawer.Section>

                </View>
                <View style={{ flexDirection: 'row', elevation: 5, paddingHorizontal: 15, alignItems: 'center' }}>
                    <Image source={logo} style={{ width: 34, height: 34, borderRadius: 5 }} />
                    <Image source={logo2} style={styles.cartStyles} />
                    <View>
                        <Text style={styles.textStyle}>Bookabie</Text>
                        <Text style={styles.capTextStyle}>Sell & Buy Beyond</Text>
                    </View>
                </View> 
                
             </DrawerContentScrollView>
             <Drawer.Section style={styles.bottomDrawerSection}>
                 <TouchableOpacity style={{ flexDirection: 'row', 
                    alignItems: 'center', paddingHorizontal: 12, 
                    paddingVertical: 12 }}
                    onPress={logOutUser}
                    >
                    <Ionicons name="md-exit" size={28} color="#777" />
                    <Text style={{ paddingLeft: 15, fontSize: 15, color: '#777' }}>Sign Out</Text>
                 </TouchableOpacity>
             </Drawer.Section>
         </View>
     )
 }

 const styles = StyleSheet.create({
     drawerContent: {
         flex: 1
     },
     userInfoSection: {
         paddingLeft: 20,
     },
     title: {
         fontSize: 16,
         marginTop: 3,
         fontWeight: 'bold'
     },
     textStyle: {
        fontSize: 15,
        paddingHorizontal: 10,
        color: '#B83227',
     },
     capTextStyle: {
        paddingHorizontal: 10,
        color: '#B83227',
        fontSize: 12
     },
     messageNotification: { 
        backgroundColor: 'red', 
        paddingHorizontal: 3,
        borderRadius: 5,
        position: 'absolute',
        top: 15,
        right: 24
    },
     caption: {
         fontSize: 14,
         lineHeight: 14
     },
     row: {
         marginTop: 20,
         flexDirection: 'row',
         marginRight: 15
     },
     section: {
         flexDirection: 'row',
         alignItems: 'center',
         marginRight: 15
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
     drawerSection: {
         marginTop: 15
     },
     bottomDrawerSection: {
         marginBottom: 15,
         borderTopColor: '#f4f4f4',
         borderTopWidth: 1
     },
     preference: {
         flexDirection: 'row',
         justifyContent: 'space-between',
         paddingVertical: 12,
        paddingHorizontal: 16
     }
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