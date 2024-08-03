import React from 'react'

const SubmitBtn = ({ isSubmitPending, value, type = 'submit', onClick, className }) => {
    return (
        <div className='flex justify-center'>
            <button onClick={onClick} type={type} className={`w-full border h-[3.2rem] bg-gray-800 text-white font-semibold rounded-md text-2xl flex justify-center items-center ${className}`} disabled={isSubmitPending}>
                {
                    isSubmitPending ? <span className="inline-block animate-spin h-6 w-6 border-2 border-b-0 rounded-full"></span> : <span>{value}</span>
                }
            </button>
        </div>
    )
}

export default SubmitBtn
