import React, { useState } from 'react';
import axios from 'axios';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // 서버로 로그인 요청을 보냅니다.
      const response = await axios.post('/auth/signin', { email, password });
      // 로그인이 성공하면 처리할 내용을 여기에 추가합니다.
      console.log('로그인 성공:', response.data);
    } catch (err) {
      // 로그인이 실패하면 에러 메시지를 설정합니다.
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <div>
      <h2>SignIn</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">SignIn</button>
      </form>
    </div>
  );
}

export default Signin;
