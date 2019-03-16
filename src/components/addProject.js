import React, { Component } from 'react';
import {
    FormGroup,
    Input,
    InputAdornment,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Typography
} from '@material-ui/core';
import AddCircle from '@material-ui/icons/AddCircle';
import { withStyles, createStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Moment from 'moment';
import { extendMoment } from 'moment-range';

import PropTypes from 'prop-types';
import uuid from 'uuid';

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

class AddProject extends Component {
    constructor() {
        super();
        this.state = {
            newProject: {
                name: '',
                id: uuid.v4(),
                tasks: [],
                startDate: moment().format('DD-MM-YYYY'),
                completedDates: []
            }
        };
    }

    handleSubmit(e) {
        // We pass in the event and prevent it's submission.
        e.preventDefault();
        if (this.state.newProject.name === '') {
            alert('Please add a name');
        } else {
            this.props.addProject(this.state.newProject);

            this.setState({
                newProject: {
                    name: '',
                    id: uuid.v4(),
                    tasks: [],
                    startDate: moment().format('DD-MM-YYYY'),
                    completedDates: []
                }
            });
        }
    }

    handleChange(e) {
        this.setState({
            newProject: {
                name: e.target.value,
                id: uuid.v4(),
                tasks: [],
                startDate: moment().format('DD-MM-YYYY'),
                completedDates: []
            }
        });
    }

    render() {
        const { classes } = this.props;
        // TODO: change this and addTask to use a field that appears when the + button is pressed:
        // https://material-ui.com/lab/speed-dial/ might help. See also "Switch" inside of it
        return (
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>Add a new Project</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <FormGroup>
                            <Input
                                value={this.state.newProject.name}
                                onChange={this.handleChange.bind(this)}
                                placeholder="Project Name"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <AddCircle color="primary" />
                                    </InputAdornment>
                                }
                            />
                        </FormGroup>
                    </form>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}

AddProject.propTypes = {
    addProject: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(AddProject);
