import axios from 'axios'
import { APIROOTURL } from '../../ApiRootURL/ApiRootUrl';


// Action Types
const FETCH_PROFILES_REQUEST = 'FETCH_PROFILES_REQUEST';
const FETCH_PROFILES_SUCCESS = 'FETCH_PROFILES_SUCCESS';
const FETCH_PROFILES_FAILURE = 'FETCH_PROFILES_FAILURE';

// Initial State
const initialState = {
    loading: true,
    profiles: [],
    errors: ""
}

// Actions

const fetchProfilesRequest = () => {
    return {
        type: FETCH_PROFILES_REQUEST
    }
}

const fetchProfilesSuccess = (profileData) => {
    return{
        type: FETCH_PROFILES_SUCCESS,
        payload: profileData
    }
}

const fetchProfilesFailure  = (errors) => {
    return {
        type: FETCH_PROFILES_FAILURE,
        payload: errors
    }
}

// Fetch functions
export  const fetchProfiles = (token) => {
    return dispatch => {
        dispatch(fetchProfilesRequest())
        axios.get(`${APIROOTURL}/api/profiles/`, {
        headers: {
            'Authorization': `Token ${token}`
        }  
        })  
        .then(resData => {
            const profilesData = resData.data.results;
            dispatch(fetchProfilesSuccess(profilesData))
        })
        .catch(error => {
            const errors = "OOPs, Something went very wrong"
            dispatch(fetchProfilesFailure(errors))
        }) 
    }    
} 



const profilesReducer = (state=initialState, action) => {
    switch(action.type){
        case FETCH_PROFILES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_PROFILES_SUCCESS:
            return {
                ...state,
                loading: false,
                profiles: action.payload,
                errors: ""
            }
        case FETCH_PROFILES_FAILURE:
            return {
                ...state,
                loading: false,
                profiles: [],
                errors: action.payload
            }
        default:
            return state;
    }
}

export default profilesReducer