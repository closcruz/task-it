// Login site
import React, {Component} from 'react';
import LoginForm from '../Components/LoginForm';


class LoginBox extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            error: null,
        };
    }

    render() {
        return (
            <div className="loginForm">
                {this.state.error && <p>{this.state.error}</p>}
                <h2>Log In</h2>
                <LoginForm/>
            </div>
        )
    }
}

export default LoginBox;
