import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const [inputField, setInputField] = useState({
        code: '',
        newPassword: ''
    });
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const { email } = useParams();

    const onChange = (e) => {
        const { name, value } = e.target;
        setInputField({ ...inputField, [name]: value });
    }

    const validateUser = () => {
        const schema = Joi.object({
            code: Joi.string().required(),
            newPassword: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().messages({
                    'string.empty': 'Password is required',
                    'string.pattern.base': 'password is incorrect',
                }),

        })
        return schema.validate(inputField, { abortEarly: false });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const validation = validateUser();
        const errorList = [];
        if (validation.error) {
            validation.error.details.map((err) => {
                errorList.push(err.message);
                setErrors(errorList);
            })
        } else {
            const result = await axios.patch('https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/sendCode', { ...inputField, email })
            if (result.data.message === 'success') {
                toast.success('Changed Password Successfully!');
                navigate('/login');
            } else {
                toast.error('Please enter the right code');
            }
        }
    }

    return (
        <div className="container text-center my-5">
            <div className="user my-3">
                <i className="fas fa-user-secret user-icon" />
                <h4 className="login">Reset Password</h4>
            </div>
            <div className="card p-5 w-50 m-auto">
                <form method="POST" action="/handleLogin" onSubmit={onSubmit}>
                    {errors.map((err, index) => {
                        return <div className='alert alert-danger py-1' key={index}>{err}</div>
                    })}
                    <input className="form-control" placeholder=" Enter the Code" type="text" name="code" onChange={onChange} />
                    <input className="form-control my-4 " placeholder=" Enter the new Password" type="password" name="newPassword" onChange={onChange} />
                    <button className="btn btn-default-outline my-4 w-100 rounded">Reset Password</button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword