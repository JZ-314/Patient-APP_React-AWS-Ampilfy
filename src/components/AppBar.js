import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { Auth } from 'aws-amplify';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { green, blue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  mainButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const MainButton = withStyles((theme) => ({
  root: {
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: blue[500],
    '&:hover': {
      backgroundColor: blue[700],
    },
  },
}))(Button);

const LogoffButton = withStyles((theme) => ({
  root: {
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
}))(Button);

export default function TopAppBar(props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const { isAuthenticated, authState } = props;

  const [isAuthenticated_, userHasAuthenticated] = useState(false);
  const [signedIn_, setSignedIn] = useState('');

  useEffect(() => {
    // console.log(location.pathname);
    setSignedIn(authState);
    userHasAuthenticated(isAuthenticated);
  }, [authState, isAuthenticated, location, location.state]);

  const handleSignOut = async => {
    try {
        Auth.signOut({ global: true });
        userHasAuthenticated(false);
        setSignedIn('');
        history.push('/');
    } catch (error) {
        console.log('error signing out: ', error);
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="inherit">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Medical App.
          </Typography>
          {location.pathname.includes('admin') || location.pathname.includes('patient') ?
            <>
              <MainButton variant="contained" color="primary" className={classes.mainButton} href={location.pathname.includes('admin') ? '/admin' : '/patient'}>Main menu</MainButton>
              <LogoffButton variant="contained" color="primary" onClick={handleSignOut}>
                Log off
              </LogoffButton>
              </> : null
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}
