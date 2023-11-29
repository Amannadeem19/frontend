import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
const style = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: 'none',
  outline:'none',
  boxShadow: 24,
  p: 4,
  borderRadius:4
};

export default function SubscriptionModal({open, handleClose}) {

 const [plan, setPlan] = React.useState("annually")
 const features = [
    "Prioritize rankings in conversation and search",
    "Prioritize rankings in conversation and search",
    "Prioritize rankings in conversation and search",

 ]

  return (
    <div>
   
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <div className='flex items-center space-x-3'>
                <IconButton onClick={handleClose} aria-label='delete'>
                  <CloseIcon />
                </IconButton> 
            </div>
               <div className='flex justify-center py-10'>
                    <div className='w-[80%] space-y-10'>
                        <div className='p-5 rounded-md flex items-center justify-between bg-zinc-50  shadow-lg'>
                            <h1 className='text-xl pr-5 text-stone-950'>Blue Subscribers with verified Phone Number will get Blue checked mark once approved</h1>
                            <img className='h-24 w-24 ' src="https://img.freepik.com/premium-vector/verified-vector-icon-account-verification-verification-icon_564974-1246.jpg?w=2000" alt="" />
                        </div>
                        <div className='flex justify-between border rounded-full px-5 py-3 border border-gray-500'>
                            <div>
                                <span onClick={()=> setPlan("annually")} className={`${plan === "annually" ? "text-black" : "text-gray-500"} cursor-pointer`}>Annually</span>
                                <span className='text-green-500 text-sm ml-5'>Save - 12%</span>
                            </div>
                            <p onClick={()=> setPlan("monthly")} className={`${plan === "monthly" ? "text-black" : "text-gray-500"} cursor-pointer`}>
                                Monthly
                            </p>
                        </div>
                        <div className='space-y-3'>
                            {features.map((item) => 
                                 <div className='flex items-center space-x-5'>
                                 <FiberManualRecordIcon sx={{height:'7px', width:'7px'}}/>
                                 <p className='text-xs'>{item}</p>
                           </div>
                            ) }
                        </div>

                        <div className='cursor-pointer flex justify-center bg-gray-900 text-white rounded-full px-5 py-3'>
                            <span className='line-through italic'>$500/-</span>
                            <span className='px-5'>$1200/-</span>

                        </div>

                    </div>
               </div>
       
        </Box>
      </Modal>
    </div>
  );
}