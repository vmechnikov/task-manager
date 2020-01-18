import React from 'react';
import { Checkbox } from 'antd';
import { connect } from 'react-redux';
import {fetchTasks, updateTaskStatus} from "../../data/actions";

class CheckboxInput extends React.Component {

	onChangeStatus = task => {
		const { changeTaskStatus, updateTasksList } = this.props;

		changeTaskStatus(task)
			.then(() => {
				updateTasksList(
					localStorage.getItem('currentPage'),
					localStorage.getItem('sortField'),
					localStorage.getItem('sortDirection')
				)
			});
	};

	render() {
		const { taskStatus, userToken, task } = this.props;

		return (
			<Checkbox
				style={{ padding: '10px 0' }}
				checked={taskStatus}
				disabled={!userToken}
				task={task}
				onClick={() => this.onChangeStatus(task)}
			/>
		);
	}
}

const mapStateToProps = ({ authReducer }) => {
	return {
		userToken: authReducer.userToken,
	}
};

const mapDispatchToProps = dispatch => {
	return {
		updateTasksList: (currentPage, sortField, sortDirection) =>
			dispatch(fetchTasks(currentPage, sortField, sortDirection)),
		changeTaskStatus: task => dispatch(updateTaskStatus(task))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckboxInput);
