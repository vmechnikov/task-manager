import React from 'react';
import { connect } from 'react-redux';
import { fetchTasks } from '../../data/actions';

class TasksList extends React.Component {

	state = {
		pageNumber: 1
	};

	componentDidMount() {
		this.props.getTasks(this.state.pageNumber);
	}

	render() {
		const { tasks } = this.props;

		return (
			<div>
				{tasks
				? <ul>
						{tasks.map((task, index) => (
							<li key={index}>
								{task.id}. {task.text} - [{task.username}]
							</li>
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