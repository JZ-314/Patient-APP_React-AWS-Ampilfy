import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useHistory } from "react-router-dom";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { red } from '@material-ui/core/colors';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
    },
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
        marginTop: theme.spacing(3),
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
        margin: '100px auto',
    },
}));

export default function SignUp() {
    const classes = useStyles();
    const history = useHistory();

    const [state, setState] = useState({
            email: '',
            password: '',
            confirmPwd: '',
    });

    const [confirmationEmail, setConfirmationEmail] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');

    const [signedUp, setSignedUp] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [inputConfirmPwdError, setInputConfirmPwdError] = useState('');
    const [confirmPwdError, setConfirmPwdError] = useState(false);
    const [messageError, setMessageError] = useState('');

    const handleSignUp = (e) => {
        const inputVal = e.target.value;
        setState({
            ...state,
            [e.target.name]: inputVal
        });
    }

    const handleConfirmation = (e) => {
        const inputVal = e.target.value;
        // setConfirmation({
        //     ...confirmation,
        //     [e.target.name]: inputVal
        // });
        setConfirmationCode(inputVal);
    }

    const formValidate = () => {
        // !state.email.includes('@') ? setEmailError('Invalid Email') : setEmailError('');
        // !state.password ? setPasswordError('Password can not be blank') : setPasswordError('');
        // !state.confirmPwd ? setInputConfirmPwdError('Confirm password can not be blank') : setInputConfirmPwdError('');
        state.password !== state.confirmPwd ? 
            setConfirmPwdError(true) : setConfirmPwdError(false);

        if (confirmPwdError) {
            setMessageError('Your password is incorrect');
            return false;
        }

        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = state;
        
        const validate = formValidate();
        if (!signedUp) {
            if (validate) {
                Auth.signUp({
                    username: email,
                    password: password,
                    attributes: {
                        email: email,
                        phone_number: ''
                    }
                })
                .then(() => {
                    console.log('signed up');
                    setSignedUp(true);
                    setConfirmationEmail(state.email);
                    setConfirmPwdError(false);
                })
                .catch(err => {
                    console.log(err);
                    setConfirmPwdError(true);
                    if (err.name === "UsernameExistsException" || err.name === "InvalidPasswordException")
                        setMessageError(err.message);
                    else if (err.name === "InvalidParameterException")
                        setMessageError('Member must have length greater than or equal to 6');
                });
                
                
                setState({
                    password: '',
                    email: '',
                });  
                setConfirmPwdError(false);
            }
        }
        else {
            // console.log(confirmationCode);
            setConfirmPwdError(false);
            Auth.confirmSignUp(confirmationEmail, confirmationCode)
            .then(() => {
                console.log('confirmed sign up');
                setSignedUp(true);
                history.push('/');
            })
            .catch(err => console.log(err));

            setState({
                confirmationCode: '',
                confirmationEmail: ''
            });
        }
        e.target.reset();
    }
 
    return (
        <div className={classes.root}>   
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                {signedUp ?
                    <div className={classes.paper}>
                        <form onSubmit={handleSubmit} className={classes.form}>
                            <Grid container spacing={2}>
                                {/* <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="confirmationEmail"
                                        label="Email Address"
                                        name="confirmationEmail"
                                        autoComplete="email"
                                        onChange={handleConfirmation}
                                        />
                                </Grid> */}
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="confirmationCode"
                                        label="Confirmation Code"
                                        id="confirmationCode"
                                        autoComplete="confirmationCode"
                                        onChange={handleConfirmation}
                                        />
                                    <div className={classes.formValidate}>
                                    </div>
                                </Grid>
                            </Grid>
                            <Button
                                type='submit'
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                >
                            Confirm Sign Up
                            </Button>
                        </form>
                    </div> :
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <form onSubmit={handleSubmit} className={classes.form}>
                            <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={handleSignUp}
                                autoFocus
                                />
                                <div className={classes.formValidate}>
                                    {emailError}
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handleSignUp}
                                />
                                <div className={classes.formValidate}>
                                    {passwordError}
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="confirmPwd"
                                label="Confirm Password"
                                type="password"
                                id="confirm-password"
                                autoComplete="current-confirmPassword"
                                onChange={handleSignUp}
                                />
                                <div className={classes.formValidate}>
                                    {inputConfirmPwdError}
                                </div>
                            </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                >
                                Sign Up
                            </Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link href="/" variant="body2">
                                    Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                }   
            </Container> 
            <div className={classes.alertArea}>
                {state.signedUp ?
                    <Alert severity="success" className={classes.alert}>
                        <AlertTitle>Success</AlertTitle>
                        <strong>Well done!</strong> Your account has been succesfully created
                    </Alert>
                : null}
                {confirmPwdError ?
                    <Alert severity="error" className={classes.alert}>
                        <AlertTitle>Failed</AlertTitle>
                        <strong>Oh snap!</strong> {messageError}, please try submitting again
                    </Alert>
                : null}
            </div>
        </div>
    );
}