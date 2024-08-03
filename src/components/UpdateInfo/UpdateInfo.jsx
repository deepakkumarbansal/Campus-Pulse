import React from 'react'
import { Input, Password, SubmitBtn } from '../index'
import Phone from '../Phone/Phone'



const UpdateInfo = ({ name, placeholder, register, errors, defaultValue='', isSubmitPending, fn, type = 'text', control }) => {
    return (
        <div className='flex gap-3 items-center'>
            <div className='w-[360px]'>
            {
                name === 'password' ? <Password placeholder='Change Password' register={register} errors={errors} /> :
                name === 'phone' ? <Phone control={control} defaultValue={defaultValue}/> :
                <Input type={type} name={name} placeholder={placeholder} register={register} errors={errors} value={defaultValue}/>
            }
            </div>
            <SubmitBtn value={'Update'} isSubmitPending={isSubmitPending} type='button' onClick={fn} className='w-[200px]'/>
        </div>
    )
}

export default UpdateInfo
