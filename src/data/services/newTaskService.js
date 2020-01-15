import axios from 'axios';

export const addNewTask = newTask => {
	return axios.post(`${process.env.REACT_APP_API_URL}/create?developer=Name`, newTask, {
		headers: { 'content-type': 'multipart/form-data' }
	})
		.then(res => console.log(res));
};
