import axios from 'axios';

const config = { headers: { 'Content-Type': 'multipart/form-data' } };

export const addNewTask = ({ username, email, text }) => {
	let fd = new FormData();
	fd.append('username', username);
	fd.append('email', email);
	fd.append('text', text);

	return axios.post(`${process.env.REACT_APP_API_URL}/create?developer=Name`, fd, config)
		.then(res => res.data.message);
};
