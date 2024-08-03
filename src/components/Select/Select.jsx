import React, { forwardRef } from 'react'

const Select = ({ options, ...rest }, ref) => {
  return (
    <select {...rest} ref={ref}>
      {
        options.map((option, i) => (
          <option value={option} key={i}>
            {option}
          </option>
        ))
      }
    </select>
  )
}

export default forwardRef(Select)
