import React from 'react';
import TasksList from '../../components/TasksList';

class HomePage extends React.Component {
	render() {
		return (
			<div>
				<TasksList />
			</div>
		);
	}
}

export default HomePage;