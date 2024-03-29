import React, { Component } from 'react';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

import { Paper, Grid } from '@material-ui/core';
import { withStyles, createStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Tasks from './tasks';
import AddTask from './addTask';
import Calendar from './calendar/calendar';

const moment = extendMoment(Moment);

const styles = ({ palette, spacing, typography }: Theme) =>
    createStyles({
        paper: {
            padding: spacing.unit * 2,
            textAlign: 'left',
            color: palette.text.secondary
        },
        heading: {
            fontSize: typography.pxToRem(15)
        }
    });

class Project extends Component {
    constructor() {
        super();
        this.state = {
            tasks: [],
            completedDates: [],
            incompleteDates: []
        };
    }

    taskDoneToday(dateString) {
        // TODO: Verify if all tasks are done today, after a new task has been added
        let foundDate = moment(dateString, 'DD-MM-YYYY');
        return foundDate.isSameOrAfter(moment(), 'day');
    }

    getTasksFromResponse(response) {
        let tasks = response['tasks'];
        if (tasks === null) {
            tasks = [];
        }

        tasks.forEach((task) => {
            task['done'] = this.taskDoneToday(task['lastDoneDate']);
        });

        return tasks;
    }

    getCompletedDates(completedDatesStringList) {
        let completedDates = [];
        if (completedDatesStringList != null) {
            completedDatesStringList.forEach((dateString) => {
                completedDates.push(moment(dateString, 'DD-MM-YYYY').toDate());
            });
        }
        return completedDates;
    }

    getIncompleteDates(startDateString, completedDatesStringList) {
        let incompleteDates = [];

        let startDate = moment(startDateString, 'DD-MM-YYYY');
        let today = moment();
        let timeFrame = moment.range(startDate, today);

        if (completedDatesStringList == null) {
            completedDatesStringList = [];
        }

        for (let day of timeFrame.by('day')) {
            if (!completedDatesStringList.indexOf(day.format('DD-MM-YYYY')) < 0) {
                continue
            }
            if (!day.isSame(today, 'day')) {
                incompleteDates.push(day.toDate());
            }
        }
        return incompleteDates;
    }

    checkTodayDone(element) {
        return element['done'] === false;
    }

    componentDidMount() {
        let fetchedTasks = this.getTasksFromResponse(this.props.project);
        let completedDates = this.getCompletedDates(this.props.project['completedDates']);
        let incompleteDates = this.getIncompleteDates(
            this.props.project['startDate'],
            this.props.project['completedDates']
        );
        if (fetchedTasks.length > 0 && fetchedTasks.findIndex(this.checkTodayDone) < 0) {
            completedDates.push(moment().toDate());
        }

        this.setState({
            // TODO: Daca toate task-urile au astazi setat ca LastDoneDate, adauga `new moment().toDate()` la completedTasks
            completedDates: completedDates,
            incompleteDates: incompleteDates,
            tasks: fetchedTasks,
            id: this.props.project['id'],
            name: this.props.project['name'],
            startDate: this.props.project['startDate']
        });
    }

    handleAddTask(task) {
        let tasks = this.state.tasks;
        if (tasks !== null) {
            tasks.push(task);
        } else {
            tasks = [ task ];
        }

        this.setState({ tasks: tasks });

        this.props.stateChangeHandler(this.state);
    }

    handleDeleteTask(id) {
        let tasks = this.state.tasks;
        let index = tasks.findIndex((x) => x.id === id);
        tasks.splice(index, 1);

        this.setState({ tasks: tasks });
        this.props.stateChangeHandler(this.state);
    }

    handleCompleteTask(id) {
        let tasks = this.state.tasks;
        let index = tasks.findIndex((x) => x.id === id);

        tasks[index]['done'] = true;
        tasks[index]['lastDoneDate'] = moment().format('DD-MM-YYYY');

        console.log('Task done! Notify server');

        this.setState({ tasks: tasks });
        this.props.stateChangeHandler(this.state);
    }

    handleCompleteAllTasks(id) {
        // Mark today as complete. Add to the array
        let state = this.state;
        state['completedDates'].push(moment().format('DD-MM-YYYY'));

        this.setState(state);
        this.props.stateChangeHandler(this.state);
    }

    render() {
        const { classes } = this.props;

        return (
            <div className="Project">
                <Paper className={classes.paper}>
                    <Grid id="project" justify="center" direction="row" spacing={32} container>
                        <Grid id="tasks" item>
                            <AddTask addTask={this.handleAddTask.bind(this)} />
                            <Tasks
                                tasks={this.state.tasks}
                                onDeleteTask={this.handleDeleteTask.bind(this)}
                                onCompleteTask={this.handleCompleteTask.bind(this)}
                                onCompleteAllTasks={this.handleCompleteAllTasks.bind(this)}
                            />
                        </Grid>
                        <Grid id="calendars" item>
                            <Calendar completed={this.state.completedDates} incomplete={this.state.incompleteDates} />
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Project);

Project.propTypes = {
    project: PropTypes.object.isRequired,
    stateChangeHandler: PropTypes.func.isRequired
};
