// Root of the registration form for creating a new account
import React, {Component} from 'react';
import 'whatwg-fetch';
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

    render() {
        return (
            <div className="register">
                {this.state.error && <p>{this.state.error}</p>}
                <h2>Make an account</h2>
                <RegisterForm/>
            </div>
        );
    }
}

export default RegisterBox;