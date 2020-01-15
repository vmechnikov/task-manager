import React from 'react';
import { connect } from 'react-redux';
import { fetchTasks } from '../../data/actions';
import TaskCard from '../TaskCard';
import './styles.scss';
import TasksPagination from '../Pagination';
import AddTaskForm from '../AddTaskForm';
import SignInForm from '../SignInForm';
import {signOut} from '../../data/actions/authActions';

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
				{!this.props.userToken
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

const mapStateToProps = ({ tasksReducer, authReducer })  => {
	return {
		tasks: tasksReducer.tasks,
		totalTasksCount: tasksReducer.totalTasksCount,
		userToken: authReducer.userToken,
	}
};

const mapDispatchToProps = dispatch => {
	return {
		getTasks: pageNumber => dispatch(fetchTasks(pageNumber)),
		signOut: () => dispatch(signOut())
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);
