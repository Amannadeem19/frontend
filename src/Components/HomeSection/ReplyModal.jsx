import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ImageIcon from '@mui/icons-material/Image';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { createReplyTweet } from '../Store/Tweet/Action';
const style = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
  outline:"none",
  borderRadius:4
};

export default function ReplyModal({open, handleClose, tweet}) {
  const [uploadingImage, setUploadingImage] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState('');
    const disptach = useDispatch();
  

  
  const handleSelectImage = (event) => {
    setUploadingImage(true);
    const imageUrl = event.target.files[0];
    formik.setFieldValue('image', imageUrl);
    setSelectedImage(imageUrl);
    setUploadingImage(false);
}
const handleSubmit = (values, actions) => {
    disptach(createReplyTweet(values));
    handleClose();
  console.log('handle submit in reply modal', values);
    actions.resetForm();
}
  const formik = useFormik({
   initialValues : { content:"",
    image:"",
    tweetId:tweet?.id
  },
  onSubmit: handleSubmit

  })
  const navigate = useNavigate();

  return (
    <div>
    
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div className='flex space-x-5'>
                <Avatar
                    alt='username'
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Imran_Ahmed_Khan_Niazi_-_UNGA_%2848784380531%29_%28cropped%29.jpg/220px-Imran_Ahmed_Khan_Niazi_-_UNGA_%2848784380531%29_%28cropped%29.jpg'
                    className='cursor-pointer'
                    onClick={() => navigate(`/profile/${tweet?.user?.id}`)}
                />
                {/* tweet which you are commenting section  */}
                <div className='w-full'>
                    <div className='flex justify-between items-center'>
                        <div className='flex cursor-pointer items-center space-x-2'>
                            <span className='font-semibold'>{tweet?.user?.fullName}</span>
                            <span className='text-gray-700'>@{tweet?.user?.fullName.split(" ").join("_").toLowerCase()}. 2m</span>
                            <img className='ml-2 h-5 w-5 '
                                src="https://img.freepik.com/premium-vector/verified-vector-icon-account-verification-verification-icon_564974-1246.jpg?w=2000" alt="" />
                        </div>


                        
                    
                    </div>
                
                    <div className='mt-2'>
                        <div onClick={()=> navigate(`/tweet/${tweet?.id}`)} className='cursor-pointer'>
                            <p className='mb-2 p-0'>{tweet?.content}</p>
                        </div>

                       
                    </div>
                   
                </div>
                
            </div>
            {/* comment section */}
            <section className={`py-10`}>
                <div className='flex space-x-5'>
                    {/* user who do commenting  */}
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
                    </div>
                </div>
            </section>
        </Box>
      </Modal>
    </div>
  );
}