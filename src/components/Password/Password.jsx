import React, { useState } from 'react'
import Input from '../Input/Input';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Password = ({placeholder, register, errors, name='password', onChange=()=>{}, className=''}) => {

    const [viewPassword, setViewPassword] = useState(false);
    const toggleViewPassword = () => {
        setViewPassword(!viewPassword)
    };

    return (
        <div className='relative'>
            <Input type={viewPassword ? 'text' : 'password'} name={name} placeholder={placeholder} register={register} errors={errors} onChange={onChange} className={className}/>
            <div onClick={toggleViewPassword}>
                {viewPassword ? <FaEyeSlash className={`absolute top-[35%] right-4 text-2xl`} /> : <FaEye className={`absolute top-[35%] right-4 text-2xl`} />}
            </div>
        </div>
    )
}

export default Password
