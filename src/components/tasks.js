import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TaskItem from './taskItem';

class Tasks extends Component {
    determineTasksCompleted() {
        for (let i = 0; i < this.props.tasks.length; i++) {
            if (this.props.tasks[i]['done'] === false) {
                return false;
            }
        }
        return true;
    }

    deleteTask(id) {
        this.props.onDeleteTask(id);
    }

    completeTask(id) {
        this.props.onCompleteTask(id);
        if (this.determineTasksCompleted()) {
            this.props.onCompleteAllTasks();
        }
    }

    render() {
        let taskItems;
        // console.log(this.props.tasks)
        if (this.props.tasks) {
            taskItems = this.props.tasks.map((task) => {
                return (
                    <TaskItem
                        key={task.id}
                        onDelete={this.deleteTask.bind(this)}
                        onComplete={this.completeTask.bind(this)}
                        task={task}
                    />
                );
            });
        }

        return (
            <div className="Tasks">
                <h2> Daily Tasks: </h2>
                <table>
                    <tbody>{taskItems}</tbody>
                </table>
            </div>
        );
    }
}

Tasks.propTypes = {
    tasks: PropTypes.array.isRequired,
    onDeleteTask: PropTypes.func.isRequired,
    onCompleteTask: PropTypes.func.isRequired,
    onCompleteAllTasks: PropTypes.func.isRequired
};

export default Tasks;
