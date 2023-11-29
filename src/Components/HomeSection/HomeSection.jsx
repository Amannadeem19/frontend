import { Avatar, Button } from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import ImageIcon from '@mui/icons-material/Image';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import TweetCard from './TweetCard';
import { useDispatch, useSelector } from 'react-redux';
import { createTweet, getAllTweets } from '../Store/Tweet/Action';
import { uploadToCloudnary } from '../../Utils/uploadToCloudnary';

const validationSchema = Yup.object().shape({
    content: Yup.string().required("Tweet text is required")
})
const HomeSection = () => {
    const [uploadingImage, setUploadingImage] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const dispatch = useDispatch();
    const {tweet} = useSelector(store => store);
    console.log("tweets", tweet);

    const handleSubmit = (values, actions) => {
        dispatch(createTweet(values));
        actions.resetForm();
        console.log("Tweet creation values", values);
        setSelectedImage("");
    }
    const formik = useFormik({
        initialValues: {
            content: "",
            image: ""
        },
        onSubmit: handleSubmit,
        validationSchema
    })
    const handleSelectImage = async (event) => {
        setUploadingImage(true);
        const imageUrl = await uploadToCloudnary(event.target.files[0]);
        formik.setFieldValue('image', imageUrl);
        setSelectedImage(imageUrl);
        setUploadingImage(false);

    }
    useEffect(()=>{
        dispatch(getAllTweets())
    },[tweet.like, tweet.retweet])
    return (
        <div className='space-y-5'>
            {/* home heading  */}
            <section>
                <h1 className='py-5 text-xl font-bold opacity-90'>Home</h1>
            </section>
            {/* tweet form  */}
            <section className={`pb-10`}>
                <div className='flex space-x-5'>
                    <Avatar
                        alt='username'
                        src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Imran_Ahmed_Khan_Niazi_-_UNGA_%2848784380531%29_%28cropped%29.jpg/220px-Imran_Ahmed_Khan_Niazi_-_UNGA_%2848784380531%29_%28cropped%29.jpg'
                    />
                    <div>
                        <form onSubmit={formik.handleSubmit}>
                            <div>
                                <input type="text" placeholder='What is happening? ' name='content'
                                    className={`border-none outline-none text-xl bg-transparent`}
                                    {...formik.getFieldProps('content')}
                                />
                                {formik.errors.content && formik.touched.content && (
                                    <span className='text-red-500'>{formik.errors.content}</span>
                                )}
                            </div>
                            {/* <div className='h-400 w-full mt-5'>
                            <img src={selectedImage} alt="" />
                        </div> */}
                            <div className='flex justify-between items-center mt-5'>
                                <div className='flex space-x-5 items-center'>
                                    <label className='flex  items-center space-x-2   rounded-md cursor-pointer'>

                                        <ImageIcon className='text-[#1d9bf0]' />
                                        <input type='file' name="image" className='hidden' onChange={handleSelectImage} />

                                    </label>

                                    <FmdGoodIcon className='text-[#1d9bf0]' />
                                    <TagFacesIcon className='text-[#1d9bf0]' />

                                </div>

                                <div>
                                    <Button variant='contained'
                                        sx={{
                                       
                                            width: "100%", borderRadius: "20px",
                                            paddingX: "20px",
                                            paddingY: "8px", bgcolor: "#1e88e5"
                                        }}
                                        type='submit'
                                    >
                                        Tweet
                                    </Button>
                                </div>
                            </div>

                        </form>
                        <div>
                            {selectedImage && <img src={selectedImage} alt="" /> }
                        </div>
                    </div>
                </div>
            </section>

            {/* tweet card component will be added in this section */}

            <section>
                { tweet.tweets.map((tweet)=><TweetCard tweet={tweet}/>)}
            </section>
        </div>
    )
}

export default HomeSection