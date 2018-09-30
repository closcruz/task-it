// Form component of registration page
import React from 'react';
import PropTypes from 'prop-types';


const RegisterForm = props => (
    <form onSubmit={props.handleReg}>
        <label>
            Email:
            <input
                type="text"
                name="email"
                placeholder="example@email.com"
                value={props.email}
                onChange={props.txtChange}
            />
        </label>
        <label>
            User:
            <input
                type="text"
                name="username"
                placeholder="Enter Username"
                value={props.username}
                onChange={props.txtChange}
            />
        </label>
        <label>
            Password:
            <input
                type="password"
                name="password"
                placeholder="Super Secret Password"
                value={props.password}
                onChange={props.txtChange}
            />
        </label>
        <button type="submit">Submit</button>
    </form>
);

RegisterForm.propTypes = {
    email: PropTypes.string,
    user: PropTypes.string,
    password: PropTypes.string,
    handleReg: PropTypes.func.isRequired,
    txtChange: PropTypes.func.isRequired,
};

RegisterForm.defaultProps = {
    email: '',
    user: '',
    password: '',
};

export default RegisterForm;
