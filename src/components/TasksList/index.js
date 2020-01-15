import React from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'antd';
import { fetchTasks } from '../../data/actions';
import TaskCard from '../TaskCard';
import './styles.scss';

class TasksList extends React.Component {

	state = {
		pageNumber: 1
	};

	componentDidMount() {
		this.props.getTasks(this.state.pageNumber);
	}

	onPageChange = pageNumber => {
		this.setState({ pageNumber });

		this.props.getTasks(pageNumber);
		console.log(this.state.pageNumber);
	};

	render() {
		const { tasks, totalTasksCount } = this.props;
		const { pageNumber } = this.state;

		return (
			<div className="tasks-wrapper">
				<h2>Tasks:</h2>
				<button className="btn btn--sign-in">Sign in</button>
				<button className="btn btn--add-new-task">Add new task</button>
				{tasks
				? <React.Fragment>
						<ul className="tasks-list">
							{tasks.map((task, index) => (
								<TaskCard
									task={task}
									key={index}
								/>
							))}
						</ul>
						<Pagination
							className="tasks-pagination"
							defaultCurrent={pageNumber}
							total={Number(totalTasksCount)}
							pageSize={3}
							onChange={e => this.onPageChange(e)}
						/>
					</React.Fragment>
				: null
				}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		tasks: state.tasksReducer.tasks,
		totalTasksCount: state.tasksReducer.totalTasksCount,
}
}

function mapDispatchToProps(dispatch) {
	return {
		getTasks: pageNumber => dispatch(fetchTasks(pageNumber))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);