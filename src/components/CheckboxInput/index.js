import React from 'react';
import { Checkbox } from 'antd';
import { connect } from 'react-redux';

class CheckboxInput extends React.Component {
	render() {
		const { taskStatus, userToken } = this.props;

		return (
			<Checkbox checked={taskStatus} disabled={!userToken} />
		);
	}
}

const mapStateToProps = ({ authReducer }) => {
	return {
		userToken: authReducer.userToken,
	}
};

export default connect(mapStateToProps)(CheckboxInput);
