import React from 'react';
import PropTypes from 'prop-types';


const TaskForm = props => (
    <form onSubmit={props.submitTask}>
        <input
            type="text"
            name="taskName"
            placeholder="Task Name"
            value={props.taskName}
            onChange={props.txtChange}
        /><br/>
        <input
            type="text"
            name="dateDue"
            placeholder="Due By"
            value={props.dueBy}
            onChange={props.txtChange}
        /><br/>
        <button type="submit">Submit</button>
    </form>
);

TaskForm.propTypes = {
    submitTask: PropTypes.func.isRequired,
    txtChange: PropTypes.func.isRequired,
    taskName: PropTypes.string,
    dateDue: PropTypes.string
};

TaskForm.defaultProps = {
    taskName: '',
    dateDue: '',
};

export default TaskForm;