import { FIND_BY_USER_REQUEST, FIND_BY_USER_SUCCESS, FOLLOW_USER_REQUEST, FOLLOW_USER_SUCCESS, GET_USER_PROFILE_FAILURE, GET_USER_PROFILE_REQUEST, GET_USER_PROFILE_SUCCESS, LOGIN_USER_FAILURE, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT, REGISTER_USER_FAILURE, REGISTER_USER_REQUEST, UPDATE_USER_PROFILE_SUCCESS } from "./ActionType";
// reducer helps to store the values in a state of store 
export const initialState = {
    user:null,
    loading:false,
    error:null,
    jwt:null,
    findUser: null,
    updateUser: false

};
export const authReducer = (state=initialState, action) => {
    switch(action.type) {
        case LOGIN_USER_REQUEST:
        case REGISTER_USER_REQUEST:
        case GET_USER_PROFILE_REQUEST:
        case FIND_BY_USER_REQUEST:
        case FOLLOW_USER_REQUEST:
            return {...state, loading: true, error:null}
            
        case LOGIN_USER_SUCCESS:
        case REGISTER_USER_REQUEST:
            return {...state, loading:false, error:null, jwt: action.payload}
        
        case GET_USER_PROFILE_SUCCESS:
            return {...state, loading:false, error:null, user:action.payload}
        case FIND_BY_USER_SUCCESS:
        case UPDATE_USER_PROFILE_SUCCESS:
            return {...state, loading:false, error:null, findUser:action.payload}
        case FOLLOW_USER_SUCCESS:
            return {...state, loading:false, error:null, findUser:action.payload}
        // case UPDATE_USER_PROFILE_SUCCESS:
        //     return {...state, loading:false, error:null, user:action.payload, updateUser: true}
                    
            case LOGOUT:
                return initialState;
        
        case LOGIN_USER_FAILURE:
        case REGISTER_USER_FAILURE:
        case GET_USER_PROFILE_FAILURE:
            return {...state, loading:false, error:action.payload}
        
        default:
            return state;
        
    }
}