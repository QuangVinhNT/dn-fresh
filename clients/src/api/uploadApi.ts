import axiosInstance from "./axiosInstance";

const postUploadFile = async (formData: FormData) => {
  const res = await axiosInstance.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return res.data
}

export {
  postUploadFile
}
