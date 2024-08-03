import React from 'react'
import { Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';

const Phone = ({name="phone", control, defaultValue=''}) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field }) => (
                <PhoneInput
                    country={'in'}
                    value={defaultValue}
                    inputProps={{
                        required: true,
                    }}
                    onChange={(value) => { field.onChange('+' + value); }}
                    className='relative z-[49]'
                />
            )}
        />
    )
}

export default Phone
