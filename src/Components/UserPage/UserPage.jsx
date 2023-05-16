import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Pagination from '../Pagination/Pagination.jsx';
import pagination from '../../Utils/pagination.jsx';

const UserPage = ({ users }) => {

    const [results, setResults] = useState(users);
    const [pageInfo, setPageInfo] = useState({
        pageNumber: 0,
        pageSize: 12
    });

    const changePageNumber = ((page) => {
        setPageInfo({ ...pageInfo, pageNumber: page })
    })

    const navigate = useNavigate();


    const searchUser = (e) => {
        const { value } = e.target;
        const arr = [];
        users.map((user) => {
            if (user.userName.toLowerCase().includes(value.toLowerCase())) {
                arr.push(user);
            }
        })

        setResults(arr);
        setPageInfo({...pageInfo,pageNumber:0});
    }

    return (
        <div className="container">
            <input type="search" className="form-control my-4" placeholder="Search for User" onChange={searchUser} />

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {pagination(results,pageInfo.pageNumber,pageInfo.pageSize).map((user, index) => {
                        return <tr key={user._id}>
                            <th scope="row">{1+index+(pageInfo.pageNumber * pageInfo.pageSize)}</th>
                            <td>{user.userName}</td>
                            <td><button className='bg-dark px-3 py-1 text-white' onClick={() => navigate(`/user/${user._id}`)}>Send Message  <i class="fa-regular fa-paper-plane"></i></button></td>
                        </tr>
                    })}
                </tbody>
            </table>
            <Pagination users={results} changePageNumber={changePageNumber} {...pageInfo}/>
        </div>

    )
}

export default UserPage