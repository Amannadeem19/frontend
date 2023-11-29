import React, { useState } from 'react'
import { navigationMenu } from './NavigationMenu'
import { useNavigate } from 'react-router-dom'
import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Fade from '@mui/material/Fade'; 
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Store/Auth/Action';

const Navigation = () => {
  const {auth} = useSelector(store => store);
  const dispatch = useDispatch();
    
  const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleLogout = () => {
        handleClose();
        dispatch(logout());
    }

   
  return (
    <div className='h-screen sticky top-0'>
        <div>
            <div className='py-5'>
            <svg height='30px'width='30px' viewBox="0 0 24 24" aria-hidden="true" class="r-k200y r-18jsvk2 r-4qtqp9 r-yyyyoo r-5sfk15 r-dnmrzs r-kzbkwu r-bnwqim r-1plcrui r-lrvibr"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>
            </div>            

            <div className='space-y-6'>

                {
                    navigationMenu.map((item)=> 
                    <div className='cursor-pointer flex space-x-3 items-center' onClick={()=> {
                        item.title === 'Profile' ? navigate(`${item.path}/${auth?.user?.id}`)
                        : navigate(item.path);
                    }}>
                        {item.icon}
                          <p className='text-xl'>{item.title}</p> 
                    </div>
                    )
                }
            </div>

            <div className='py-7'>
                <Button variant='contained' sx={{width:'100%', borderRadius:'29px', py:'10px', bgcolor:'#1e88e5', color:'white'}}>
                    Tweet
                </Button>
            </div>
        </div>
        <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-3'>
                    <Avatar
                    alt='username'
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Imran_Ahmed_Khan_Niazi_-_UNGA_%2848784380531%29_%28cropped%29.jpg/220px-Imran_Ahmed_Khan_Niazi_-_UNGA_%2848784380531%29_%28cropped%29.jpg'
                    />
                    <div>
                        <p>{auth.user?.fullName}</p>
                        <span className='opacity-70'>@{auth.user?.fullName.split(" ").join("_").toLowerCase()}</span>
                    </div>
    <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreHorizIcon/>
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
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
     
      </Menu>
    </div>

    
    </div>
    </div>
  )
}

export default Navigation