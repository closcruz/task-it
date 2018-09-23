// These tasks will help render the item list and items that the users wishes to track
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';


// For initial testing Task will be a component
const Task = props => (
    <div className="singleTask">
        <h4>{props.name}</h4>
        Tasks: {props.numTasks}
    </div>
);

Task.propTypes = {
    name: PropTypes.string.isRequired,
    numTasks: PropTypes.number.isRequired,
    dueBy: PropTypes.string,
};

export default Task;