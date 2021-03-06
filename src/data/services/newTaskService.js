import axios from 'axios';
import openNotificationWithIcon from "../helpers/Notification";

const config = { headers: { 'Content-Type': 'multipart/form-data' } };

export const addNewTask = ({ username, email, text }) => {
	let fd = new FormData();
	fd.append('username', username);
	fd.append('email', email);
	fd.append('text', text);

	return axios.post(`${process.env.REACT_APP_API_URL}/create?developer=Name`, fd, config)
		.then(res => res.data.message);
};

export const editTaskStatus = ({ id, status }) => {
	let fd = new FormData();
	fd.append('status', status === 0 ? 10 : 0);
	fd.append('token', localStorage.getItem('userToken'));

	return axios.post(
		`${process.env.REACT_APP_API_URL}/edit/${id}?developer=Name`,
		fd,
		config
	)
		.then(res => console.log(res));
};

export const editTaskText = ({ id, newText }) => {
	let fd = new FormData();
	fd.append('text', newText);
	fd.append('token', localStorage.getItem('userToken'));

	return axios.post(
		`${process.env.REACT_APP_API_URL}/edit/${id}?developer=Name`,
		fd,
		config
		)
		.then(res => {
			if (res.data.status === 'error') {
				openNotificationWithIcon('error', 'Login please and try again');
			}

			return res;
		});
};
