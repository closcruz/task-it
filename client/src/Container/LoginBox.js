// Login site
import React, {Component} from 'react';
import axios from 'axios';
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

    txtChange = (e) => {
        const newState = {...this.state};
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    };

    handleLogin = (e) => {
        e.preventDefault();

        const {username, password} = this.state;
        axios.post('/api/login', {username, password})
            .then((result) => {
                localStorage.setItem('jwtToken', result.data.token);
                this.props.history.push('/yourtask')
            })
            .catch((error => {
                if (error.response.status === 401) {
                    this.setState({error: 'Login in failed. Username or password does not match'});
                }
            }));
    };

    render() {
        return (
            <div className="loginForm">
                {this.state.error && <p>{this.state.error}</p>}
                <h2>Log In</h2>
                <LoginForm
                    username={this.state.username}
                    password={this.state.password}
                    txtChange={this.txtChange}
                    handleLogin={this.handleLogin}
                />
            </div>
        )
    }
}

export default LoginBox;
