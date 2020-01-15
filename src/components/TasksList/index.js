import React from 'react';
import { connect } from 'react-redux';
import { fetchTasks } from '../../data/actions';
import TaskCard from '../TaskCard';
import './styles.scss';
import TasksPagination from '../Pagination';
import CollectionsPage from "../AddTaskForm";

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
				<CollectionsPage />
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
						<TasksPagination
							pageNumber={pageNumber}
							totalTasksCount={Number(totalTasksCount)}
							onPageChange={e => this.onPageChange(e)}
						/>
					</React.Fragment>
				: null
				}
			</div>
		);
	}
}

const mapStateToProps = ({ tasksReducer })  => {
	return {
		tasks: tasksReducer.tasks,
		totalTasksCount: tasksReducer.totalTasksCount,
	}
};

const mapDispatchToProps = dispatch => {
	return {
		getTasks: pageNumber => dispatch(fetchTasks(pageNumber))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);
