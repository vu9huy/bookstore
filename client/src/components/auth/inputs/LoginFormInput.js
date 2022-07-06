import React, { useState } from 'react';
import './auth.scss';

const FormInput = ({ value, label, onChange, errorMessage, regex, type, ...inputProps }) => {

  const [notEmty, setNotEmty] = useState(false);
  const [isValidate, setIsValidate] = useState(false)
  const [isHide, setIsHide] = useState(true)
  const handleHideShowPassword = () => {
    setIsHide(!isHide)
  }


  function handleBlur(e) {
    if (e.target.value != '') {
      setNotEmty(false)
      if (!regex) {
        setIsValidate(true)
      } else {
        setIsValidate(false)
      }
    } else {
      setNotEmty(true)
    }
  }
  return (
    <div className='form-input form-group'>
      <label className="form-label">{label}</label>
      <input
        onBlur={(e) => { handleBlur(e) }}
        onChange={onChange}
        className="form-control"
        type={isHide ? type : 'text'}
        {...inputProps}
      >
      </input>
      {label === 'Password' ? <div onClick={() => handleHideShowPassword()} className='hide-show'>
        {!isHide ? <i class='bx bxs-show'></i> : <i class='bx bxs-hide' ></i>}
      </div> : false}
      {/* {notEmty && <span className='form-message'><span>{label}</span> can't be blank</span>} */}
    </div>
  )
}

export default FormInput;