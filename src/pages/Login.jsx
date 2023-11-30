import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { login } from "redux/modules/authSlice";

function Login() {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const [isUser, setIsUser] = useState(true);
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const dispatch = useDispatch();

  const idInputHandler = (e) => {
    setLoginId(e.target.value);
  };

  const passwordInputHandler = (e) => {
    setPassword(e.target.value);
  };

  const nicknameInputHandler = (e) => {
    setNickname(e.target.value);
  };

  const isUserClickBtnHandler = () => {
    return setIsUser(!isUser);
  };

  return (
    <Container>
      <ToggleBox
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h1>{isUser ? "로그인" : "회원가입"}</h1>
        {isUser ? (
          <>
            <input
              maxLength={10}
              minLength={4}
              required
              placeholder="아이디(4~10글자)"
              value={loginId}
              onChange={idInputHandler}
            />
            <input
              maxLength={15}
              minLength={4}
              required
              type="password"
              placeholder="비밀번호(4~15글자)"
              value={password}
              onChange={passwordInputHandler}
            />
          </>
        ) : (
          <>
            <input
              maxLength={10}
              minLength={4}
              required
              placeholder="아이디(4~10글자)"
              value={loginId}
              onChange={idInputHandler}
            />
            <input
              maxLength={15}
              minLength={4}
              required
              type="password"
              placeholder="비밀번호(4~15글자)"
              value={password}
              onChange={passwordInputHandler}
            />
            <input
              maxLength={10}
              required
              placeholder="닉네임(1~10글자)"
              value={nickname}
              onChange={nicknameInputHandler}
            />
          </>
        )}
        <button onClick={() => dispatch(login())}>
          {isUser ? "로그인" : "회원가입"}{" "}
        </button>
        <button onClick={isUserClickBtnHandler}>
          {isUser ? "회원가입" : "로그인"}
        </button>
      </ToggleBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: lightgray;
  height: 100vh;
`;

const ToggleBox = styled.form`
  height: 200px;
  width: 300px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 5px;
`;
export default Login;
