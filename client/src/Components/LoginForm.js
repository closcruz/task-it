// Form component for login page
import React from 'react';
import PropTypes from 'prop-types';


const LoginForm = props => (
    <form onSubmit={props.handleLogin}>
        <label>
            Username:
            <input
                type="text"
                name="username"
                placeholder="Your User"
                value={props.username}
                onChange={props.txtChange}
            />
        </label>
        <label>
            Password:
            <input
                type="password"
                name="password"
                placeholder="Your Password"
                onChange={props.txtChange}
            />
        </label>
        <button type="submit">Submit</button>
    </form>
);

LoginForm.propTypes = {
    username: PropTypes.string,
    handleLogin: PropTypes.func.isRequired,
    txtChange: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
    username: ''
};

export default LoginForm;