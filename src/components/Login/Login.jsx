import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../appwrite/auth.Service";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { login } from "../../store/authSlice";
import LoadingBar from "react-top-loading-bar";
import {Input, Container, Logo, SubmitBtn, Password} from '../../components/index'
const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState:{errors} } = useForm();
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const [isSubmitPending, setIsSubmitPending] = useState(false);
    const loaderRef = useRef();

    const handleLogin = async (data) => {
        console.log(data);
        setIsSubmitPending(true);
        loaderRef.current.continuousStart();
        setError("");
        try {
            const userData = await authService.login(data);
            if (userData) {
                dispatch(login(userData));
                navigate('/');
            }
        } catch (error) {
            setError(error.message);
        }
        setIsSubmitPending(false);
        loaderRef.current.complete()
    }
    return (
        <Container className='flex justify-center items-center h-screen bg-gray-50'>
            <LoadingBar ref={loaderRef}/>
            <div className='border-4 w-2/3 w-max-[1266px] h-[80%] rounded-xl flex flex-col items-center bg-gray-200'>
                <Logo className='mt-5' />
                <h2 className='text-4xl my-4'>Login to Account</h2>
                <p className='mb-3'>Don't have any account? <Link to={'/signup'} className='text-blue-500'>Signup</Link></p>
                <p id='error-message' className='text-red-600 h-7'>{error}</p>
                <form onSubmit={handleSubmit(handleLogin)} className='w-2/4  border h-full'>
                    <Input type='email' name='email' register={register} placeholder='Email' errors={errors}/>
                    <Password register={register} placeholder='Password' errors={errors}/>
                    <SubmitBtn isSubmitPending={isSubmitPending} value="Login"/>
                </form>
            </div>
        </Container>
    )
}

export default Login
