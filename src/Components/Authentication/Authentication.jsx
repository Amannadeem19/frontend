import { Button, Grid } from '@mui/material'
import { GoogleLogin } from '@react-oauth/google'
import React, { useState } from 'react'
import AuthModal from './AuthModal';

export const Authentication = () => {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const handleOpenAuthModal = () => setOpenAuthModal(true);
  const handleCloseAuthModal = () => setOpenAuthModal(false);

  return (
    <div>
      <Grid className='overflow-y-hidden' container>
        <Grid className='hidden lg:block' item lg={7}>
          <img className='w-full h-screen' 
          src="https://m.media-amazon.com/images/M/MV5BZTZhYTg1ZDItNzFjNy00MzE0LTljMWEtMzlkNjlkMTllYWZkXkEyXkFqcGdeQXVyMTE0MzQwMjgz._V1_QL75_UX500_CR0,0,500,281_.jpg" 
          alt="" />
          <div className='absolute top-[20%] left-[19%]'>
                
          </div>
        </Grid>
        <Grid className='px-10' lg={5} xs={12}>
          <h1 className='mt-10 font-bold text-7xl'>Happening Now</h1>
          <h1 className='font-bold text-3xl py-16'>Join Twitter X Today</h1>
          <div className='w-[60%]'>
            <div className='w-[full]'>
              <GoogleLogin width={330}/>
              <p className='py-5 text-center'>OR</p>
              <Button onClick={handleOpenAuthModal} fullWidth variant='contained' size='large'
              sx={{
                borderRadius:'29px',
                py:'7px'
              }}
              >Create Account</Button>
            </div>
            <div className='mt-10'>
              <h1 className='font-bold text-xl mb-5'>Already Have An Account?</h1>
            <Button onClick={handleOpenAuthModal} fullWidth variant='outlined' size='large'
              sx={{
                borderRadius:'29px',
                py:'7px'
              }}
              >SIGNIN</Button>
            </div>
          </div>
        </Grid>
      </Grid>
      <AuthModal open={openAuthModal} handleClose={handleCloseAuthModal}/>
    </div>
  )
}
