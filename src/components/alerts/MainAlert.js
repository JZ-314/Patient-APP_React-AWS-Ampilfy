import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    alertArea: {
        width: '80%',
        margin: '100px auto 50px',
    },
    alert: {
        marginLeft: theme.spacing(2),
    }
}));

const MainAlert = withStyles((theme) => ({
    root: {
      fontWeight: 'bold',
      color: green[700],
      width: '100% !important',
      padding: '20px 10px !important',
      fontSize: 20,
    },
}))(Alert);

export default function MainAlertComponent(props) {
    const classes = useStyles();
    
    const {type} = props;

    return (
        <div className={classes.alertArea}>
            <MainAlert icon={false} severity="success">
                <strong className={classes.alert}>Hello! This is your {type}</strong>
            </MainAlert>
        </div>      
    );
}