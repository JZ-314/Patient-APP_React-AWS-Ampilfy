import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Auth } from 'aws-amplify';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { grey } from '@material-ui/core/colors';

import MainAlert from '../../components/alerts/MainAlert';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
    },
    paper: {
        marginTop: theme.spacing(15),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
}));

const MenuButton = withStyles((theme) => ({
    root: {
      fontWeight: 'bold',
      backgroundColor: grey[400],
      '&:hover': {
        backgroundColor: grey[700],
      },
      width: '100% !important',
      padding: '20px 0 !important',
      fontSize: 20
    },
}))(Button);

export default function AdminMain() {
    const classes = useStyles();
    const history = useHistory();

    const handleClick = (target) => () => {
        console.log(target);
        history.push('/admin_' + target);
    }
 
    return (
        <div className={classes.root}>   
            <MainAlert type='Administrator Page'></MainAlert>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                    <div className={classes.paper}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <MenuButton variant="contained" color="primary" onClick={handleClick('calender')}>
                                    Calender
                                </MenuButton>
                            </Grid>
                            <Grid item xs={12}>
                                <MenuButton variant="contained" color="primary" onClick={handleClick('city')}>
                                    City
                                </MenuButton>
                            </Grid>
                            <Grid item xs={12}>
                                <MenuButton variant="contained" color="primary" onClick={handleClick('medical')}>
                                    Medical Specification
                                </MenuButton>
                            </Grid>
                            <Grid item xs={12}>
                                <MenuButton variant="contained" color="primary" onClick={handleClick('doctor')}>
                                    Doctor
                                </MenuButton>
                            </Grid>
                        </Grid>
                    </div>
            </Container> 
        </div>
    );
}