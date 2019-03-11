import React, { Component } from 'react';
import { AppBar, Tab, Tabs } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';

import { withStyles, createStyles } from '@material-ui/core/styles';

import Project from './components/project'
import API from './services/datastoreApi'


const api = new API();


const styles = ({ palette, spacing }: Theme) => createStyles({
	paper: {
		padding: spacing.unit * 2,
		textAlign: 'left',
		color: palette.text.secondary,
	},
	tabSelected :{},
	tabRoot: {
		'&:hover': {
      color: palette.text.primary,
      opacity: 1,
    },
	}
});

class App extends Component {
	constructor(){
		super();
		this.state = {
			id: "",
			projects: [],
			value: 0,
		}
	}

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
	};
	

	componentDidMount(){
		// AJAX call here to get data from server
		api.getUserEntry((responseJson) => {
			this.setState({
				id: responseJson['id'],
				projects: responseJson['projects']
			});
		},
		(error) => {
			console.log("Error fetching data:", error);
			this.forceUpdate();
		})
	}

  render() {
	const { classes, theme } = this.props;

	let tabButtons = this.state.projects.map(project => {
		//TODO: onDelete={this.deleteProject.bind(this)} onComplete={this.addProject.bind(this)}
		return(
			<Tab 
				label={project.name}
				classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
				key={project.id}
			/>
		);
	});

	let projectItems = this.state.projects.map(project => {
		//TODO: onDelete={this.deleteProject.bind(this)} onComplete={this.addProject.bind(this)}
		return(
			<Project key={project.id} project={project} dir={theme.direction}/> 
		);
	});

		// TODO: Make tabs scrollable in case there are many projects
    return (
      <div className="App" >
				<AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
						variant="fullWidth"
						centered
          >
						{tabButtons}
          </Tabs>
        </AppBar>

			  <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
					{projectItems}
				</SwipeableViews>
			</div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
