import React, { Component } from 'react';
import TaskBox from '../Container/TaskBox';

class TaskFrame extends Component {
    render() {
        return (
            <div>
                <div className="frameNav">
                    <h2>TaskIT</h2>
                    <ul className="navbar">
                        <li>App</li>
                        <li>About</li>
                    </ul>
                </div>
                <div className="frameContent">
                    <TaskBox/>
                </div>
            </div>
        );
    }
}

export default TaskFrame;