import React from 'react';
import './styles.scss';
import { connect } from "react-redux";
import { fetchTasks } from "../../data/actions";

class SortTasksList extends React.Component {
	componentDidMount() {
		if (!localStorage.getItem('sortField')) {
			localStorage.setItem('sortField', 'id');
		}

		if (!localStorage.getItem('sortDirection')) {
			localStorage.setItem('sortDirection', 'asc');
		}
	}

	handleChange = field => {
		if (localStorage.getItem('sortField') !== field) {
			localStorage.setItem('sortDirection', 'asc');
			localStorage.setItem('sortField', field);
		} else {
			localStorage.getItem('sortDirection') === 'asc'
				? localStorage.setItem('sortDirection', 'desc')
				: localStorage.setItem('sortDirection', 'asc');
		}

		this.props.sortTasks(
			localStorage.getItem('currentPage'),
			localStorage.getItem('sortField'),
			localStorage.getItem('sortDirection')
		);
	};

	render() {
		return (
			<div>
				<div className="sort-buttons">
					<button
						className="btn"
						onClick={() => {
							this.handleChange('id');
						}}
					>
						Id
					</button>
					<button
						className="btn"
						onClick={() => this.handleChange('username')}
					>
						Username
					</button>
					<button
						className="btn"
						onClick={() => this.handleChange('email')}
					>
						Email
					</button>
					<button
						className="btn"
						onClick={() => this.handleChange('status')}
					>
						Status
					</button>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		sortTasks: (currentPage, sortField, sortDirection) => dispatch(fetchTasks(currentPage, sortField, sortDirection))
	}
};

export default connect(null, mapDispatchToProps)(SortTasksList);