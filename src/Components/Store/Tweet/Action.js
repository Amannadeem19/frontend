import { api } from "../../../Config/api"
import { CREATE_TWEET_FAILURE, CREATE_TWEET_SUCCESS, DELETE_TWEET_FAILURE, DELETE_TWEET_SUCCESS, FIND_TWEET_BY_ID_FAILURE, FIND_TWEET_BY_ID_SUCCESS, GET_ALL_TWEET_FAILURE, GET_ALL_TWEET_REQUEST, GET_ALL_TWEET_SUCCESS, GET_USER_TWEETS_FAILURE, GET_USER_TWEETS_SUCCESS, LIKE_TWEET_FAILURE, LIKE_TWEET_SUCCESS, REPLY_TWEET_FAILURE, REPLY_TWEET_SUCCESS, RETWEET_FAILURE, RETWEET_SUCCESS, USER_LIKE_TWEET_FAILURE, USER_LIKE_TWEET_SUCCESS } from "./ActionType";

export const getAllTweets = () => async(dispatch) => {
    try {
    console.log("get all tweets jwt", localStorage.getItem("jwt"))
    console.log("get all tweets me api", api);
    const {data} = await api.get(`/api/tweets`);
    console.log("Get all tweets", data);

    dispatch({type: GET_ALL_TWEET_SUCCESS, payload: data}); 

    } catch (error) {
        console.log("error", error);
        dispatch({type: GET_ALL_TWEET_FAILURE, payload: error.message});
    }
    
}

export const getUserTweets = (userId) => async(dispatch) => {
    try {
    const {data} = await api.get(`/api/tweets/user/${userId}`);
    console.log("Get user tweets", data);
    dispatch({type: GET_USER_TWEETS_SUCCESS, payload: data}); 

    } catch (error) {
        console.log("error", error);
        dispatch({type: GET_USER_TWEETS_FAILURE, payload: error.message});
    }   
}
export const getUserLikedTweets = (userId) => async(dispatch) => {
    try {
    const {data} = await api.get(`/api/tweets/user/${userId}/likes`);
    console.log("Get user liked tweets", data);
    dispatch({type: USER_LIKE_TWEET_SUCCESS, payload: data}); 

    } catch (error) {
        console.log("error", error);
        dispatch({type: USER_LIKE_TWEET_FAILURE, payload: error.message});
    }   
}
export const findTweetById = (tweetId) => async(dispatch) => {
    try {
    const {data} = await api.get(`/api/tweets/${tweetId}`);
    console.log("Tweet by tweetId", data);
    dispatch({type: FIND_TWEET_BY_ID_SUCCESS, payload: data}); 

    } catch (error) {
        console.log("error", error);
        dispatch({type: FIND_TWEET_BY_ID_FAILURE, payload: error.message});
    }   
}
export const createTweet = (tweetData) => async(dispatch) => {
    try {
    const {data} = await api.post(`/api/tweets/create`, tweetData);
    console.log("Created Tweet", data);
    dispatch({type: CREATE_TWEET_SUCCESS, payload: data}); 

    } catch (error) {
        console.log("error", error);
        dispatch({type: CREATE_TWEET_FAILURE, payload: error.message});
    }   
}
export const createReplyTweet = (replyData) => async(dispatch) => {
    try {
    const {data} = await api.post(`/api/tweets/reply`, replyData);
    console.log("Created Reply Tweet", data);
    dispatch({type: REPLY_TWEET_SUCCESS, payload: data}); 
    
    } catch (error) {
        console.log("error", error);
        dispatch({type: REPLY_TWEET_FAILURE, payload: error.message});
    }   
}
export const createReTweet = (tweetId) => async(dispatch) => {
    try {
    const {data} = await api.put(`/api/tweets/${tweetId}/retweet`);
    console.log("ReTweet", data);
    dispatch({type: RETWEET_SUCCESS, payload: data}); 
    
    } catch (error) {
        console.log("error", error);
        dispatch({type: RETWEET_FAILURE, payload: error.message});
    }   
}

export const likeTweet = (tweetId) => async(dispatch) => {
    try {
    const {data} = await api.post(`/api/${tweetId}/likes`);
    console.log("liked tweet", data);
    dispatch({type: LIKE_TWEET_SUCCESS, payload: data}); 
    
    } catch (error) {
        console.log("error", error);
        dispatch({type: LIKE_TWEET_FAILURE, payload: error.message});
    }   
}

export const deleteTweet = (tweetId) => async(dispatch) => {
    try {
    const {data} = await api.post(`/api/tweets/${tweetId}`);
    console.log("deleted tweet", data);
    dispatch({type: DELETE_TWEET_SUCCESS, payload: tweetId}); 
    
    } catch (error) {
        console.log("error", error);
        dispatch({type: DELETE_TWEET_FAILURE, payload: error.message});
    }   
}