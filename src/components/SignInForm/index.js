import React from 'react';
import { Modal, Form, Input } from 'antd';
import { connect } from 'react-redux';
import { signIn } from '../../data/actions/authActions';

const SignInForm = Form.create({ name: 'form_in_modal' })(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;

      return (
        <Modal
          visible={visible}
          title="Sign In"
          okText="Sign In"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Name">
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your name!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Password">
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your password!' }],
              })(<Input.Password />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);

class SignInFormPage extends React.Component {
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
      this.props.auth(values);
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn--add-new-task" onClick={this.showModal}>
          Sign In
        </button>
        <SignInForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ authReducer }) => {
  return {
    userToken: authReducer.userToken,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    auth: userData => dispatch(signIn(userData))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInFormPage);
