import { nanoid } from '@reduxjs/toolkit';
import React, { forwardRef, useEffect, useState } from 'react'

const Input = ({ type = "text", name, className = '', placeholder, onChange = () => { }, value = '', register, errors, ...props }) => {

  const [inputValue, setInputValue] = useState(value);
  useEffect(()=>{
    setInputValue(value)
  }, [value])
  const id = nanoid();
  const handleChange = (e) => {
    setInputValue(e.target.value);
    onChange(e)
  }
  return (
    <div className='my-4'>
      <div className='w-full h-14 relative'>
        <input type={type} {...register(name, { required: `${name} is required` })} {...props} onChange={handleChange} value={inputValue} className={`bg-gray-50 outline-none w-full h-14 text-xl py-2 px-3 border-green-600 border-2 rounded-lg absolute top-0 left-0 z-0 peer ${className}`} id={id} />
        <label htmlFor={id} className={`absolute cursor-text left-3 bg-gray-50 transition-all duration-400 ease-in-out ${inputValue ? 'top-[-8px] z-30 text-green-600 text-sm px-1' : 'top-[24%] z-10 text-gray-400 text-xl'} peer-focus:top-[-8px] peer-focus:z-30 peer-focus:text-green-600 peer-focus:text-sm px-1`}>{placeholder}</label>
      </div>
      {errors[name] && <p className='text-red-500'>{errors[name].message}</p>}
    </div>
  )
}

export default (Input)
