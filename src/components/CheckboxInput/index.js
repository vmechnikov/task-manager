import React from 'react';
import { Checkbox } from 'antd';
import { connect } from 'react-redux';
import {fetchTasks, updateTaskStatus} from "../../data/actions";

class CheckboxInput extends React.Component {
	render() {
		const { taskStatus, userToken, task, changeTaskStatus, updateTasksList } = this.props;

		return (
			<Checkbox
				checked={taskStatus}
				disabled={!userToken}
				task={task}
				onClick={() => {
					changeTaskStatus(task);
					updateTasksList(localStorage.getItem('currentPage'));
				}}
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
		updateTasksList: currentPage => dispatch(fetchTasks(currentPage)),
		changeTaskStatus: task => dispatch(updateTaskStatus(task))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckboxInput);
