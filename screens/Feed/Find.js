import React, { useEffect} from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, StatusBar, RefreshControl, TouchableWithoutFeedback, Button } from 'react-native'
import { connect } from 'react-redux'
import { MaterialCommunityIcons} from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';




import {  ErrorView, GreyTopBar, TopAccountsComponent, ProductCard, MainHeaderComponent, StoriesComponent, SuggestedProfiles} from '../../components/';
import { fetchLoadMorePosts, fetchPosts, hotReloadPosts } from '../../redux/posts/postsRedux';
import { GlobalStyles } from '../../styles/GlobalStyles'
import { signOut } from '../../redux/auth/authRedux'
import SplashLoadingScreen from '../SplashLoadingScreen.js/SplashLoadingScreen';
import useFetchMorePosts from '../../hooks/useFetchMorePosts'
import useFetchTopProfilesApi from '../../hooks/useFetchTopProfilesApi'
import { fetchUserProfile } from '../../redux/userProfile/userProfileRedux';





const Find = ({ navigation, signOut, authToken, posts, fetchHotReload, postsLoading, postsErrors, fetchUserProfile, fetchPostsFunc, userProfile}) => {

  const [ count, setCount ] = React.useState(2)

  const token = authToken;

  const topProfiles = useFetchTopProfilesApi(token)

  const nextPosts = useFetchMorePosts(token)

  useEffect(() => {
    fetchPostsFunc(token); 
    fetchUserProfile(token);
},[])

  const getMorePosts = () => {
    setCount(count + 1)
    // This fuction is called by the loadmore button and makes an API call to the backend using the next page results.
    // fetchMorePostsFunc(token, page);
    nextPosts.loadMorePostsData(count)
    nextPosts.setMorePostsLoading(false);
  }

  const refreshPosts = () => {
    fetchHotReload(token);
  }


  const getProducts = () => {
    // This function is called by the flatlist {data} and it appends loadmore post on the current post lists in the feed.  
    const allProducts = [...posts,...nextPosts.morePosts]
    return allProducts;
  }

  const reloadPosts = () => {
    fetchHotReload(token)
  }

  if (postsLoading) return <SplashLoadingScreen />

  if (postsErrors) return <ErrorView onPress={reloadPosts} error={postsErrors} />

 
  const renderFooter = () => {
    return(
      <>
      {postsErrors ? null : 
        <Animatable.View style={{ flex: 1, justifyContent: 'center', elevation: 5, paddingHorizontal: 15, alignItems: 'center',  marginVertical: 15 }}
          animation='fadeInUp'
          delay={900}
          duration = {200}  
        >
          <TouchableOpacity style={styles.loadMoreBtn}
            onPress={getMorePosts}
          >
              <Text style={{ fontSize: 12, color: 'white', paddingHorizontal: 15}}>
                {
                  nextPosts.morePostsLoading ? <ActivityIndicator size='small' collapsable color='#fff' /> : "Load more posts"
                }
              </Text>
          </TouchableOpacity>
        </Animatable.View>
      }
      </>
    )
  }

  const { container } = styles
  const refreshControl = <RefreshControl 
        refreshing={postsLoading}
        onRefresh={refreshPosts}
      />
   
 return( 
   <View style={styles.mainContainer}>
      <StatusBar backgroundColor='#ddd' barStyle='dark-content' />
      <MainHeaderComponent main />

      { postsLoading ? 
      
      <View style={styles.activityIndicatorStyles}>
        <ActivityIndicator size='small' collapsable color={GlobalStyles.themeColor.color} />
      </View>  :

        <FlatList 
            ListHeaderComponent ={
              <>  

                <View style={container}>              
                    <GreyTopBar signOut={signOut} onPress={() => fetchPostsData(token)} />
                    <StoriesComponent data={topProfiles} token={token} userProfile={userProfile} />
                </View>
               
              </>
            }
            data={getProducts()}
            showsVerticalScrollIndicator={false}
            onEndReached={getMorePosts}
            refreshControl={refreshControl}
            ListFooterComponent={renderFooter}
            onEndReachedThreshold={1.8}
            renderItem={({ item, index }) => {
               
              return index === 4 ? 
          <View style={container}>    
              <SuggestedProfiles secondary data={topProfiles} token={token} userProfile={userProfile} />          
          </View> : (
              <>
                <ProductCard item={item} reloadPosts={reloadPosts} authUserID={userProfile.profile.id} />
                {
                  item.id % 9 > 6 &&
                  <View style={container}>  
                      <TopAccountsComponent  />
                  </View>
                }

              </>
            )}}
              keyExtractor={(item) => item.id.toString()}
          />
          
      }
        <TouchableWithoutFeedback  onPress={() => navigation.navigate('Post Product')}>
          <View style={styles.UploadBtn}>
            <MaterialCommunityIcons name="feather" size={25} color="#fff" />
          </View>
        </TouchableWithoutFeedback>
  </View>
  )

}
const styles = StyleSheet.create({
  activityIndicatorStyles: { 
  flex: 1, 
  justifyContent: 'center', 
  alignItems: 'center', 
},
  bookmark: {
    position: "absolute",
    color: "#fff",
    top: 5,
    right: 5,
    padding: 13,
    backgroundColor: GlobalStyles.themeColor.color,
    borderRadius: 56 / 2,
  },
  container: {
   flex: 1,
  },
  courselContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    backgroundColor: 'white',
    paddingTop: 25, 
  },
  errorStyles: { 
    padding: 10,
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', 
    borderRadius: 5,
    elevation: 2,
  },
  filterContainer: { 
    padding: 12, 
    backgroundColor: 'white', 
    height: 45, 
    borderRadius: 10, 
    width: 50,
    elevation: 5,
    marginHorizontal: 32 
  },

  loadMoreBtn: {
    flexDirection: 'row', 
    padding: 8, 
    backgroundColor: GlobalStyles.themeColor.color, 
    borderRadius: 15, 
    justifyContent: 'center',
    alignItems: 'center' ,
},
mainContainer: { flex: 1, backgroundColor: '#e6e5e5' },
topBtnContainer: {
    padding: 5, 
    backgroundColor: '#fff', 
    borderRadius: 8,
    width: 36,
    marginHorizontal: 5,
    marginVertical: 12 
},

headerTextContainer: {
  paddingHorizontal: 15,
  marginBottom: 10,
  paddingBottom: 24
},
headerText: {
  fontSize: 25,
  fontWeight: '700',
  letterSpacing: 0.1
},
input: {
  flex: 2,
  borderWidth: 1,
  borderColor: "#ddd",
  padding: 2,
  marginHorizontal: 15,
  backgroundColor: "#fff",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
},
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
},
  
logoStyles: { 
  width: 55, 
  height: 55, 
  resizeMode: 'contain',
  borderRadius: 10 
},
UploadBtn: {
  alignItems: 'center',
  backgroundColor: GlobalStyles.themeColor.color, 
  bottom: 20,
  borderRadius: 65/2, 
  elevation: 5,
  height: 65,
  position: 'absolute',
  justifyContent: 'center',
  right: 20,
  width: 65
},
})

const mapStateToProps = state => {
  return{
    authToken: state.auth.token,
    posts: state.posts.postsItems,
    postsLoading: state.posts.loading,
    postsErrors: state.posts.errors,
    userProfile: state.userProfile,
  }
}

const mapDispatchToProps = dispatch => {
  return{
    signOut: () => dispatch(signOut()),
    fetchPostsFunc: (token) => dispatch(fetchPosts(token)),
    fetchMorePostsFunc: (token, nextUrl) => dispatch(fetchLoadMorePosts(token, nextUrl)),
    fetchHotReload: (token) => dispatch(hotReloadPosts(token)),
    fetchUserProfile: token => dispatch(fetchUserProfile(token)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Find)