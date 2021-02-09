import React, { useState, useEffect } from 'react';
import { API } from '../config';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import MaterialNavbar from '../componenets/MaterialNavbar';
import { toast } from 'react-toastify';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userLoggedIN, setUserLoggedIN] = useState('');
  const [logged, setLogged] = useState(false);

  Axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(`${API}/login`, {
      username: username,
      password: password,
    }).then((response) => {
      if (!response.data.auth) {
        setLogged(false);
        toast.error(response.data.message);
      } else {
        setLogged(true);
        localStorage.setItem('token', JSON.stringify(response.data));
      }
    });
  };

  const RedirectTo = () => {
    if (logged) {
      return <Redirect to="/preview" />;
    }
  };

  useEffect(() => {
    Axios.get(`${API}/login`).then((response) => {
      if (response.data.loggedIn === true) {
        setLogged(true);
      }
    });
  }, []);

  return (
    <>
      <MaterialNavbar />
      <div className="container mt-5 w-50 justify-content-center align-items-center">
        {RedirectTo()}
        <form>
          <div class="form-group">
            <label htmlFor="exampleInputEmail1">ชื่อผู้ใช้</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label htmlFor="exampleInputPassword1">รหัสผ่าน</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={(e) => handleSubmit(e)} class="btn btn-primary">
            เข้าสู่ระบบ
          </button>
          <h1>{userLoggedIN}</h1>
        </form>
      </div>
    </>
  );
};

export default Login;
