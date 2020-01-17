import React from 'react';
import './styles.scss';
import { connect } from "react-redux";
import { fetchTasks } from "../../data/actions";

class SortTasksList extends React.Component {

	state = {
		sortField: localStorage.getItem('sortField'),
		sortDirection: localStorage.getItem('sortDirection'),
	};

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
			localStorage.setItem('sortDirection', 'desc');
			this.setState({ sortDirection: 'desc' });
			localStorage.setItem('sortField', field);
			this.setState({ sortField: field });
		} else {
			if (localStorage.getItem('sortDirection') === 'asc') {
				localStorage.setItem('sortDirection', 'desc');
				this.setState({ sortDirection: 'desc' });
			} else {
				localStorage.setItem('sortDirection', 'asc');
				this.setState({ sortDirection: 'asc' });
			}
		}

		this.props.sortTasks(
			localStorage.getItem('currentPage'),
			localStorage.getItem('sortField'),
			localStorage.getItem('sortDirection')
		);
	};

	toggleArrow = sortFieldName => {
		const { sortField, sortDirection } = this.state;

			if (sortField === sortFieldName && sortDirection === 'desc') {
				return <span className="arrow">&#x2198;</span>;
			} else if (sortField === sortFieldName && sortDirection === 'asc') {
				return <span className="arrow">&#x2197;</span>
			} else {
				return null;
			}
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
						Id {this.toggleArrow('id')}
					</button>
					<button
						className="btn"
						onClick={() => this.handleChange('username')}
					>
						Username {this.toggleArrow('username')}
					</button>
					<button
						className="btn"
						onClick={() => this.handleChange('email')}
					>
						Email {this.toggleArrow('email')}
					</button>
					<button
						className="btn"
						onClick={() => this.handleChange('status')}
					>
						Status {this.toggleArrow('status')}
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