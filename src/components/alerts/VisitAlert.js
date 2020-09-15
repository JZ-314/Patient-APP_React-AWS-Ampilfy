import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    alertArea: {
        width: '80%',
        margin: '120px auto 50px',
    },
    alert: {
        marginLeft: theme.spacing(4),
    }
}));

const VisitAlert = withStyles((theme) => ({
    root: {
      fontWeight: 'bold',
      color: grey[700],
      width: '100% !important',
      padding: '20px 10px !important',
      fontSize: 20,
    },
}))(Alert);

export default function VisitAlertComponent(props) {
    const classes = useStyles();

    return (
        <div className={classes.alertArea}>
            <VisitAlert icon={false} variant="outlined" severity="success">
                <strong className={classes.alert}>{props.value} Visits</strong>
            </VisitAlert>
        </div>      
    );
}