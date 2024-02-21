// Signup.js

import React, { useState } from "react";
import axios from "axios";
import SignupForm from "./SignupForm";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const history = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/signup", {
        email,
        password,
        username,
      });
      // 회원가입이 성공한 경우에만 오류 메시지를 초기화
      console.log("회원가입 성공:", response.data);
      history.push('/');
    } catch (err) {
      setError(err.response.data.error || "회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <SignupForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      username={username}
      setUsername={setUsername}
      handleSignup={handleSignup}
      error={error}
    />
  );
}

export default Signup;
