import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';

const styles = ({ spacing }: Theme) =>
    createStyles({
        fab: {
            margin: spacing.unit
        },
        extendedIcon: {
            marginRight: spacing.unit
        }
    });

class Task extends Component {
    deleteTask(id) {
        this.props.onDelete(id);
    }

    completeTask(id) {
        this.props.onComplete(id);
    }

    render() {
        return (
            <tr className="Task" id={this.props.task.id}>
                <th>
                    <strong>{this.props.task.name}</strong>
                </th>

                <th>
                    <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                        size="small"
                        onClick={this.deleteTask.bind(this, this.props.task.id)}
                        value="Submit"
                    >
                        Delete
                    </Button>
                </th>

                <th>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        size="small"
                        onClick={this.completeTask.bind(this, this.props.task.id)}
                        value="Submit"
                        disabled={this.props.task.done}
                    >
                        Complete
                    </Button>
                </th>
            </tr>
        );
    }
}

Task.propTypes = {
    task: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onComplete: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(Task);
