import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import userApi from "../axios/userApi";
import { useSelector } from "react-redux";

function Profile() {
  const auth = useSelector((state) => state.auth);
  const [uploadImg, setUploadImg] = useState(auth.avatar);
  const [previewImg, setPreviewImg] = useState(auth.avatar);
  const [isEditing, setIsEditing] = useState(true);
  const [userId, setUserId] = useState(auth.loginId);
  const userToken = localStorage.getItem("accessToken");

  const [editingNickname, setEditingNickname] = useState(auth.nickname);
  console.log("가져온 어스다", auth);
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await userApi.get("/user", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        });
        const userData = res.data;
        // 리랜더링
        console.log("가져온 유저정보다", res);
      } catch (e) {
        console.log(e.response.data);
      }
    };
    getUserInfo();
  }, []);
  // 유즈이펙트 감싸기

  // 가져와서 셋 해줬음
  //  새로운 값을 받아서 업로드를 해줘야 함
  // 현재 유저의 아바타와 닉네임이 저장된 곳 : JWT 인증서버, localStorage, json-server

  const ImageChangeHandler = (e) => {
    setUploadImg(e.target.files[0]);
    setPreviewImg(window.URL.createObjectURL(e.target.files[0]));
  };

  const editingNicknameHandler = (e) => {
    setEditingNickname(e.target.value);
  };

  console.log("제발 돼라 이미지", uploadImg);
  console.log("제발 돼라 닉네임", editingNickname);
  const userDataUpload = async () => {
    // avatar와 nickname 중 하나 또느 모두 변경 가능
    // 요청 시 Content-Type에 유의
    try {
      const formData = new FormData();
      formData.append("avatar", uploadImg);
      formData.append("nickname", editingNickname);
      const response = await userApi.patch(`/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userToken}`,
        },
      });
      // 데이터 불러오기, 상태변경
      console.log("response다", response);
    } catch (error) {
      console.log("에러다", error);
    }
  };
  return (
    <StContainer>
      <Stform>
        <Sth1> My Profile</Sth1>
        {isEditing ? (
          <StInnerForm
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <ImgBox>
              <StLabel htmlFor="profileImg" type="button">
                <StImg src={previewImg} alt="" accept="image/*" />
                <StImgInput
                  type="file"
                  id="profileImg"
                  accept="image/*"
                  onChange={ImageChangeHandler}
                />
              </StLabel>
            </ImgBox>
            <h2>{editingNickname}</h2>
            <h2>{userId}</h2>
            <StBtn type="button" onClick={() => setIsEditing(false)}>
              수정하기
            </StBtn>
          </StInnerForm>
        ) : (
          <StInnerForm
            onSubmit={(e) => {
              e.preventDefault();
              userDataUpload();
            }}
          >
            <ImgBox>
              <StLabel htmlFor="profileImg" type="button">
                <StImg src={previewImg} alt="" accept="image/*" />
                <StImgInput
                  type="file"
                  id="profileImg"
                  accept="image/*"
                  onChange={ImageChangeHandler}
                />
              </StLabel>
            </ImgBox>
            <StInput
              maxLength={10}
              placeholder="최대 10글자 가능"
              autoFocus
              // defaultValue={Nickname}
              value={editingNickname}
              onChange={editingNicknameHandler}
            />
            <h2>{userId}</h2>
            <BtnBox>
              <StBtn onClick={() => setIsEditing(true)}>취소</StBtn>
              <StBtn type="submit">수정완료</StBtn>
            </BtnBox>
          </StInnerForm>
        )}
      </Stform>
    </StContainer>
  );
}

const StContainer = styled.div`
  width: auto;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Stform = styled.div`
  width: 500px;
  height: 600px;
  background-color: lightgray;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
const StInnerForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
const ImgBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 100px;
  object-fit: cover;
`;
const StInput = styled.input`
  height: 30px;
  width: 200px;
  border-radius: 5px;
`;
const Sth1 = styled.h1`
  font-size: 35px;
`;
const BtnBox = styled.div`
  display: flex;
  gap: 10px;
`;
const StBtn = styled.button`
  width: 80px;
  height: 25px;
`;
const StImgInput = styled.input`
  display: none;
`;
const StLabel = styled.label`
  width: 150px;
  height: 150px;
  border-radius: 100px;
`;
export default Profile;
