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

class AppMenuBar extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.appBarRoot}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="caption" color="inherit" className={classes.grow}>
                            Do and Progress
                        </Typography>
                        <Button size="small" color="inherit" style={{ cursor: 'pointer' }} onClick={this.props.logout}>
                            Log Out
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(AppMenuBar);

AppMenuBar.propTypes = {
    logout: PropTypes.func.isRequired
};
