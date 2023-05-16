import copy from 'copy-to-clipboard';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import FindUser from '../../Utils/FindUser.jsx';
import axios from 'axios';
import styles from './styles.module.css';
import { toast } from 'react-toastify';

const MyProfile = ({ user, users }) => {
    const [profileUser, setProfileUser] = useState({});
    const [messages, setMessages] = useState([]);
    const tokenAPI = `tariq__${user}`;

    const getUser = () => {
        const decode = jwtDecode(user);
        setProfileUser(FindUser(users, decode.id));
    }

    const getMessages = async () => {
        const result = await axios.get('https://lazy-blue-sockeye-gear.cyclic.app/api/v1/message/messages', { headers: { token: tokenAPI } });
        if (result.data.message === 'success') {
            setMessages(result.data.messages);
        }
    }

    const deleteMessage = async (id) => {
        const result = await axios.delete(`https://lazy-blue-sockeye-gear.cyclic.app/api/v1/message/${id}`, { headers: { token: tokenAPI } });
        if (result.data.message === 'success') {
            toast.success('deleted successfully!');
        }
        getMessages();
    }

    console.log(messages);
    useEffect(() => {
        getUser();
        getMessages();
    }, []);

    const shareProfile = (e, url) => {
        e.preventDefault();
        copy(url);
    }

    return (
        <>
            <div className="container text-center py-5 my-5 text-center">
                <div className="card pt-5">
                    <a href data-toggle="modal" data-target="#profile">
                        <img src="/assets/images/avatar.png" className="avatar " alt />
                    </a>
                    <h3 className="py-2">{profileUser.userName}</h3>
                    <button data-toggle="modal" data-target="#share" className="btn btn-default-outline share " onClick={(e) => shareProfile(e, window.location)}><i className="fas fa-share-alt" />  Share Profile</button>
                </div>
            </div>

            <div className="container text-center my-5 text-center">
                {messages.length === 0 ? (
                    <div className="row" >
                        <div className="col-md-12">
                            <div className="card py-5">
                                <p>You don't have any messages... </p>
                            </div>
                        </div>
                    </div>
                ) : messages.map((message, index) => {
                    return <div className="row my-4 " key={index}>
                        <div className="col-md-12">
                            <div className="card py-5">
                                <p>{message.text} </p>
                                <div className={styles.deleteBtn} onClick={() => deleteMessage(message._id)}><i class="fa-solid fa-trash"></i></div>
                            </div>
                        </div>
                    </div>
                })}


            </div>


        </>
    )
}

export default MyProfile