import React, { useEffect, useState } from 'react'
import { Input, Password } from '../index'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { authService } from '../../appwrite/auth.Service';
import UpdateInfo from '../UpdateInfo/UpdateInfo';
import { storageService } from '../../appwrite/storage.Service';
import PasswordModal from '../PasswordModal/PasswordModal';
import { login } from '../../store/authSlice';


const Setting = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [openPasswordModal, setOpenPasswordModal] = useState(false);
    const [openPhoneModal, setOpenPhoneModal] = useState(false);
    const [openEmailModal, setOpenEmailModal] = useState(false);
    const currentUser = useSelector((state) => state.auth.userData);
    const dispatch = useDispatch();
    const { formState: { errors }, register, getValues, reset, control } = useForm({
        defaultValues: {
            email: currentUser?.email,
            name: currentUser?.name,
            phone: currentUser?.phone,
        }
    });
    useEffect(() => {
        reset({
            email: currentUser?.email,
            name: currentUser?.name,
            phone: currentUser?.phone,
        });
        console.log('updated');
    }, [currentUser])

    const [isNameUpdatePending, setIsNameUpdatePending] = useState(false)
    const [isEmailUpdatePending, setIsEmailUpdatePending] = useState(false)
    const [isPasswordUpdatePending, setIsPasswordUpdatePending] = useState(false)
    const [isPhoneUpdatePending, setIsPhoneUpdatePending] = useState(false)
    const [error, setError] = useState('');
    const updateName = async() => {
        setError('');
        try {
            setIsNameUpdatePending(true);
            await authService.updateName(getValues('name'));
        } catch (error) {
            setError(error)
        }
        finally{
            setIsNameUpdatePending(false)
        }
    }
    const updateEmail = async() => {
        setError('');
        try {
            setIsEmailUpdatePending(true);
            await authService.updateEmail(getValues('email'),oldPassword);
            console.log('success');
        } catch (error) {
            setError(error);
            console.log('fail');
        }
        finally{
            setIsEmailUpdatePending(false);
            reset({oldPassword: ''})
        }
    }
    const updatePassword = async() => {
        setError('');
        try {
            setIsPasswordUpdatePending(true);
            await authService.updatePassword(getValues('password'),oldPassword);
        } catch (error) {
            setError(error)
        }
        finally{
            setIsPasswordUpdatePending(false);
            setOldPassword('')
        }
    }
    const updatePhone = async() => {
        setError('');
        try {
            setIsPhoneUpdatePending(true);
            console.log(getValues('phone'));
            await authService.updatePhone(getValues('phone'),oldPassword);
        } catch (error) {
            setError(error)
        }
        finally{
            setIsPhoneUpdatePending(false);
            setOldPassword('')
        }
    }
    const updateAvatar = (e) => {
        console.log(currentUser);
        const userId = currentUser.$id;
        storageService
        .deleteFile(userId, true)
        .then(()=>{
            console.log('success');
        })
        .catch(()=>{console.log('failed');})
        .finally(async()=>{
            await storageService.uploadFile(e.target.files[0], userId, true);
            localStorage.clear();
            console.log('success');
        })
    }
    const closeEmailModal = () => setOpenEmailModal(false);
    const closePasswordModal = () => setOpenPasswordModal(false);
    const closePhoneModal = () => setOpenPhoneModal(false);

    return currentUser ? (
        <div>
            <div className='h-6'>
            {error && <p className='text-red-500'>{error.message}</p>}
            </div>
            <div className='flex flex-col items-center py-4 relative z-20'>
                <input type="file" id="uploadFile" className='z-[-1] absolute' hidden {...register('avatar')} onChange={updateAvatar}/>
                <img src={currentUser?.avatarUrl} alt="Profile image" onError={(e) => e.target.src = "/images/userAvatar.jpg"} height={'300px'} width={'300px'} className='border-2 rounded-full' />
                <label htmlFor='uploadFile' className='z-30 relative'>Edit</label>
            </div>
            <div className='px-4 flex items-center flex-col '>
                <UpdateInfo name={'name'} placeholder={'Edit Name'} register={register} errors={errors} defaultValue={getValues('name')} isSubmitPending={isNameUpdatePending} fn={updateName} />
                <UpdateInfo type='email' name={'email'} placeholder={'Edit Email'} register={register} errors={errors} defaultValue={getValues('email')} isSubmitPending={isEmailUpdatePending} fn={()=>setOpenEmailModal(true)} />
                {openEmailModal && <PasswordModal fn={updateEmail} closeModal={closeEmailModal} setOldPassword={setOldPassword} placeholder={'Password'} isSubmitPending={isEmailUpdatePending} register={register} errors={errors}/>}
                <UpdateInfo name={'phone'} placeholder={'Edit Phone'} register={register} errors={errors} defaultValue={getValues('phone')} isSubmitPending={isPhoneUpdatePending} fn={()=>setOpenPhoneModal(true)} control={control}/>
                {openPhoneModal && <PasswordModal fn={updatePhone} closeModal={closePhoneModal} setOldPassword={setOldPassword} placeholder={'Password'} isSubmitPending={isPhoneUpdatePending} register={register} errors={errors}/>}
                <UpdateInfo name={'password'} placeholder={'Edit Password'} register={register} errors={errors} isSubmitPending={isPasswordUpdatePending} fn={()=>setOpenPasswordModal(true)} />
                {openPasswordModal && <PasswordModal fn={updatePassword} closeModal={closePasswordModal} setOldPassword={setOldPassword} placeholder={'Old Password'} isSubmitPending={isPasswordUpdatePending} register={register} errors={errors}/>}
            </div>
        </div>
    ) : 'Login to Edit Profile'
}

export default Setting
