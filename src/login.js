import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from './smartfix.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const signupsuccess = location.state?.signupsuccess;

  useEffect(() => {
    if (signupsuccess) {
      toast.success('User registered successfully!', { position: toast.POSITION.TOP_CENTER });
    }
  }, [signupsuccess]);

  const handleLogin = () => {
    if (!username || !password) {
      toast.error('Please fill in all the required fields.', { position: toast.POSITION.TOP_CENTER });
      return;
    }

    const userData = {
      username: username,
      password: password,
    };

    axios
      .post('http://localhost:3000/persons/login', userData)
      .then((response) => {
        const { success } = response.data;

        if (success) {
          toast.success('Login successful!', { position: toast.POSITION.TOP_CENTER });
          navigate('/home', { state: { loginSuccess: true } });
        } else {
          toast.error('Invalid username or password', { position: toast.POSITION.TOP_CENTER });
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error('invalid Username or Password', { position: toast.POSITION.TOP_CENTER });
      });
  };

  return (
    <div>
      <div>
        <div>
          <img src={logo} className='login-image' alt='Logo' />
          <div class="text-container">
            <h2>
              <p>SmartFix4.0</p>
              <p>Here is the smartest way to make your fixtures intelligent!</p>
            </h2>
            <p>
              SmartFix4.0 from Forms & Gears/ASM is the smartest way to transform your existing fixture/workholding into intelligent, IoT enabled, Industry 4.0 fixtures/workholdings. Talk to our experts and know how you can increase your productivity with lesser manpower.
            </p>
            <p>Call us now at +91 7823962010.</p>
          </div>
        </div>
      </div>

      <body>
        <div className='login'>
          <h1>User Login</h1>
          <div>
            <input type='text' name='username' placeholder='Username' onChange={(e) => setUsername(e.target.value.trim())} />
            <input type='password' name='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
            <button className='button-3' onClick={handleLogin}>Login</button>
          </div>
          <div>
            <Link className='text' to='/signup'><h5>Or sign Up Using</h5></Link>
          </div>
        </div>
      </body>
      <ToastContainer />
    </div>
  );
}

export default Login;
