import React, { useEffect, useState } from 'react';

import { Alert, Button, Card, Input } from 'components';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from 'redux/slices/login/loginApi';
import { apiResHandler } from 'utils/axiosBaseQuery';

const Login = () => {
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const [alertInfo, setAlertInfo] = useState({
    show: false,
    status: '',
    message: '',
  });
  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleInputOnChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    apiResHandler(
      login({ data: loginForm }),
      (res) => {
        localStorage.clear();
        localStorage.setItem('clientToken', res.token);
        navigate('/dashboard'); // Navigate to the home page on success
      },
      (error) => {
        // Handle error
        console.error('Login failed:', error);
        setAlertInfo({
          show: true,
          status: 'error',
          message: 'Login failed. Please try again.',
        });
      }
    );
  };

  return (
    <>
      <Card className="flex flex-col mx-auto bg-white w-full sm:w-96 rounded-md shadow-2xl p-0 border-4">
        <form
          className="flex flex-col gap-y-4 items-center justify-center p-6 h-2/3"
          onSubmit={handleLogin}
        >
          <Input
            name="email"
            label="Email"
            id="email"
            value={loginForm.email}
            onChange={handleInputOnChange}
          />
          <Input
            name="password"
            label="Password"
            id="password"
            type="password"
            value={loginForm.password}
            onChange={handleInputOnChange}
          />
          <Button
            text={'Login'}
            className="bg-primary p-3"
            textVariant="white"
            disabled={false}
            type="submit" // Change button type to submit to trigger form submission
          />
        </form>
        <Alert
          message={alertInfo.message}
          position=""
          status={alertInfo.status}
          showAlert={alertInfo.show}
          handleOnClose={() => setAlertInfo({ show: false })}
        />
      </Card>
    </>
  );
};

Login.propTypes = {};

export default Login;
