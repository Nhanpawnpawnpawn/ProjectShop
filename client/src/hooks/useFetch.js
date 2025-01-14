import axios from "axios";

const fetchGet = async (url, params = {}) => {
  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const fetchPost = async (url, data = {}, params = {}) => {
  try {
    const response = await axios.post(url, data, { params });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const fetchPut = async (url, data = {}, params = {}) => {
  try {
    const response = await axios.put(url, data, { params });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const fetchDelete = async (url, params = {}) => {
  try {
    const response = await axios.delete(url, { params });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const handleAxiosError = (error) => {
  if (error.response) {
    // Lỗi từ server (có response)
    throw new Error(
      `API trả về lỗi: ${error.response.status} - ${error.response.data}`
    );
  } else if (error.request) {
    // Lỗi do không nhận được response (network)
    throw new Error("Không thể kết nối đến server.");
  } else {
    // Lỗi khác
    throw new Error(`Đã xảy ra lỗi: ${error.message}`);
  }
};

module.exports = { fetchDelete, fetchPut, fetchPost, fetchGet };
