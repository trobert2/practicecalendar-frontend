import React, { Component } from 'react';

import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = {
    appBarRoot: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1
    }
};

export class LoginBar extends Component {
    render() {
        console.log(this.props);
        const { classes } = this.props;
        return (
            <div className={classes.appBarRoot}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            Do and Progress
                        </Typography>
                        <Button size="small" color="inherit" variant="outlined" onClick={this.props.login}>
                            Log In
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(LoginBar);

LoginBar.propTypes = {
    login: PropTypes.func.isRequired
};
