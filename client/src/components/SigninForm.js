import React from 'react';

function SigninForm({ email, setEmail, password, setPassword, handleLogin, error }) {
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

export default SigninForm;
