import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { login, signUp } from "redux/modules/authSlice";
import userApi from "../axios/userApi";

function Login() {
  const isLogin = useSelector((state) => state.auth.isLogin);

  const [isUser, setIsUser] = useState(false);
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const dispatch = useDispatch();
  //    onClick 핸들러

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

  //회원가입.
  const SignUpBtnClickHandler = async () => {
    const newUser = {
      id: loginId,
      password,
      nickname,
    };
    try {
      const res = await userApi.post("/register", newUser);
      setIsUser(!isUser);
    } catch (e) {
      const signUpRes = e.response.data.message;

      alert(signUpRes);
    }
    // dispatch(signUp());
    // return setIsUser(!isUser);
  };
  //  로그인 정보
  const onLoginBtnClickHandler = async () => {
    const newLogin = {
      id: loginId,
      password,
    };

    try {
      const res = await userApi.post("/login", newLogin);
      const resData = res.data;
      dispatch(login(resData));
    } catch (e) {
      const { data } = e.response;
      alert(data.message);
    }
  };

  return (
    <Container>
      <ToggleBox>
        <h1>{isUser ? "회원가입" : "로그인"}</h1>
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
        {isUser ? (
          <input
            maxLength={10}
            required
            placeholder="닉네임(1~10글자)"
            value={nickname}
            onChange={nicknameInputHandler}
          />
        ) : (
          <></>
        )}
        {isUser ? (
          <button type="button" onClick={SignUpBtnClickHandler}>
            회원가입
          </button>
        ) : (
          <button type="button" onClick={onLoginBtnClickHandler}>
            로그인
          </button>
        )}
        <button type="button" onClick={isUserClickBtnHandler}>
          {isUser ? "로그인" : "회원가입"}
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
