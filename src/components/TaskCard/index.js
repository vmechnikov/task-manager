import React from 'react';
import { connect } from 'react-redux';
import './styles.scss';
import CheckboxInput from '../CheckboxInput';
import { updateTaskText } from '../../data/actions';

class TaskCard extends React.Component {

	state = {
		editTask: false,
	};

	onChangeTaskText = (e, task) => {
		task.text = e.target.value;
	};

	htmlDecode = input => {
		let e = document.createElement('textarea');
		e.innerHTML = input;

		return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
	};

	render() {
		const { task, userToken, updateTaskText } = this.props;
		const { editTask } = this.state;

		return (
			<li className="task-card">
				<div className="task-card__content">
				{editTask
				? <input
						className="new-task-text"
						type="text"
						autoFocus
						defaultValue={this.htmlDecode(task.text)}
						onChange={(e) => {
								this.onChangeTaskText(e, task);
							}
						}
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
										updateTaskText(task)
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

				<div className="task-card__user-info">
				<span className="user-info__username">
					{task.username}
				</span>
					<span className="user-info__email">
					{task.email}
				</span>
				</div>
			</li>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		updateTaskText: task => dispatch(updateTaskText(task))
	}
};

export default connect(null, mapDispatchToProps)(TaskCard);
