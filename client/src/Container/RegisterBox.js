// Root of the registration form for creating a new account
import React, {Component} from 'react';
import axios from 'axios';
import RegisterForm from '../Components/RegisterForm';
import '../RegisterBox.css';


class RegisterBox extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
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

    handleReg = (e) => {
        e.preventDefault();

        const {email, username, password} = this.state;
        if (!email || !username || !password) return;
        axios.post('/auth/register', {email, username, password})
            .then((result) => {
                this.props.history.push("/login")
            });
    };

    render() {
        return (
            <div className="register">
                {this.state.error && <p>{this.state.error}</p>}
                <h2>Make an account</h2>
                <RegisterForm
                    email={this.state.email}
                    username={this.state.username}
                    password={this.state.password}
                    txtChange={this.txtChange}
                    handleReg={this.handleReg}
                />
            </div>
        );
    }
}

export default RegisterBox;