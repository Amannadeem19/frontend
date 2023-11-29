import { Button, Grid, TextField } from '@mui/material'
import { blue } from '@mui/material/colors'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import React from 'react'
import * as Yup from 'yup'
import { LoginUser } from '../Store/Auth/Action'

const validationSchema=Yup.object().shape({
    email:Yup.string().email('Invalid Email').required('Email is required'),
    password:Yup.string().required('Password is required')
})

const SigninForm = () => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues:{
            email:"",
            password:""
        },
        validationSchema,
        onSubmit: (values) => {
            dispatch(LoginUser(values));
            console.log("values form", values);
        }
    })
    return (
   <form onSubmit={formik.handleSubmit}>
    <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                fullWidth
                label="Email"
                name='email' 
                variant='outlined'
                size='large'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                fullWidth
                label="Password"
                name='password' 
                type='password'
                variant='outlined'
                size='large'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                />
            </Grid>
            <Grid className='mt-20' item xs={12}>
                    <Button sx={{borderRadius:'29px', py:'15px', bgcolor: blue[500]}}
                    type='submit'
                    fullWidth variant='contained'
                    size='large'
                    >
                    Sign In</Button>
            </Grid>
    </Grid>
   </form>
  )
}

export default SigninForm