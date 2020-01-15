import React from 'react';
import { Pagination } from 'antd';
import './styles.scss';

const TasksPagination = ({ pageNumber, totalTasksCount, onPageChange }) => (
	<Pagination
		className="tasks-pagination"
		defaultCurrent={pageNumber}
		total={Number(totalTasksCount)}
		pageSize={3}
		onChange={e => onPageChange(e)}
	/>
);

export default TasksPagination;
