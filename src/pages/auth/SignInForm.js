import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from "react-router-dom";
import { Auth } from 'aws-amplify'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { red } from '@material-ui/core/colors';
import { Alert, AlertTitle } from '@material-ui/lab';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(20),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  formValidate: {
      color: red[500],
      fontSize: 15,
      paddingTop: theme.spacing(1),
      float: 'right'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alertArea: {
      width: '80%',
      margin: '150px auto',
  },
}));

export default function SignIn() {
    const classes = useStyles();
    const history = useHistory();

    const [state, setState] = useState({
        email: '',
        password: '',
        confirmationCode: '',
    });

    const [signedIn, setSignedIn] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [signInError, setSignInError] = useState(false);

    const handleChange = (e) => {
        const inputVal = e.target.value;
        setState({
            ...state,
            [e.target.name]: inputVal
        });
    }

    const formValidate = () => {
        state.email === '' ? setEmailError('Invalid Email') : setEmailError('');
        state.password === '' ? setPasswordError('Password can not be blank') : setPasswordError('');

        if (state.email === '' || state.password === '') {
            return false;
        }
        return true; 
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(state);
        const { email, password } = state;
        
        if (formValidate()) {
            Auth.signIn({
                username: email,
                password: password
            })
            .then(() => {
                console.log('signed in');
                email === 'mail.lukasz.pioro@gmail.com' ? 
                    history.push('/admin', { panel: 'admin', signedIn: true }) : history.push('/patient', { panel: 'patient', signedIn: true });
                setSignedIn(true);
            })
            .catch(err => {
                console.log(err);
                setSignInError(true);
            });

            Auth.confirmSignIn(email)
                .then(() => console.log('confirmed sign in'))
                .catch(err => console.log(err));
        }

        setState({
            email: '',
            password: ''
        });
        
        // setSignedIn(true);
        setSignInError(false);
        e.target.reset();
    }

    return (
            <div className={classes.margin}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                        Sign in
                        </Typography>
                        <form onSubmit={handleSubmit} className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={handleChange}
                        />
                        <div className={classes.formValidate}>
                            {emailError}
                        </div>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handleChange}
                        />
                        <div className={classes.formValidate}>
                            {passwordError}
                        </div>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Log me in
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                            <Link href="/SignUp" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                            </Grid>
                        </Grid>
                        </form>
                    </div>
                </Container>
                <div className={classes.alertArea}>
                    {signInError ?
                        <Alert severity="error" className={classes.alert}>
                            <AlertTitle>Failed</AlertTitle>
                            <strong>Oh snap!</strong> Incorrect username or password, please try to sign in again
                        </Alert>
                    : null}
                </div>
            </div>
    );
}