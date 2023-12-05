import axios from "axios";
// 로컬호스트 : 레터내역
const instance = axios.create({
  baseURL: process.env.REACT_APP_LETTERS_URL,
  timeout: 2000,
});
instance.interceptors.request.use(
  // 요청을 보내기 전 수행되는 함수
  function (config) {
    // 내부에 원하는 로직을 채운 후 리턴함
    // ex. 토큰, 헤더 넣기 등
    console.log("인터셉터 요청 성공!");
    return config;
  },

  // 오류 요청을 보내기 전 수행되는 함수
  function (error) {
    console.log("인터셉터 요청 오류!");
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  // 응답을 내보내기 전 수행되는 함수
  function (response) {
    console.log("인터셉트 응답 받았습니다!");
    return response;
  },

  // 오류응답을 내보내기 전 수행되는 함수
  function (error) {
    console.log("인터셉트 응답 오류발생!");
    return Promise.reject(error);
  }
);
export default instance;
