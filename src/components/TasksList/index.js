import React from 'react';
import { connect } from 'react-redux';
import { fetchTasks } from '../../data/actions';
import TaskCard from '../TaskCard';
import './styles.scss';
import TasksPagination from '../Pagination';
import AddTaskForm from '../AddTaskForm';
import SignInForm from '../SignInForm';
import { signOut } from '../../data/actions/authActions';
import SortTasksList from '../SortTasksList';

class TasksList extends React.Component {

	state = {
		pageNumber: localStorage.getItem('currentPage') ? Number(localStorage.getItem('currentPage')) : 1,
	};

	componentDidMount() {
		this.props.getTasks(
			this.state.pageNumber,
			localStorage.getItem('sortField'),
			localStorage.getItem('sortDirection')
		);
	}

	onPageChange = pageNumber => {
		localStorage.setItem('currentPage', pageNumber);

		this.props.getTasks(
			pageNumber,
			localStorage.getItem('sortField'),
			localStorage.getItem('sortDirection')
		);
	};

	render() {
		const { tasks, totalTasksCount, userToken } = this.props;
		const { pageNumber } = this.state;

		return (
			<div className="tasks-wrapper">
				{!userToken
					? <SignInForm />
					: <button
						className="btn"
						onClick={this.props.signOut}
					>
						Sign Out
					</button>
				}
				<AddTaskForm />
				{tasks
					? <React.Fragment>
						<div className="sort-list">
							<h2 className="sort-list__headline">Sort by:</h2>
							<SortTasksList />
						</div>
						<ul className="tasks-list">
							{tasks.map((task, index) => (
								<TaskCard
									task={task}
									key={index}
									userToken={userToken}
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

const mapStateToProps = ({ tasksReducer, authReducer })  => {
	return {
		tasks: tasksReducer.tasks,
		totalTasksCount: tasksReducer.totalTasksCount,
		userToken: authReducer.userToken,
	}
};

const mapDispatchToProps = dispatch => {
	return {
		getTasks: (pageNumber, sortField, sortDirection) => dispatch(fetchTasks(pageNumber, sortField, sortDirection)),
		signOut: () => dispatch(signOut())
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);
