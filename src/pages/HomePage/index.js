import React from 'react';
import TasksList from '../../components/TasksList';
import User from '../../components/User';

class HomePage extends React.Component {
	render() {
		return (
			<div>
				<User />
				<TasksList />
			</div>
		);
	}
}

export default HomePage;
