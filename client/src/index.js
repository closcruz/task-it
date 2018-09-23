import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TaskFrame from './Components/TaskFrame';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<TaskFrame />, document.getElementById('root'));
registerServiceWorker();
