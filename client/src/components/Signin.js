import React, { useState } from 'react';
import axios from 'axios';
import SigninForm from './SigninForm';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useNavigate(); // useHistory 훅 사용

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/signin', { email, password });
      console.log('로그인 성공:', response.data);
      history.push('/');
    } catch (err) {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return <SigninForm email={email} setEmail={setEmail} password={password} setPassword={setPassword} handleLogin={handleLogin} error={error} />;
}

export default Signin;
