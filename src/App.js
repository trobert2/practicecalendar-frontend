import React, { Component } from 'react';
import { AppBar, Tab, Tabs } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';

import { withStyles, createStyles } from '@material-ui/core/styles';

import Project from './components/project';
import API from './services/datastoreApi';
import AppMenuBar from './components/AppMenuBar';
import AddProject from './components/addProject';

const api = new API();

const styles = ({ palette, spacing }: Theme) =>
    createStyles({
        paper: {
            padding: spacing.unit * 2,
            textAlign: 'left',
            color: palette.text.secondary
        },
        tabSelected: {},
        tabRoot: {
            '&:hover': {
                color: palette.text.primary,
                opacity: 1
            }
        }
    });

class App extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            projects: [],
            value: 0
        };
    }

    getProjectItems = (projects) => {
        const { theme } = this.props;

        let projectItems = projects.map((project) => {
            //TODO: onDelete={this.deleteProject.bind(this)} onComplete={this.addProject.bind(this)}
            return <Project key={project.id} project={project} dir={theme.direction} />;
        });
        return projectItems;
    };

    getTabButtons = (projects) => {
        const { classes } = this.props;

        let tabButtons = projects.map((project) => {
            //TODO: onDelete={this.deleteProject.bind(this)} onComplete={this.addProject.bind(this)}
            return (
                <Tab
                    label={project.name}
                    classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                    key={project.id}
                />
            );
        });
        return tabButtons;
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = (index) => {
        this.setState({ value: index });
    };

    handleNewProject = (newProject) => {
        let projects = this.state.projects;

        projects.push(newProject);
        let tabButtons = this.getTabButtons(projects);
        let projectItems = this.getProjectItems(projects);

        this.setState({
            projects: projects,
            tabButtons: tabButtons,
            projectItems: projectItems,
        });

        api.postUserEntry( this.state.projects,
            (response) => {
                console.log('Update worked!');
            },
            (error) => {
                console.log('Error fetching data:', error);
                this.forceUpdate();
            }
        );
    };

    componentDidMount() {
        // AJAX call here to get data from server
        api.getUserEntry(
            (responseJson) => {
                
                let tabButtons = this.getTabButtons(responseJson['projects']);
                let projectItems = this.getProjectItems(responseJson['projects'])

                this.setState({
                    id: responseJson['id'],
                    projects: responseJson['projects'],
                    tabButtons: tabButtons,
                    projectItems: projectItems,
                });
            },
            (error) => {
                console.log('Error fetching data:', error);
                this.forceUpdate();
            }
        );
    }

    render() {
        const { classes, theme } = this.props;

        // TODO: Make tabs scrollable in case there are many projects
        return (
            <div className="App">
                {/* The top bar including log out */}
                <AppMenuBar logout={this.props.logout} />

                {/* The button to add a new project */}
                <AddProject className={classes.grow} addProject={this.handleNewProject.bind(this)} />

                {/* The tabs for the projects */}
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        centered
                    >
                        {this.state.tabButtons}
                    </Tabs>
                </AppBar>

                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                >
                    {this.state.projectItems}
                </SwipeableViews>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(App);
