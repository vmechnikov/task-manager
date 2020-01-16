import React from 'react';
import TasksList from '../../components/TasksList';

class HomePage extends React.Component {
	render() {
		return (
			<div style={{ padding: '50px 0'}}>
				<TasksList />
			</div>
		);
	}
}

export default HomePage;
