import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import cookie from 'react-cookies';
import { Link, useNavigate } from 'react-router-dom';
import CustomeInput from '../Common/CustomeInput.jsx';

const Login = ({ logUser }) => {
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState([]);
    const [statusError, setStatusError] = useState('');
    const [backError, setBackError] = useState('');
    const navigate = useNavigate();
    const onChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const validateUser = () => {
        const schema = Joi.object({
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).messages({
                    'string.empty': 'email is required'
                }),
            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().messages({
                    'string.empty': 'Password is required',
                    'string.pattern.base': 'password is incorrect',
                }),
        })
        return schema.validate(user, { abortEarly: false });
    }


    const onSubmit = async (e) => {
        e.preventDefault();
        const validation = validateUser();
        const errorList = [];
        if (validation.error) {
            validation.error.details.map((err) => {
                errorList.push(err.message);
                setErrors(errorList);
                setBackError('');
                setStatusError('');
            })
        } else {
            try {
                setErrors([]);
                const result = await axios.post('https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signin', user);
                console.log(result.data.message);
                if (result.data.message === "success") {
                    setBackError('');
                    setStatusError('');
                    const expires = new Date();
                    const futureDay = expires.getDate() + 1;
                    expires.setDate(futureDay);
                    cookie.save("token", result.data.token);
                    logUser(result.data.token);
                    navigate('/messages');

                } else if (result.data.message === 'invalid account') {
                    setBackError(result.data.message);
                    setStatusError('');
                }
                else {
                    result.data.err.map((err) => {
                        errorList.push(err[0].message);
                        setErrors(errorList);
                        setStatusError();
                        setBackError('');
                    })
                }
            } catch (err) {
                setStatusError(err.response.data.message);
                setErrors([]);
                setBackError('');
            }
        }
    }


    return (
        <div className="container text-center my-5">
            <div className="user my-3">
                <i className="fas fa-user-secret user-icon" />
                <h4 className="login">Login</h4>
            </div>
            <div className="card p-5 w-50 m-auto">
                <form method="POST" action="/handleLogin" onSubmit={onSubmit}>
                    {errors.map((error, index) => {
                        return <div className='alert alert-danger py-1 ' key={index}>{error}</div>
                    })}
                    {statusError ? <div className='text text-danger fw-bold text-start mb-2'>** {statusError}</div> : <></>}
                    {backError ? <div className='text text-danger fw-bold text-start mb-2'>** {backError}</div> : <></>}

                    <CustomeInput error={errors.email} text="Enter your email" type="text" name="email" onChange={onChange} />
                    <CustomeInput error={errors.email} text="Enter your password" type="text" name="password" onChange={onChange} />
                    <button className="btn btn-default-outline my-3 w-100 rounded">Login</button>
                    <p><Link className="text-muted forgot btn" to='/forgetPassword'>I Forgot My Password</Link></p>
                    <Link className="btn btn-default-outline" to='/register'>Register</Link>
                </form>
            </div>
        </div>

    )
}

export default Login