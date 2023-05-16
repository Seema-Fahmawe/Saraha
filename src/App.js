import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar.jsx';
import Register from './Components/Register/Register.jsx';
import Home from './Components/Home/Home.jsx';
import Login from './Components/Login/Login.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';
import UserPage from './Components/UserPage/UserPage.jsx';
import UserProfile from './Components/UserProfile/UserProfile.jsx';
import Loader from './Components/Loader/Loader.jsx';
import MyProfile from './Components/MyProfile/MyProfile.jsx';
import cookie from 'react-cookies';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword.jsx';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResetPassword from './Components/ResetPassword/ResetPassword.jsx';
import PageNotFound from './Components/PageNotFound/PageNotFound.jsx';


function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(cookie.load("token"));

  const getUsers = async () => {
    const result = await axios.get('https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/getAllUsers');
    setUsers(result.data);
    setLoading(false);

  }

  useEffect(() => {
    getUsers();
  }, []);



  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {loading ? (<Loader />) :
        (
          <Routes>
            {user ? <>
              <Route path='/list' element={<UserPage users={users} />}></Route>
              <Route path='/user/:id' element={<UserProfile users={users} />}></Route>
              <Route path='/messages' element={<MyProfile user={user} users={users} />}></Route>
            </> :
              <>
                <Route path='/register' element={<Register />}></Route>
                <Route path='/login' element={<Login logUser={setUser} />}></Route>

                <Route path='/forgetPassword' element={<ForgetPassword />}></Route>
                <Route path='/resetPassword/:email' element={<ResetPassword />}></Route>
                <Route path='' element={<Home />}></Route>
              </>
            }
            <Route path='*' element={<PageNotFound />}></Route>

          </Routes>
        )}

    </>
  );
}

export default App;
