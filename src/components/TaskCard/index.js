import React from 'react';
import { connect } from 'react-redux';
import './styles.scss';
import CheckboxInput from '../CheckboxInput';
import { fetchTasks, updateTaskText } from '../../data/actions';

class TaskCard extends React.Component {

	state = {
		editTask: false,
		newTaskText: null,
	};

	onChangeTaskText = e => {
		this.setState({ newTaskText: e.target.value });
	};

	htmlDecode = input => {
		let e = document.createElement('textarea');
		e.innerHTML = input;

		return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
	};

	render() {
		const { task, userToken, updateTaskText, updateTasksList } = this.props;
		const { editTask, newTaskText } = this.state;

		return (
			<li className="task-card">
				<div className="task-card__content">
					{editTask
					? <input
							className="new-task-text"
							type="text"
							autoFocus
							defaultValue={this.htmlDecode(task.text)}
							onChange={e => this.onChangeTaskText(e)}
						/>
						: <span className="task-card__text">
								{this.htmlDecode(task.text)}
							</span>
					}
					<span className="task-card_status">
					{
						userToken
							? <button
								className="btn btn--edit"
								onClick={() => {
									this.setState({ editTask: !editTask });
									if (editTask === true) {
										updateTaskText({ id: task.id, newText: newTaskText })
											.then(res => {
												if (res.data.status === 'ok') {
													localStorage.setItem(`adminMark-${task.id}`, 'true');

													updateTasksList(
														localStorage.getItem('currentPage'),
														localStorage.getItem('sortField'),
														localStorage.getItem('sortDirection')
													);
												}
											});
									}
								}}
							>
								Edit
							</button>
							: null
					}
						<CheckboxInput
							task={task}
							taskStatus={task.status}
						/>
					</span>
				</div>

				{localStorage.getItem(`adminMark-${task.id}`)
					? <span className="admin-mark">Edited by admin</span>
					: null
				}

				<div className="task-card__user-info">
					<span className="user-info__username">
						{this.htmlDecode(task.username)}
					</span>
						<span className="user-info__email">
						{this.htmlDecode(task.email)}
					</span>
				</div>
			</li>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		updateTaskText: updatedTask => dispatch(updateTaskText(updatedTask)),
		updateTasksList: (currentPage, sortField, sortDirection) =>
			dispatch(fetchTasks(currentPage, sortField, sortDirection)),
	}
};

export default connect(null, mapDispatchToProps)(TaskCard);
