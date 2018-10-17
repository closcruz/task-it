import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import TaskBox from '../Container/TaskBox';
import RegisterBox from '../Container/RegisterBox';
import LoginBox from '../Container/LoginBox';
// import logo from '../taskiticon.png';

class TaskFrame extends Component {
    render() {
        return (
            <Router>
                <div>
                    <div className="frameNav">
                        <h2>TaskIT</h2>
                        <ul className="navbar">
                            <li>
                                <Link to="/yourtask">App</Link>
                            </li>
                            <li>About</li>
                            <li>
                                <Link to="/login">Log In</Link>
                            </li>
                            <li>
                                <Link to="/signup">Register</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="frameContent">
                        <Route path="/yourtask" component={TaskBox}/>
                        <Route path="/login" component={LoginBox}/>
                        <Route path="/signup" component={RegisterBox}/>
                    </div>
                </div>
            </Router>
        );
    }
}

export default TaskFrame;