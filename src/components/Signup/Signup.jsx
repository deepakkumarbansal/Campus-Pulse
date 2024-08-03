
import React, { useState } from 'react'
import { Container, Input, Logo, Password, SubmitBtn } from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form';
import { authService } from '../../appwrite/auth.Service';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice'
import { ID } from 'appwrite';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { storageService } from '../../appwrite/storage.Service';
import Phone from '../Phone/Phone';
const Signup = () => {
    const [error, setError] = useState('');
    const { handleSubmit, register, setValue, control, formState:{errors} } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSubmitPending, setIsSubmitPending] = useState(false);
    const [unique, setUnique] = useState('');

    const handleSignup = async (data) => {
        console.log(data);
        setError("");
        setIsSubmitPending(true);
        let uploadedAvatar;
        try {
            if (data.password != data.confirmPassword) {
                setError('Password and Confirm Password must be same.');
                setIsSubmitPending(false);
                return;
            }
            if(data.avatar){
                try {
                    const isAvatar = true
                    uploadedAvatar = await storageService.uploadFile(data.avatar[0],data.userId, isAvatar);
                    data.avatar = uploadedAvatar ? uploadedAvatar.$id : null;
                } catch (error) {
                    data.avatar = null
                }
            }
            const userData = await authService.signup(data)
            if (userData) {
                const currentUser = await authService.getCurrentUser();
                dispatch(login(currentUser));
                navigate('/');
            }
        } catch (error) {
            setError(error.message);
        }
        setIsSubmitPending(false);
    }

    return (
        <Container className='flex justify-center items-center  bg-gray-50'>
            <div className='border-4 w-2/3 w-max-[1266px] min-h-[80%] rounded-xl flex flex-col items-center bg-gray-200 pb-4'>
                <Logo className='mt-5' />
                <h2 className='text-4xl my-4'>Create a new Account</h2>
                <p className='mb-3'>Already have any account? <Link to={'/login'} className='text-blue-500'>Login</Link></p>
                <p id='error-message' className='text-red-600'>{error}</p>
                <form onSubmit={handleSubmit(handleSignup)} className='w-2/4  border h-full'>
                    <input type="file" {...register('avatar')}/>
                    <Input type='text' name='name' register={register} placeholder='Name' errors={errors}/>
                    <Input type='text' name={'userId'} register={register} placeholder={'User Id'} value={unique} errors={errors}/>
                    <div className='flex gap-2'>
                        <p>Get unique ID</p>
                        <input type="checkbox" onClick={() => setUnique(ID.unique())} />
                    </div>
                    <Input type='email' name='email' register={register} placeholder='Email' errors={errors}/>
                    <Phone control={control}/>
                    {/* <Input type='tel' name='phone' register={register} placeholder='Phone' /> */}
                    <Password register={register} placeholder='Password' errors={errors}/>
                    <Password register={register} name='confirmPassword' placeholder='Confirm password' errors={errors}/>
                    <SubmitBtn value="Signup" isSubmitPending={isSubmitPending}/>
                </form>
            </div>
        </Container>
    )
}

export default Signup
