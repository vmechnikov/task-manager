import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import 'antd/dist/antd.css';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Layout from './layout';
import rootReducer from './data/reducers';

const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;
const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk)),
);

ReactDOM.render(
	<Provider store={store}>
		<Layout />,
	</Provider>,
	document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
