import React, { Component } from 'react';
import { CssBaseline, Paper } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import { amber } from '@material-ui/core/colors';

import App from '../App';
import LoginBar from './LoginBar';

const theme = createMuiTheme({
    direction: 'ltr',
    typography: {
        useNextVariants: true
    },
    palette: {
        background: amber
    }
});

const styles = {
    loginscreen: {
        display: 'flex',
        flexDirection: 'column'
    },
    paperLogin: {
        padding: theme.spacing.unit * 10,
        textAlign: 'left',
        color: theme.palette.text.secondary
    },
    appBarRoot: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1
    },
    intro: {
        padding: theme.spacing.unit * 5,
        textAlign: 'center'
    }
};

class Home extends Component {
    // calls the login method in authentication service
    login = () => {
        this.props.auth.login();
    };

    // calls the logout method in authentication service
    logout = () => {
        this.props.auth.logout();
    };

    render() {
        // calls the isAuthenticated method in authentication service
        const { isAuthenticated } = this.props.auth;
        const { classes } = this.props;

        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <CssBaseline />
                    {isAuthenticated() && (
                        <div>
                            <App logout={this.logout} />
                        </div>
                    )}
                    {!isAuthenticated() && (
                        <div>
                            <LoginBar login={this.login} />
                            <Paper className={classes.paperLogin}>
                                <div className={classes.intro}>
                                    <h5> Practice calendar is a progress and habit tracker </h5>
                                </div>
                            </Paper>
                        </div>
                    )}
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Home);
