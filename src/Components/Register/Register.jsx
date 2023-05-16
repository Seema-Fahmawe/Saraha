import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import CustomeInput from '../Common/CustomeInput.jsx';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = ({logUser}) => {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
    cPassword: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    cPassword: ''
  });
  const navigate = useNavigate();

  const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    cPassword: Joi.string().valid(inputs.password).required()
  });

  const validateInput = (input, inputSchema) => {
    return inputSchema.validate(input);
  }


  const onChange = (e) => {
    const { name, value } = e.target;
    const validation = validateInput(value, registerSchema.extract(name));
    if (validation.error) {
      setErrors({ ...errors, [name]: validation.error.details[0].message });
    } else {
      const err = { ...errors };
      delete err[name];
      setErrors({ ...err });
    }
    setInputs({ ...inputs, [name]: value });
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      const result = await axios.post('https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signup', inputs);
      if (result.data.message === 'success') {
        toast.success('successfully registered! Please confirm the email');
      }
    }
  }

  return (
    <div className="container text-center my-5">
      <div className="user my-3">
        <i className="fas fa-user-secret user-icon" />
        <h4 className="login">Register</h4>
      </div>
      <div className="card p-5 w-50 m-auto">
        <form method="POST" action="/handleLogin" onSubmit={onSubmit}>
          <CustomeInput error={errors.name} text="Enter your name" type="text" name="name" onChange={onChange} />
          <CustomeInput error={errors.email} text="Enter your email" type="text" name="email" onChange={onChange} />
          <CustomeInput error={errors.password} text="Enter your password" type="text" name="password" onChange={onChange} />
          <CustomeInput error={errors.cPassword} text="Confirm your password" type="text" name="cPassword" onChange={onChange} />

          <button className="btn btn-default-outline my-4 w-100 rounded">Register</button>
        </form>
      </div>
    </div>

  )
}

export default Register