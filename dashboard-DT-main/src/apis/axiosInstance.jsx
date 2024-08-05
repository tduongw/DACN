import axios from 'axios';
// import { useAuth } from '../context/authContext';
const instance = axios.create({


    // Thêm cấu hình cho toàn bộ instance Axios, bao gồm maxContentLength
    maxContentLength: 200000000, // Thay đổi giới hạn kích thước nội dung theo nhu cầu của bạn
}
);

// Request interceptor
const {token} ='useAuth'

instance.interceptors.request.use(
  function (config) {

    // Thực hiện các thay đổi trước khi request được gửi
    // Ví dụ: Thêm header Authorization
  //  const token =useSelector((state)=>state.auth.token)
  config.headers = {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'multipart/form-data',
  };
    return config;
  },
  function (error) {
    // Xử lý lỗi khi request không thành công
    {
      console.log('chasn')
    }
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  function (response) {
    // Xử lý data trả về từ response
    return response;
  },
  function (error) {
    // Xử lý lỗi khi response không thành công
    return Promise.reject(error);
  }
);

export default instance;