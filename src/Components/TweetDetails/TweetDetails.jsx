import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import TweetCard from '../HomeSection/TweetCard';
import { Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { findTweetById } from '../Store/Tweet/Action';
const TweetDetails = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const {id} = useParams();
    const {tweet} = useSelector(store => store);

    const handleBack = () => {
        nav(-1);
    }
    useEffect(()=>{
        if(id){
            dispatch(findTweetById(id));
        }   
    }, [])
    return (
    <React.Fragment>
          <section className={` bg-white z-50 flex items-center sticky top-0 bg-opacity-95`}>
                <KeyboardBackspaceIcon className='cursor-pointer' onClick={handleBack} />

                <h1 className='py-5 text-xl font-bold opacity-90 ml-5'>
                    Tweet
                </h1>
            </section>
            <section>
                <TweetCard tweet={tweet.tweet}/>
                <Divider sx={{margin:'2rem 0rem'}}/>
            </section>
            <section>
            <h1 className='py-5 text-xl font-bold opacity-90 ml-5'>
                    Replies
                </h1>
                {tweet.tweet.replyTweets.map((tweet)=> <TweetCard tweet={tweet}/>)}
            </section>
    </React.Fragment>
  )
}

export default TweetDetails