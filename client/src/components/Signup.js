import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // 서버로 회원가입 요청을 보냅니다.
      const response = await axios.post('/auth/signup', { email, password, username });
      // 회원가입이 성공하면 처리할 내용을 여기에 추가합니다.
      console.log('회원가입 성공:', response.data);
    } catch (err) {
      // 회원가입이 실패하면 에러 메시지를 설정합니다.
      setError('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div>
      <h2>SignUp</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSignup}>
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
        <div>
          <label htmlFor="username">username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <button type="submit">SignUp</button>
      </form>
    </div>
  );
}

export default Signup;
