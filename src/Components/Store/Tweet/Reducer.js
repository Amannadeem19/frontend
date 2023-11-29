import { FIND_BY_USER_FAILURE, FIND_BY_USER_REQUEST, GET_USER_PROFILE_FAILURE, GET_USER_PROFILE_REQUEST } from "../Auth/ActionType";
import { CREATE_TWEET_FAILURE, CREATE_TWEET_REQUEST, CREATE_TWEET_SUCCESS, DELETE_TWEET_FAILURE, DELETE_TWEET_REQUEST, DELETE_TWEET_SUCCESS, FIND_TWEET_BY_ID_FAILURE, FIND_TWEET_BY_ID_REQUEST, FIND_TWEET_BY_ID_SUCCESS, GET_ALL_TWEET_FAILURE, GET_ALL_TWEET_REQUEST, GET_ALL_TWEET_SUCCESS, GET_USER_TWEETS_FAILURE, GET_USER_TWEETS_REQUEST, GET_USER_TWEETS_SUCCESS, LIKE_TWEET_FAILURE, LIKE_TWEET_REQUEST, LIKE_TWEET_SUCCESS, REPLY_TWEET_FAILURE, REPLY_TWEET_REQUEST, REPLY_TWEET_SUCCESS, RETWEET_FAILURE, RETWEET_REQUEST, RETWEET_SUCCESS, USER_LIKE_TWEET_FAILURE, USER_LIKE_TWEET_REQUEST, USER_LIKE_TWEET_SUCCESS } from "./ActionType";

export const initialState={
    loading:false,
    data:null,
    error:null,
    tweets:[],
    likedTweets:[],
    tweet:null,
    like: null,
    retweet: null
}

export const tweetReducer = (state=initialState, action) => {
    switch (action.type) {
            case CREATE_TWEET_REQUEST:
            case DELETE_TWEET_REQUEST:
            case USER_LIKE_TWEET_REQUEST:
            case LIKE_TWEET_REQUEST:
            case RETWEET_REQUEST:
            case REPLY_TWEET_REQUEST:
            case FIND_BY_USER_REQUEST:
            case FIND_TWEET_BY_ID_REQUEST:
            case GET_USER_PROFILE_REQUEST:
            case GET_USER_TWEETS_REQUEST:
                return {...state, loading:true, error:null};

        
            case CREATE_TWEET_FAILURE:
            case DELETE_TWEET_FAILURE:
            case USER_LIKE_TWEET_FAILURE:
            case LIKE_TWEET_FAILURE:
            case RETWEET_FAILURE:
            case REPLY_TWEET_FAILURE:
            case FIND_BY_USER_FAILURE:
            case FIND_TWEET_BY_ID_FAILURE:
            case GET_ALL_TWEET_FAILURE:
            case GET_USER_PROFILE_FAILURE:
            case GET_USER_TWEETS_FAILURE:
                return {...state, loading:true, error: action.payload};

            case CREATE_TWEET_SUCCESS:
                return{
                    ...state,
                    loading:false,
                    error:null,
                    tweets:[action.payload, ...state.tweets]
                };
            case GET_ALL_TWEET_SUCCESS:
            case GET_USER_TWEETS_SUCCESS:
                return{
                    ...state,
                    loading:false,
                    error:null,
                    tweets:action.payload
                };
            
            case USER_LIKE_TWEET_SUCCESS:
                return{
                    ...state,
                    loading:false,
                    error:null,
                    likedTweets: action.payload
                }
            case LIKE_TWEET_SUCCESS:
                return{
                    ...state,
                    loading:false,
                    error:null,
                    like: action.payload
                    }
            case DELETE_TWEET_SUCCESS:
                return{
                            ...state,
                            loading:false,
                            error:null,
                            tweets: state.tweets.filter((tweet) => tweet.id !== action.payload)
                        }
            case RETWEET_SUCCESS:
                return{
                            ...state,
                            loading:false,
                            error:null,
                            retweet: action.payload
                        }
            case FIND_TWEET_BY_ID_SUCCESS:
            case REPLY_TWEET_SUCCESS:
                return{
                        ...state,
                        loading:false,
                        error:null,
                        tweet: action.payload
                    }
    
            default:
                return state;
    }
}