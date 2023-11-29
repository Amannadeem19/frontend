import axios from "axios"
import { API_BASE_URL, api } from "../../../Config/api"
import { GET_USER_PROFILE_FAILURE, GET_USER_PROFILE_SUCCESS, LOGIN_USER_SUCCESS, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE, LOGIN_USER_FAILURE, LOGOUT, FIND_BY_USER_SUCCESS, FIND_BY_USER_FAILURE, UPDATE_USER_PROFILE_SUCCESS, UPDATE_USER_PROFILE_FAILURE, FOLLOW_USER_SUCCESS, FOLLOW_USER_FAILURE } from "./ActionType";

export const LoginUser=(loginData) =>async (dispatch)=>{
    try {
        const {data} = await axios.post(`${API_BASE_URL}/auth/signin`, loginData);
        console.log('LoggedIn User Data', data);
        if(data.token){
            localStorage.setItem("jwt", data.token);
        }
        dispatch({type:LOGIN_USER_SUCCESS, payload:data.token});
    } catch (error) {
        console.log("error", error);
        dispatch({type:LOGIN_USER_FAILURE, payload:error.message});
    }
}

export const registerUser=(regData) =>async (dispatch)=>{
    try {
        const {data} = await axios.post(`${API_BASE_URL}/auth/signup`, regData);
       console.log('registered User Data', data);
        if(data.token){
            localStorage.setItem("jwt", data.token);
        }
        dispatch({type:REGISTER_USER_SUCCESS, payload:data.token});
    } catch (error) {
        console.log("error", error);
        dispatch({type:REGISTER_USER_FAILURE, payload:error.message});
    }
}


export const getUserProfile=(jwt) =>async (dispatch)=>{
    console.log(`Bearer ${jwt}`);
    try {
        const {data} = await axios.get(`${API_BASE_URL}/api/users/profile`,{
            headers:{
                "Authorization":`Bearer ${jwt}`
            }
        });
        console.log("user profile data", data);
        dispatch({type:GET_USER_PROFILE_SUCCESS, payload:data});
    } catch (error) {
        console.log("error", error);
        dispatch({type:GET_USER_PROFILE_FAILURE, payload:error.message});
    }
}

export const findUserById=(userId) =>async (dispatch)=>{
    try {
        const {data} = await api.get(`/api/users/${userId}`);
        console.log("user find by userId", data);
        dispatch({type:FIND_BY_USER_SUCCESS, payload:data});
    } catch (error) {
        console.log("error", error);
        dispatch({type:FIND_BY_USER_FAILURE, payload:error.message});
    }
}


export const updateUserProfile=(reqData) =>async (dispatch)=>{
    try {
        console.log("update user profile-jwt", localStorage.getItem("jwt"))
        
        const {data} = await api.put(`/api/users/update`, reqData);
        console.log("updated Data", data);
        dispatch({type:UPDATE_USER_PROFILE_SUCCESS, payload:data});
    } catch (error) {
        console.log("error", error);
        dispatch({type:UPDATE_USER_PROFILE_FAILURE, payload:error.message});
    }
}


export const followUserAction=(userId) =>async (dispatch)=>{
    try {
        const {data} = await api.put(`/api/users/${userId}/follow`);
        console.log("followed user", data);
        dispatch({type:FOLLOW_USER_SUCCESS, payload:data});
    } catch (error) {
        console.log("error", error);
        dispatch({type:FOLLOW_USER_FAILURE, payload:error.message});
    }
}

export const logout=() =>async (dispatch)=>{
    localStorage.removeItem("jwt");    
    dispatch({type:LOGOUT, payload:null});
    
}