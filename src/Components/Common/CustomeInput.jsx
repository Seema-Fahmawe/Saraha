import React from 'react'

const CustomeInput = ({ text, type, name, onChange ,error}) => {
    return (
        <>
        <input className='form-control mt-4' placeholder={text} type={type} name={name} onChange={onChange}/>
        {error && (<div className='alert alert-danger'>{error}</div>)}
        </>
    )
}

export default CustomeInput