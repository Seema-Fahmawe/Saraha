import axios from 'axios';
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ForgetPassword = ({ users }) => {

    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const [cEmail, setConfirmEmail] = useState(false);

    const onChange = (e) => {
        const { value } = e.target;
        setEmail(value);
    }
    
    const onSubmit = async (e) => {
        e.preventDefault();
        
        {
            users.map((user) => {
                if (user.email != `${email}`) {
                    setConfirmEmail(false);
                    return ;
                } else {
                    setConfirmEmail(true);
                    console.log('welcome');
                    return ;
                }
            })
        }

        const result = await axios.patch('https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/forgetPassword', { email });
        if (email.length < 8) {
            toast.warning('Please enter valid email');
        }
        else{
            if (!cEmail) {
                toast.warning('Please enter valid email');
            } else {
                toast.success('Please check your email');
                navigate(`/resetPassword/${email}`);
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
                    <input className="form-control" placeholder="Enter your email" type="text" name="email" onChange={onChange} />
                    <button className="btn btn-default-outline my-4 w-100 rounded">Send Code</button>

                </form>
            </div>
        </div>
    )
}

export default ForgetPassword