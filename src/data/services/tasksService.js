import axios from 'axios';

export const getTasks = (pageNumber) => {
	return axios.get(`${process.env.REACT_APP_API_URL}/?developer=Name&page=${pageNumber}`)
		.then(res => res.data.message);
};
