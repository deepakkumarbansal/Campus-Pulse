import React, { useState } from 'react'
import Input from '../Input/Input'
import Password from '../Password/Password'
import SubmitBtn from '../SubmitBtn/SubmitBtn'

const PasswordModal = ({ fn, closeModal, setOldPassword, placeholder, isSubmitPending, register, errors }) => {
  const handleSubmit = () => {
    fn();
    setOldPassword('')
    closeModal();
  }
  return (
    <>
      <div className='fixed w-screen h-screen bg-gray-600 top-0 z-50 flex flex-col justify-center items-center' onClick={closeModal}></div>
      <div className='w-[360px] bg-gray-300 border-black border-2 p-4 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[60]'>
        <Password placeholder={placeholder} onChange={(e) => setOldPassword(e.target.value)} register={register} name='oldPassword' errors={errors} />
        <SubmitBtn isSubmitPending={isSubmitPending} value={'Update'} onClick={handleSubmit} type='button' />
      </div>
    </>
  )
}

export default PasswordModal
