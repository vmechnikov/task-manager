import React from 'react';
import { Checkbox } from 'antd';

const CheckboxInput = ({ taskStatus }) => (
	<Checkbox checked={taskStatus} />
);

export default CheckboxInput;
