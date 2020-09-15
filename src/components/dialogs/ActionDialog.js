import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { green, red } from '@material-ui/core/colors';

import { handleActionDialog, cancelActionDialog } from '../../store/modules/dialogRedux';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '95%',
    },
    actionButton: {
        width: '18%',
        fontSize: 12,
    },
    dialogTitle: {
        background: green[200],
        color: green[900], 
        padding: 15, 
    },
    dialogContent: {
        marginTop: theme.spacing(2),
    }
}));

const EditButton = withStyles((theme) => ({
    root: {
      color: '#fff',
      fontWeight: 'bold',
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
      marginRight: 2,
    },
}))(Button);

const CancelButton = withStyles((theme) => ({
    root: {
      color: '#fff',
      fontWeight: 'bold',
      backgroundColor: red[500],
      '&:hover': {
        backgroundColor: red[700],
      },
    },
}))(Button);

export default function ActionDialog(props) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { type, action, onOpenActionDialog, selectedRow } = props;

    const [openDialog, setOpenDialog] = useState(false);
    const [defaultValue, setDefaultValue] = useState({
        defaultFirstValue: '', 
        defaultSecondValue: '',
    });
    const [inputValue, setInputValue] = useState({
        firstInput: '',
        secondInput: '',
    });
    const [disableButton, setDisableButton] = useState(true);

    useEffect(() => {
        if (!openDialog)
            setOpenDialog(onOpenActionDialog);

        if (type === "city") {
            if (selectedRow) {
                setDefaultValue({
                    defaultFirstValue: selectedRow.city,
                    defaultSecondValue: selectedRow.street,
                });
            }
        } else if (type === 'doctor') {
            if (selectedRow) {
                setDefaultValue({
                    defaultFirstValue: selectedRow.surname,
                    defaultSecondValue: selectedRow.firstname,
                });
            }
        } else if (type === 'medical') {
            if (selectedRow) {
                setDefaultValue({
                    defaultFirstValue: selectedRow.medical,
                });
            }
        }
        
    }, [onOpenActionDialog, openDialog, selectedRow, type]);

    const handleChange = (e) => {
        const inputName = e.target.name;
        const value = e.target.value;

        setInputValue({
            ...inputValue,
            [inputName]: value
        });

        // if (action === 'modify') {
        //     setInitInputFirst(inputValue.firstInput === '' ? defaultValue.defaultFirstValue : value);
        //     setInitInputSecond(inputValue.secondInput === '' ? defaultValue.defaultsecondValue : value);
        //     setInputValue({
        //         firstInput: initInputFirst,
        //         secondInput: initInputSecond
        //     });
        // }

        if (type !== 'medical') {
            if (action === 'add') {
                if (inputValue.firstInput === '' || inputValue.secondInput === '') {
                    setDisableButton(true);
                }
                if (inputValue.firstInput !== '' || inputValue.secondInput !== '') {
                    setDisableButton(false);
                }
            } else {
                if (inputValue.firstInput !== '' || inputValue.secondInput !== '') {
                    setDisableButton(false);
                }
            }

            if (inputValue.firstInput === '' && inputValue.secondInput === '') {
                setDisableButton(true);
            }
        } else {
            inputValue.firstInput === '' ?
                setDisableButton(true) : setDisableButton(false);
        }
    }

    const handleAction = () => {
        if (type === "city") {
            dispatch(handleActionDialog({'city': inputValue.firstInput, 'street': inputValue.secondInput}, type, action));
        } else if (type === 'doctor') {
            dispatch(handleActionDialog({'surname': inputValue.firstInput, 'firstname': inputValue.secondInput}, type, action));
        } else {
            dispatch(handleActionDialog({'medical': inputValue.firstInput}, type, action));
        }
        dispatch(cancelActionDialog(true));
    };

    const handleCancelDialog = () => {
        dispatch(cancelActionDialog(true));
    }

    /**
     * ||-------------- redux ----------------||
     */
    const resCancelActionDialog = useSelector(state => state.dialogRedux.closeActionDialog);
    useEffect(() => {
        if (resCancelActionDialog !== null) {
            setOpenDialog(false);
            dispatch(cancelActionDialog(null));
            console.log('cancelDialog');
        }
    }, [resCancelActionDialog, dispatch]);

    return (
        <div className={classes.root}>
            <Dialog
                open={openDialog}
                onClose={handleCancelDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" className={classes.dialogTitle}>
                    <strong>{action === 'add' ? 'Add new ' : 'Edit '}{type}</strong>
                </DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id={type}
                        label={type === 'doctor' ? 'Surname' : type}
                        name='firstInput'
                        defaultValue={defaultValue.defaultFirstValue}
                        fullWidth
                        variant="outlined"
                        onChange={handleChange}
                    />
                    {type !== 'medical' ?
                        <TextField
                            margin="dense"
                            id={type === 'city' ? 'street' : 'firstname'}
                            label={type === 'city' ? 'Street' : 'Firstname'}
                            name='secondInput'
                            defaultValue={defaultValue.defaultSecondValue}
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                        /> : null    
                    }
                </DialogContent>
                <DialogActions>
                    <EditButton 
                        className={classes.actionButton} 
                        onClick={handleAction}  
                        disabled={disableButton}>
                        {action === 'add' ? 'Add' : 'Edit'}
                    </EditButton>
                    <CancelButton className={classes.actionButton} onClick={handleCancelDialog}>
                        Cancel
                    </CancelButton>
                </DialogActions>
            </Dialog>
        </div>
    );
}