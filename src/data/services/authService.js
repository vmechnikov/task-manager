import axios from 'axios';

const config = { headers: { 'Content-Type': 'multipart/form-data' } };

export const login = ({ username, password }) => {
  let fd = new FormData();
  fd.append('username', username);
  fd.append('password', password);

  return axios.post(`${process.env.REACT_APP_API_URL}/login?developer=Name`, fd, config)
    .then(res => res.data.message);
};
