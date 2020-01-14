import React from 'react';
import './styles.scss';

const TaskCard = ({ task }) => (
		<li className="task-card">
			<div className="task-card__content">
				<span className="task-card_text">
					{task.text}
				</span>
				<span className="task-card_status">
					{/*{task.status ? 'done' : '-'}*/}
					<input type="checkbox" defaultChecked={task.status}/>
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