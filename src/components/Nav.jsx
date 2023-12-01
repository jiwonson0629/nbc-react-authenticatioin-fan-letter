import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "redux/modules/authSlice";

function Nav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div>
      <StNav>
        <StBtn onClick={() => navigate("/")}>Home</StBtn>
        <StBtn onClick={() => navigate("/profile")}>내 프로필</StBtn>
        <StBtn onClick={() => dispatch(logout())}>로그아웃</StBtn>
      </StNav>
    </div>
  );
}

const StNav = styled.div`
  height: 50px;
  background-color: gray;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const StBtn = styled.button`
  border: none;
  background-color: gray;
  margin: 20px;
`;

export default Nav;
