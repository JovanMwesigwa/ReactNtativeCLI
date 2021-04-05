import axios from 'axios'

import { APIROOTURL } from '../ApiRootURL/ApiRootUrl'


const usePostData = (data, token, url) => {

    const postData = async() => {
          await axios.post(`${APIROOTURL}/${url}/`, data, {
            headers: {
                'Authorization': `Token ${token}`,
                data: data
              }
            })
            .then(res => {
                // console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
        
    }


    return postData
}

export default usePostData

