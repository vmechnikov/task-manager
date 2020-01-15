import React from 'react';
import { Modal, Form, Input } from 'antd';
import { connect } from 'react-redux';
import { fetchNewTask } from '../../data/actions';

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
	class extends React.Component {
		render() {
			const { visible, onCancel, onCreate, form } = this.props;
			const { getFieldDecorator } = form;

			return (
				<Modal
					visible={visible}
					title="Add a new task"
					okText="Add"
					onCancel={onCancel}
					onOk={onCreate}
				>
					<Form layout="vertical">
						<Form.Item label="Name">
							{getFieldDecorator('username', {
								rules: [{ required: true, message: 'Please input your name!' }],
							})(<Input />)}
						</Form.Item>
						<Form.Item label="E-mail">
							{getFieldDecorator('email', {
								rules: [
									{ type: 'email', message: 'The input is not valid E-mail!' },
									{ required: true, message: 'Please input your E-mail!' },
								],
							})(<Input />)}
						</Form.Item>
						<Form.Item label="Text">
							{getFieldDecorator('text', {
								rules: [{ required: true, message: 'Please input task text!' }],
							})(<Input type="textarea" />)}
						</Form.Item>
					</Form>
				</Modal>
			);
		}
	},
);

class CollectionsPage extends React.Component {
	state = {
		visible: false,
	};

	showModal = () => {
		this.setState({ visible: true });
	};

	handleCancel = () => {
		this.setState({ visible: false });
	};

	handleCreate = () => {
		const { form } = this.formRef.props;

		form.validateFields((err, values) => {
			if (err) {
				return;
			}

			console.log('Received values of form: ', values);
			form.resetFields();
			this.setState({ visible: false });
			this.props.addNewTask(values).then();
		});
	};

	saveFormRef = formRef => {
		this.formRef = formRef;
	};

	render() {
		return (
			<React.Fragment>
				<button className="btn btn--add-new-task" onClick={this.showModal}>
					Add new task
				</button>
				<CollectionCreateForm
					wrappedComponentRef={this.saveFormRef}
					visible={this.state.visible}
					onCancel={this.handleCancel}
					onCreate={this.handleCreate}
				/>
			</React.Fragment>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addNewTask: newTask => dispatch(fetchNewTask(newTask))
	}
};

export default connect(null, mapDispatchToProps)(CollectionsPage);