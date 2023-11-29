import { Avatar, Button, Fade, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import BarChartIcon from '@mui/icons-material/BarChart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RepeatIcon from '@mui/icons-material/Repeat';
import { FavoriteOutlined } from '@mui/icons-material';
import ReplyModal from './ReplyModal';
import {useDispatch} from 'react-redux';
import { createReTweet, likeTweet } from '../Store/Tweet/Action';
const TweetCard = ({tweet}) => {
   
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [openReplyModal, setOpenReplyModal] = useState(false);
    const handleOpenReplyModel = () => setOpenReplyModal(true);
    const handleCloseReplyModal = () => setOpenReplyModal(false);
    const dispatch = useDispatch();
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleDeleteTweet = () => {
        console.log("Delete Tweet");
        handleClose();
    }
    const handleUpdateTweet = () => {
        console.log("update tweet");
        handleClose();
    }
    // const handleOpenReplyModel = () => {
    //     console.log("replied");

    // }
    const handleCreateRetweet = () =>{
        console.log("retweet");
    }
    const handleLikeTweet = () => {
        dispatch(likeTweet(tweet.id))
        console.log('liked tweet');
    }
    const handleRetweet = () =>{
        dispatch(createReTweet(tweet.id))
        console.log('handled retweet');
    }
    return (
        <React.Fragment>
            <div className='flex space-x-5'>
                <Avatar
                    alt='username'
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Imran_Ahmed_Khan_Niazi_-_UNGA_%2848784380531%29_%28cropped%29.jpg/220px-Imran_Ahmed_Khan_Niazi_-_UNGA_%2848784380531%29_%28cropped%29.jpg'
                    className='cursor-pointer'
                    onClick={() => navigate(`/profile/${tweet?.user?.id}`)}
                />
                <div className='w-full'>
                    <div className='flex justify-between items-center'>
                        <div className='flex cursor-pointer items-center space-x-2'>
                            <span className='font-semibold'>{tweet?.user?.fullName}</span>
                            <span className='text-gray-700'>@{tweet?.user?.fullName.split(" ").join("_").toLowerCase()} . </span>
                            <img className='ml-2 h-5 w-5 '
                                src="https://img.freepik.com/premium-vector/verified-vector-icon-account-verification-verification-icon_564974-1246.jpg?w=2000" alt="" />
                        </div>


                        <div >
                        <Button
                            id="fade-button"
                            aria-controls={open ? 'fade-menu' : undefined}
                            aria-haspopup="true"
                            aria-expa
                            nded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <MoreHorizIcon />
                        </Button>
                        <Menu
                            id="fade-menu"
                            MenuListProps={{
                                'aria-labelledby': 'fade-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            TransitionComponent={Fade}
                        >
                            <MenuItem onClick={handleDeleteTweet}>Delete</MenuItem>
                            <MenuItem onClick={handleUpdateTweet}>Edit</MenuItem>
                            
                        </Menu>
                    </div>
                    </div>
                
                    <div className='mt-2'>
                        <div onClick={()=> navigate(`/tweet/${tweet?.id}`)} className='cursor-pointer'>
                            <p className='mb-2 p-0'>{tweet?.content}</p>
                            <img className='w-[28rem] border border-gray-400 p-5 rounded-md'
                             src={tweet?.image} alt="" />
                        </div>

                        <div className='py-5 flex flex-wrap justify-between items-center'>
                            <div className='flex space-x-3 items-center text-gray-600'>
                                <ChatBubbleOutlineIcon className='cursor-pointer' onClick={handleOpenReplyModel}/>
                                <p>{tweet?.totalReplies}</p>
                            </div>

                            <div className={`${tweet?.liked ? "text-pink-600" : "text-gray-600"} flex space-x-3 items-center`}>
                                {
                                    tweet?.liked ? <FavoriteIcon 
                                    className='cursor-pointer'
                                    onClick={handleLikeTweet}
                                    /> : <FavoriteOutlined 
                                    className='cursor-pointer'
                                    onClick={handleLikeTweet}
                                    />
                                }
                                <p>{tweet?.totalLikes}</p>
                            </div>
                            <div className={`${
                                tweet?.retweet ? 'text-pink-600' : 'text-gray-600'
                            } space-x-3 flex items-center`}>
                                <RepeatIcon
                                className='cursor-pointer'
                                onClick={handleRetweet}
                                />
                                <p>{tweet?.totalRetweets}</p>
                            </div>
                            <div className='flex space-x-3 items-center text-gray-600'>
                                <BarChartIcon className='cursor-pointer' onClick={handleOpenReplyModel}/>
                                <p>430</p>
                            </div>
                            <div className='flex space-x-3 items-center text-gray-600'>
                                <FileUploadIcon className='cursor-pointer' onClick={handleOpenReplyModel}/>
                                
                            </div>
                        </div>
                    </div>
                   
                </div>
            </div>
            <section>
                <ReplyModal tweet={tweet} open={openReplyModal} handleClose={handleCloseReplyModal}/>
            </section>
        </React.Fragment>
    )
}

export default TweetCard