import React, { Component } from 'react';
import Moment from 'moment'
import { extendMoment } from 'moment-range';
import { Paper, Grid } from '@material-ui/core';
import { withStyles, createStyles } from '@material-ui/core/styles';

import Tasks from './tasks'
import AddTask from './addTask'
import Calendar from './calendar/calendar'


const moment = extendMoment(Moment);


const styles = ({ palette, spacing }: Theme) => createStyles({
	paper: {
		padding: spacing.unit * 2,
		textAlign: 'left',
		color: palette.text.secondary,
	},
});

class Project extends Component {

	constructor(){
		super();
		this.state = {
			tasks: [],
			completedDates: [],
			incompleteDates: [],
		}
	}

	taskDoneToday(dateString) {
		let foundDate = moment(dateString, 'DD-MM-YYYY');
		return foundDate.isSameOrAfter(moment(), "day");
	}

	getTasksFromResponse(response) {
		let tasks = response["tasks"]
		tasks.forEach(task => {
			task["done"] = this.taskDoneToday(task["lastDoneDate"]);
		});
		
		return tasks;
	}

	getCompletedDates(completedDatesStringList) {
        let completedDates = []
        if (completedDatesStringList != null) {
            completedDatesStringList.forEach(dateString => {
                completedDates.push(moment(dateString, 'DD-MM-YYYY').toDate());
            });
        }
		return completedDates;
	}

	getIncompleteDates(startDateString, completedDatesStringList){
		let incompleteDates = [];

		let startDate = moment(startDateString, 'DD-MM-YYYY');
		let today = moment();
		let timeFrame = moment.range(startDate, today);

        if (completedDatesStringList == null) {
            completedDatesStringList = []
        }

		for (let day of timeFrame.by('day')) {
			if (completedDatesStringList.indexOf(day.format('DD-MM-YYYY')) < 0) {
				if (!day.isSame(today, "day")) {
					incompleteDates.push(day.toDate());
				}
			}
		}
		return incompleteDates
	}

	checkTodayDone(element) {
		return element['done'] === false;
	}

	componentDidMount(){
		// AJAX call here to get data from server

		let fetchedTasks = this.getTasksFromResponse(this.props.project);
		let completedDates = this.getCompletedDates(this.props.project['completedDates']);
        let incompleteDates = this.getIncompleteDates(this.props.project['startDate'],
                                                      this.props.project['completedDates']);
		if(fetchedTasks.findIndex(this.checkTodayDone) < 0) {
			completedDates.push(moment().toDate());
		}

		this.setState({
			// TODO: Daca toate task-urile au astazi setat ca LastDoneDate, adauga `new moment().toDate()` la completedTasks
			completedDates: completedDates,
			incompleteDates: incompleteDates,
			tasks: fetchedTasks
		});
	}

	handleAddTask(task){
		let tasks = this.state.tasks;
		tasks.push(task);
		this.setState({tasks:tasks})
	}

	handleDeleteTask(id) {
		let tasks = this.state.tasks;
		let index = tasks.findIndex(x => x.id === id);
		tasks.splice(index, 1);

		this.setState({tasks:tasks})
	}

	handleCompleteTask(id){
		let tasks = this.state.tasks;
		let index = tasks.findIndex(x => x.id === id);
		// TODO: Call server and notify the task is completed and set it's LastDoneDate to today
		tasks[index]['done'] = true;

		this.setState({tasks:tasks})
	}

	handleCompleteAllTasks(id){
		// TODO: Call server and notify the day is done
		console.log("All done for the day! Notify server today is done")
		// Mark today as complete. Add to the array
		let state = this.state;
		state['completedDates'].push(moment().toDate());
		this.setState(state);
	}

  render() {
		const { classes } = this.props;

    return (
      <div className="Project" >
			
				<Paper className={classes.paper}>
					<Grid id="project" 
						justify="center" 
						direction="row"
						spacing={32}
						container
					>
						<Grid id="tasks" item>
							<AddTask addTask={this.handleAddTask.bind(this)} />
							<Tasks tasks={this.state.tasks} onDeleteTask={this.handleDeleteTask.bind(this)} onCompleteTask={this.handleCompleteTask.bind(this)} onCompleteAllTasks={this.handleCompleteAllTasks.bind(this)} />
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
