import React from 'react';
import './styles.scss';
import CheckboxInput from '../CheckboxInput';

const TaskCard = ({ task, userToken }) => (
		<li className="task-card">
			<div className="task-card__content">
				<span className="task-card__text">
					{task.text}
				</span>
				<span className="task-card_status">
					{userToken ? <button className="btn">Edit</button> : null}
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

export default TaskCard;
