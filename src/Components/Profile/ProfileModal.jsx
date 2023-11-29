import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Avatar, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../Store/Auth/Action';
import { uploadToCloudnary } from '../../Utils/uploadToCloudnary';
import { useNavigate } from 'react-router-dom';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderRadius: 4
};

export default function ProfileModal({open , handleClose}) {
  // const [open, setOpen] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const dispatch = useDispatch();
  const {auth} = useSelector(store => store);
  const [selectedImage, setSelectedImage]= React.useState("");
  const navigate = useNavigate();
  
  const handleSubmit = (values, actions) => {
    dispatch(updateUserProfile(values));
    console.log("handle submit called", values);

    actions.resetForm();
    setSelectedImage("");
    handleClose();
    // setTimeout(()=>{
    //   window.location.reload(true);
    // }, 6000)
  }

  const formik = useFormik({
    initialValues: {
      id:auth?.findUser?.id ,
      fullName: auth?.findUser?.fullName,
      website: auth?.findUser?.website,
      bio: auth?.findUser?.bio,
      location: auth?.findUser?.location,
      backgroundImage: "",
      image: auth?.findUser?.image
    },
    onSubmit: handleSubmit,

  })
  const handleImageChange = async (event) => {
    setUploading(true);
    const { name } = event.target;
    const file = await uploadToCloudnary(event.target.files[0]);
    formik.setFieldValue(name, file);
    console.log(file);
    setSelectedImage(file);
      setUploading(false);
  }
  return (
    <div>
     
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-3'>
                <IconButton onClick={handleClose} aria-label='delete'>
                  <CloseIcon />
                </IconButton>
                <p className='text-sm'>Edit Profile</p>
              </div>
              <Button type='submit'>Save</Button>
            </div>
            <div className='hideScrollBar overflow-y-scroll overflow-x-hidden h-[80vh]'>
              <React.Fragment>
                <div>
                  <div className='w-full'>
                    <div className='relative'>
                      <img className='w-full h-[12rem] object-cover object-center'
                        src="https://cdn.pixabay.com/photo/2023/09/05/16/40/sunrise-8235464_640.jpg" alt="" />
                      <input type="file"
                        className='absolute top-0 left-0 w-full h-full cursor-pointer opacity-0'
                        // onChange={handleImageChange}
                        name='backgroundImage'
                      />
                    </div>
                  </div>
                </div>
                <div className='w-full transform -translate-y-20 ml-4 h-[6rem]'>
                  <div className='relative'>
                    <Avatar
                      sx={{ width: '10rem', height: '10rem', border: '4px solid white' }}
                      src={selectedImage|| auth?.user?.image } />
                    <input
                      className='absolute top-0 left-0 w-[10rem] h-full opacity-0 cursor-pointer'
                      onChange={handleImageChange}
                      name='image'
                      type="file" />
                  </div>
                </div>
              </React.Fragment>
              <div className='space-y-3'>
                <TextField
                  fullWidth
                  id='fullName'
                  name='fullName'
                  label='Full Name'
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                  helperText={formik.touched.fullName && formik.errors.fullName}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  id='bio'
                  name='bio'
                  label='Bio'
                  value={formik.values.bio}
                  onChange={formik.handleChange}
                  error={formik.touched.bio && Boolean(formik.errors.bio)}
                  helperText={formik.touched.bio && formik.errors.bio}
                />
                <TextField
                  fullWidth
                  id='website'
                  name='website'
                  label='website'
                  value={formik.values.website}
                  onChange={formik.handleChange}
                  error={formik.touched.website && Boolean(formik.errors.website)}
                  helperText={formik.touched.website && formik.errors.website}
                />
                <TextField
                  fullWidth
                  id='location'
                  name='location'
                  label='location'
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  error={formik.touched.location && Boolean(formik.errors.location)}
                  helperText={formik.touched.location && formik.errors.location}
                />

                <div className='my-3'>
                  <p className='text-lg'>Birth Date. Edit</p>
                  <p className='text-2xl'>October 12, 1960</p>
                </div>
                <p className='py-3 text-lg'>Edit Professional Profile</p>

              </div>
            </div>

          </form>
        </Box>
      </Modal>
    </div>
  );
}