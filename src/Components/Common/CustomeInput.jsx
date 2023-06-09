import React from 'react'

const CustomeInput = ({ text, type, name, onChange, error, sError }) => {
    return (
        <>
            <input className='form-control mt-4' placeholder={text} type={type} name={name} onChange={onChange} />
            {sError ? <div className='text text-danger text-start fw-bold text-capitalize'>** {sError}</div> : <></>}
            {error && (<div className='alert alert-danger'>{error}</div>)}
        </>
    )
}

export default CustomeInput