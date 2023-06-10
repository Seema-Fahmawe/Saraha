import axios from 'axios';
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';
const ForgetPassword = ({ users }) => {

    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [cEmail, setConfirmEmail] = useState();
    const [errors, setErrors] = useState([]);
    const onChange = (e) => {
        const { value } = e.target;
        setEmail(value);
    }

    const validateUser = () => {
        const schema = Joi.object({
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).messages({
                    'string.empty': 'email is required'
                }),
        })
        return schema.validate({ email }, { abortEarly: false });
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
            {
                users.map((user) => {
                    if (user.email == `${email}`) {
                        setConfirmEmail(true);
                        return;
                    } else {
                        setConfirmEmail(false);
                        return;
                    }
                })
            }

            const result = await axios.patch('https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/forgetPassword', { email });
            if (email.length < 8) {
                toast.warning('Please enter valid email');
            }
            else {
                if (!cEmail) {
                    toast.warning('Please enter valid email');
                } else {
                    toast.success('Please check your email');
                    navigate(`/resetPassword/${email}`);
                }
            }
        }
    }


    return (
        <div className="container text-center my-5">
            <div className="user my-3">
                <i className="fas fa-user-secret user-icon" />
                <h4 className="login"> Forget Password</h4>
            </div>
            <div className="card p-5 w-50 m-auto">
                <form method="POST" action="/handleLogin" onSubmit={onSubmit} >
                    {errors.map((err, index) => {
                        return <div className='alert alert-danger' key={index}>{err}</div>
                    })}
                    <input className="form-control" placeholder="Enter your email" type="text" name="email" onChange={onChange} />
                    <button className="btn btn-default-outline my-4 w-100 rounded">Send Code</button>

                </form>
            </div>
        </div>
    )
}

export default ForgetPassword