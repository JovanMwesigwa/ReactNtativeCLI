import React,{ useContext,  useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, StatusBar, RefreshControl } from 'react-native'
import { connect } from 'react-redux'



import {ApploadingComponent, ErrorView, CompanyCard, MainHeaderComponent, } from '../../components/';
import { UserInfoContext } from '../../context/userInfoContext/UserInfoContextProvider'
import useAuthUser from '../../hooks/useAuthUser';
import useFetchData from '../../hooks/useFetchData'
import { fetchProfiles } from '../../redux/profiles/profilesRedux';



const CompanyList = ({ authToken, fetchProfiles,nextUrl, profileData,profilesErrors, profilesLoading}) => {

    const { userInfo } = useContext(UserInfoContext);

    const token = authToken;

    const dataApi = useFetchData(token, `api/profiles/`)

    const moreDataApi = useFetchData(token, dataApi.data.next)

    const authUserName = useAuthUser(token)


useEffect(() => {
  fetchProfiles(token)
},[])

const getMoreProfiles = () => {
  moreDataApi.request()
}

const getProfiles = () => {
  // This function is called by the flatlist {data} and it appends loadmore profiles on the current post lists in the feed.  
  const allProfiles = [...profileData]
  return allProfiles;
}

console.log(nextUrl)

const name = userInfo.user;

  if(profilesLoading) return <ApploadingComponent />

  if (profilesErrors) return <ErrorView onPress={() => console.log("Reload list...")} error={profilesErrors} />

const refreshControl = <RefreshControl refreshing={profilesLoading} onRefresh={() => dataApi.request()} />
 return(
   <>
        <StatusBar backgroundColor='white' barStyle='dark-content' />
      <View style={styles.container}>
          <MainHeaderComponent />
          
          <View style={styles.infoHeader}>
            <Text style={styles.headerText}>ALL COMPANIES</Text>
          </View>

              <FlatList
                  data={getProfiles()}
                  showsVerticalScrollIndicator={false}
                  onEndReached={getMoreProfiles}
                  onEndReachedThreshold={1.5}
                  refreshControl={refreshControl}
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
    flex: 1,
  },
  errorStyles: { 
    padding: 10, 
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '80%',
    left: '5%',
    backgroundColor: 'black', 
    borderRadius: 5,
    elevation: 2,
},
infoHeader: { 
    backgroundColor: '#ddd', 
    padding: 5, 
    paddingBottom: 10, 
    paddingHorizontal: 20, 
    elevation: 1
},
headerText: { 
    fontSize: 15, 
    fontWeight: 'bold', 
    color: '#777' 
},
})

const mapStateToProps = state => {
  return{
    authToken: state.auth.token,
    profileData: state.profiles.profiles,
    profilesLoading: state.profiles.loading,
    profilesErrors: state.profiles.errors,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProfiles: token => dispatch(fetchProfiles(token))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CompanyList)