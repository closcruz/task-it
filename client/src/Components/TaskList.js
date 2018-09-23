// Component that will pass on props to individual tasks to
import React from 'react';
import PropTypes from 'prop-types';
import Task from '../Container/Task';

const TaskList = (props) => {
    const taskNodes = props.data.map(task => (
        <Task
            name={task.name}
            user={task.userId}
            task={task.taskId}
            numTasks={task.numTasks}
            due={task.dueBy}
        />
    ));
    return (
        <div>
            {taskNodes}
        </div>
    );
};

TaskList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        user: PropTypes.number,
        task: PropTypes.number,
        numTasks: PropTypes.number,
        name: PropTypes.string,
        due: PropTypes.string
    })),
};

TaskList.defaultProps = {
    data: [],
};

export default TaskList;