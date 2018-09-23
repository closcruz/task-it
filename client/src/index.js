import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TaskBox from './Container/TaskBox';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<TaskBox />, document.getElementById('root'));
registerServiceWorker();
