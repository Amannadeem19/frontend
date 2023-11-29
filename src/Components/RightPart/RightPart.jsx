import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { Button } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SubscriptionModal from '../SubscriptionModal/SubscriptionModal';
const RightPart = () => {
    const handleChangeTheme = () => {

    }
    const [openSubscriptionModal, setOpenSubscriptionModal] = useState(false);
    const handleOpenSubscriptionModal = () => setOpenSubscriptionModal(true);
    const handleCloseSubscriptionModal = () => setOpenSubscriptionModal(false);

  return (
    <div className='py-5 sticky top'>
        <div className='relative flex items-center'>
            <input type="text" className='py-3 rounded-full text-gray-500 w-full pl-12' />
            <div className='absolute top-0 left-0  pl-3 pt-3'>
                <SearchIcon className='text-gray-500'/>
            </div>
            <Brightness4Icon className='ml-4 cursor-pointer' onClick={handleChangeTheme}/>
        </div>
        <section className='my-5'>
            <h1 className='text-xl font-bold'>Get Verified</h1>
            <h1 className='font-bold my-2'>Subscribe to unlock new features</h1>
        <Button variant='contained' sx={{padding:'10px', paddingX:'20px', borderRadius:'25px'}} onClick={handleOpenSubscriptionModal}>
            Get Verified
        </Button>
        </section>

        <section className='mt-7 space-y-5'>
            <h1 className='font-bold text-xl py-1'>What's Happening?</h1>
            <div>
                <p className='text-sm'>World Cup 2023 - Live</p>
                <p className='font-bold'>Pak vs India</p>
            </div>
            <div className='flex justify-between w-full'>
                <div>
                <p className='text-sm'>Hollywood Movie</p>
                <p className='font-bold'>#TheMarvels</p>
                    
                </div>
                <MoreHorizIcon/>
            </div>
           
        </section>

        {/* on clicking get started add Subscription model          */}
        <section>
                <SubscriptionModal open={openSubscriptionModal} handleClose={handleCloseSubscriptionModal}/>
        </section>
    </div>
  )
}

export default RightPart