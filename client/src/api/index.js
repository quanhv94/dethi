import axios from 'axios'
import config from './../config'

var axiosInstance = axios.create({
  baseURL: config.API_DOMAIN + '/api',
});

axiosInstance.interceptors.request.use(config => {
  const token = window.localStorage.getItem("token")
  if (token) {
    config.headers.authorization = token;
  }
  return config;
},
  error => Promise.reject(error)
)

export const loginFacebook = (accessToken) => axiosInstance.post(`/auth/facebook?access_token=${accessToken}`)
export const loginGoogle = (accessToken) => axiosInstance.post(`/auth/google?access_token=${accessToken}`)
export const fetchCurrentUser = () => axiosInstance.get('/me')
export const updateProfile = (data) => axiosInstance.post('/me', data)

export const fetchSubjectList = () => axiosInstance.get('/subjects')
export const generateExam = (subjectId = '') => axiosInstance.get(`/exams/generate?subject_id=${subjectId}`)
export const fetchExam = (examId = '') => axiosInstance.get(`/exams/${examId}`)
export const saveExam = (data) => axiosInstance.post(`/exams`, data)
export const fetchExamList = () => axiosInstance.get(`/exams`)
