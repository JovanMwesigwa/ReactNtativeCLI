

const useVerifyNavigation = (navigation, item) => {

    const navigateToProfile = () => {
        if(authUserName === item.user) {
          navigation.navigate("Profile", { ID: item.id, })
        }else{
          navigation.navigate("CompanyProfile", { ID: item.id, }) 
        }
      }
    
    return navigateToProfile
}

export default useVerifyNavigation


