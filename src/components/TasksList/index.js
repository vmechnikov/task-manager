import React from 'react';
import { connect } from 'react-redux';
import { fetchTasks } from '../../data/actions';
import TaskCard from '../TaskCard';
import './styles.scss';

class TasksList extends React.Component {

	state = {
		pageNumber: 30
	};

	componentDidMount() {
		this.props.getTasks(this.state.pageNumber);
	}

	render() {
		const { tasks } = this.props;

		return (
			<div className="tasks-wrapper">
				<h2>Tasks:</h2>
				<button className="btn btn--sign-in">Sign in</button>
				<button className="btn btn--add-new-task">Add new task</button>
				{tasks
				? <ul className="tasks-list">
						{tasks.map((task, index) => (
							<TaskCard
								task={task}
								key={index}
							/>
						))}
					</ul>
				: null
				}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		tasks: state.tasksReducer.tasks
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getTasks: pageNumber => dispatch(fetchTasks(pageNumber))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);