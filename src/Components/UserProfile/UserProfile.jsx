import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import FindUser from '../../Utils/FindUser.jsx';
import copy from 'copy-to-clipboard';
import { toast } from 'react-toastify';

const UserProfile = ({ users }) => {
    const { id } = useParams();
    const [inputField, setInputField] = useState('');
    const [user, setUser] = useState(FindUser(users, id));
    const [errors, setErrors] = useState([]);

    const onChange = (e) => {
        const { value } = e.target;
        setInputField(value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const apiUrl = `https://lazy-blue-sockeye-gear.cyclic.app/api/v1/message/${id}`;
        const result = await axios.post(apiUrl, { message: inputField });
        const errorList = [];
        if (result.data.message === 'success') {
            setErrors([]);
            toast.success('Sent Successfully !');
        } else {
            result.data.err[0].map((error) => {
                errorList.push(error.message);
                setErrors(errorList);
            })
        }
    }

    const shareProfile = (e, url) => {
        e.preventDefault();
        copy(url);

    }

    return (
        <div className="container text-center py-5 my-5 text-center">

            <div className="card py-5 mb-5">
                <a href data-toggle="modal" data-target="#profile">
                    <img src="/assets/images/avatar.png" className="avatar " alt />
                </a>
                <h3 className="py-2 text-capitalize">{user.userName}</h3>
                {errors.map((error) => {
                    return <div className='alert alert-danger m-auto py-2 mb-4'>{error}</div>
                })}

                <div className="container w-50 m-auto">
                    <form action method="post" onSubmit={onSubmit}>
                        <textarea className="form-control" name id cols={10} rows={9} placeholder="Write your message" defaultValue={inputField} onChange={onChange} />
                        <button className="btn btn-outline-info mt-3"><i className="far fa-paper-plane" /> Send</button>
                    </form>
                </div>
            </div>
            <button data-toggle="modal" data-target="#share" className="btn btn-default-outline share " onClick={(e) => shareProfile(e, window.location)}><i className="fas fa-share-alt" />  Share Profile</button>
        </div>

    )
}

export default UserProfile