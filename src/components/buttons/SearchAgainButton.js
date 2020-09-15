import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { amber } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
}));

const AddButton = withStyles((theme) => ({
    root: {
      fontWeight: 'bold',
      backgroundColor: amber[400],
      '&:hover': {
        backgroundColor: amber[700],
      },
      width: '100% !important',
      padding: '10px 0 !important',
    },
}))(Button);

export default function CityComponent() {
    const classes = useStyles();

    return (
        <div>   
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <AddButton variant="contained" color="primary" href="/patient_searchVisit">
                                Search again
                            </AddButton>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
    );
}