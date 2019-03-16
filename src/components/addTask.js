import React, { Component } from 'react';
import { FormGroup, Input, InputAdornment } from '@material-ui/core';
import AddCircle from '@material-ui/icons/AddCircle';
import { withStyles, createStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import uuid from 'uuid';

const styles = ({ palette }: Theme) =>
    createStyles({
        margin: {
            textAlign: 'left',
            color: palette.secondary
        }
    });

class AddTask extends Component {
    constructor() {
        super();
        this.state = {
            newTask: {
                name: '',
                id: uuid.v4(),
                done: false
            }
        };
    }

    handleSubmit(e) {
        // We pass in the event and prevent it's submission.
        if (this.state.newTask.name === '') {
            alert('Please add a name');
        } else {
            this.props.addTask(this.state.newTask);

            this.setState({
                newTask: {
                    name: '',
                    id: uuid.v4(),
                    done: false
                }
            });
        }
        e.preventDefault();
    }

    handleChange(e) {
        this.setState({
            newTask: {
                name: e.target.value,
                id: uuid.v4(),
                done: false
            }
        });
    }

    render() {
        // const { classes } = this.props;
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <FormGroup>
                    <Input
                        value={this.state.newTask.name}
                        onChange={this.handleChange.bind(this)}
                        placeholder="New Task"
                        startAdornment={
                            <InputAdornment position="start">
                                <AddCircle color="primary" />
                            </InputAdornment>
                        }
                    />
                </FormGroup>
            </form>
        );
    }
}

AddTask.propTypes = {
    addTask: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(AddTask);
