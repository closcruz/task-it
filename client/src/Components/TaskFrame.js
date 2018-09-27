import React, { Component } from 'react';
import TaskBox from '../Container/TaskBox';
import logo from '../taskiticon.png';

class TaskFrame extends Component {
    render() {
        return (
            <div>
                <div className="frameNav">
                    <img src={logo}/>
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