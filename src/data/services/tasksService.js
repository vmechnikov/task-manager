import axios from 'axios';

export const getTasks = (pageNumber, sortField, sortDirection) => {
	return axios.get(`${process.env.REACT_APP_API_URL}/?developer=Name&page=${pageNumber}&sort_field=${sortField}&sort_direction=${sortDirection}`)
		.then(res => res.data.message);
};

export const sortTasks = (pageNumber, sortField, sortDirection) => {
	return axios.get(`${process.env.REACT_APP_API_URL}/?developer=Name&page=${pageNumber}&sort_field=${sortField}&sort_direction=${sortDirection}`)
		.then(res => res.data.message);
};
