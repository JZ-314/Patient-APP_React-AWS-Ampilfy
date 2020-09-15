import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from "react-router-dom";
import { Auth } from 'aws-amplify';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { amber } from '@material-ui/core/colors';

import ActionDialog from '../dialogs/ActionDialog';
import CalenderDialog from '../dialogs/CalenderDialog';
import { cancelActionDialog } from '../../store/modules/dialogRedux';

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

export default function CityComponent(props) {
    const classes = useStyles();

    const { type } = props;

    const [openActionDialog, setOpenActionDialog] = useState(false);
    
    const handleSubmit = () => {
        console.log('add');
        setOpenActionDialog(true);
    }

     /**
     * ||-------------- redux ----------------||
     */
    const dispatch = useDispatch();

    const resCancelActionDialog = useSelector(state => state.dialogRedux.closeActionDialog);

    useEffect(() => {
        if(resCancelActionDialog !== null) {
            setOpenActionDialog(false);
            dispatch(cancelActionDialog(null));
        }
    }, [resCancelActionDialog, dispatch]);
 
    return (
        <div>   
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <AddButton variant="contained" color="primary" onClick={handleSubmit}>
                                Add new {type}
                            </AddButton>
                        </Grid>
                    </Grid>
                </div>
            </Container>
            
            <div id="dialog-area">
                {type !== 'calender' ?
                    <ActionDialog type={type} action='add' onOpenActionDialog={openActionDialog}></ActionDialog> :
                    <CalenderDialog action='add' onOpenActionDialog={openActionDialog}></CalenderDialog>
                }
            </div>
        </div>
    );
}