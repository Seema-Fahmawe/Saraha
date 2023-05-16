import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import cookie from 'react-cookies';

const Navbar = ({ user, setUser }) => {

    const navigate = useNavigate();
    const logout = () => {
        setUser(null);
        cookie.remove("token");
        navigate('/');
    }

    return (
        <nav className="navbar navbar-expand-lg bg-custom navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand" href="index.html"><img src="/assets/images/logo300.png" width={54} alt /> </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    Menu <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto">
                        {user ? <>
                            <li className="nav-item">
                                <Link className="nav-link " to='/list'>Users-List</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link " to='/messages'>Messages</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link " onClick={logout}>Logout</a>
                            </li></> : <>
                            <li className="nav-item">
                                <Link className="nav-link click " to='/register'>Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link " to='/login'>Login</Link>
                            </li></>
                        }



                    </ul>
                </div>
            </div>
        </nav>


    )
}

export default Navbar