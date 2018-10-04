// Root of the Task application that contains a users tasks and lists.
import React, { Component } from 'react';
import TaskList from '../Components/TaskList';
import ItemList from '../Components/ItemList';
import TaskForm from '../Components/TaskForm';
import ItemForm from '../Components/ListForm';
import DATA from '../data';
import ITEM from '../item';
import '../TaskBox.css';


class TaskBox extends Component {
    constructor() {
        super();

        this.state = {
            data: []
        };
    }

    render() {
        return (
            <div className="container">
                <div className="tasks">
                    <h3>Your Tasks</h3>
                    <TaskList data={DATA}/>
                </div>
                <div className="items">
                    <h3>Your Items To-do</h3>
                    <ItemList items={ITEM}/>
                </div>
                <div className="testForms">
                    <TaskForm/>
                    <ItemForm/>
                </div>
            </div>
        );
    }

}

export default TaskBox;