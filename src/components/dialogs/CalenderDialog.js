import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { green, red } from '@material-ui/core/colors';
// calender module
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import './CalenderDialog.css';
import { handleActionDialog, cancelActionDialog } from '../../store/modules/dialogRedux';

import { listCitys, listDoctors, listMedicals } from '../../graphql/queries';

const textFields = [
    {id: 'doctor', label: 'Doctor Surname, Firstname'},
    {id: 'medical', label: 'Medical Specialization'},
    {id: 'city', label: 'City'},
    {id: 'date', label: 'Dates from to'},
];

const timeList = [
    {startTime: '08:00', endTime: '08:30'},
    {startTime: '08:30', endTime: '09:00'},
    {startTime: '09:00', endTime: '09:30'},
    {startTime: '09:30', endTime: '10:00'},
    {startTime: '10:00', endTime: '10:30'},
    {startTime: '10:30', endTime: '11:00'},
    {startTime: '11:00', endTime: '11:30'},
    {startTime: '11:30', endTime: '12:00'},
    {startTime: '12:00', endTime: '12:30'},
    {startTime: '12:30', endTime: '13:00'},
    {startTime: '13:00', endTime: '13:30'},
    {startTime: '13:30', endTime: '14:00'},
    {startTime: '14:00', endTime: '14:30'},
    {startTime: '14:30', endTime: '15:00'},
    {startTime: '15:00', endTime: '15:30'},
    {startTime: '15:30', endTime: '16:00'},
    {startTime: '16:00', endTime: '16:30'},
    {startTime: '16:30', endTime: '17:00'},
    {startTime: '17:00', endTime: '17:30'},
    {startTime: '17:30', endTime: '18:00'},
    {startTime: '18:00', endTime: '18:30'},
    {startTime: '18:30', endTime: '19:00'},
    {startTime: '19:00', endTime: '19:30'},
    {startTime: '19:30', endTime: '20:00'},
];

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
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
    },
    formControl: {
        margin: '10px auto',
        width: '100%',
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

    // ------- START get category list from dynamoDB using Grapql ----------- //
    const [cities, setCities] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [medicals, setMedicals] = useState([]);

    useEffect(() => {
        handleListCitys();
        handleListDoctors();
        handleListMedicals();
    }, []);

    const handleListCitys = async () => {
        const { data } = await API.graphql(graphqlOperation(listCitys));
        setCities(data.listCitys.items);
    }
    const handleListDoctors = async () => {
        const { data } = await API.graphql(graphqlOperation(listDoctors));
        setDoctors(data.listDoctors.items);
    }
    const handleListMedicals = async () => {
        const { data } = await API.graphql(graphqlOperation(listMedicals));
        setMedicals(data.listMedicals.items);
    }
    // ------- END get category list from dynamoDB using Grapql ----------- //

    const { action, onOpenActionDialog, selectedRow } = props;
    const [city, setCity] = useState([]); 
    const [medical, setMedical] = useState([]);
    const [doctor, setDoctor] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [defaultStartDate, setDefaultStartDate] = useState(new Date());
    const [defaultEndDate, setDefaultEndDate] = useState(new Date());
    const [times, setTimes] = useState([]); 
    const [disableButton, setDisableButton] = useState(false);

    const [defaultValue, setDefaultValue] = useState({
        defaultCity: '', 
        defaultMedical: '', 
        defaultDoctor: '', 
        defaultDate: '', 
        defaultTimes: '',
    });

    useEffect(() => {
        if (selectedRow) {
            setDefaultValue({
                defaultCity: selectedRow.city,
                defaultMedical: selectedRow.medical,
                defaultDoctor: selectedRow.doctor,
                defaultDate: selectedRow.date,
                defaultTimes: selectedRow.times,
            });
            // console.log(selectedRow);
        }
    }, [selectedRow]);

    const handleCity = (e) => {
        setCity(e.target.value);
    };

    const handleMedical = (e) => {
        setMedical(e.target.value);
    };

    const handleDoctor = (e) => {
        setDoctor(e.target.value);
    };

    const handleCheck = time => (e) => {
        if (e.target.checked) {
            const updateTimes = [time, ...times];
            setTimes(updateTimes);
        } else {
            const deletedTimesIndex = times.findIndex(item => item.id === time.id);
            const updateTimes = [
                ...times.slice(0, deletedTimesIndex),
                ...times.slice(deletedTimesIndex + 1)
            ]
            setTimes(updateTimes);
        }
        console.log(times);
    };

    // submit event
    const handleAction = () => {
        // console.log(city);
        // console.log(doctor);
        // console.log(medical);
        dispatch(handleActionDialog({
            'doctorID': doctor.id, 
            'medicalID': medical.id,
            'cityID': city.id,
            'doctor': doctor.firstname + ' ' + doctor.surname, 
            'medical': medical.medical,
            'city': city.city + ' ' + city.street,
            'startDate': startDate,
            'endDate': endDate,
            'times': times
        }, 'calender', action));

        dispatch(cancelActionDialog(true));

        setTimes([]);
        setDoctor('');
        setMedical('');
        setCity('');
        setStartDate('');
        setEndDate('');
    };

    const handleCancelDialog = () => {
        dispatch(cancelActionDialog(true));
    }

    const handleDateChange = type => (chooseDate) => {
        const year = chooseDate.getFullYear();
        const month = chooseDate.getMonth() > 9 ? (chooseDate.getMonth() + 1) : '0' + (chooseDate.getMonth() + 1);
        const date = chooseDate.getDate() > 9 ? chooseDate.getDate() : '0' + chooseDate.getDate();
        const selectDate = year + '/' + month + '/' + date;
        
        if (type === 'startDate') {
            setStartDate(selectDate)
            setDefaultStartDate(chooseDate)
        } else {
            setEndDate(selectDate)
            setDefaultEndDate(chooseDate)
        }
        console.log(selectDate);
    };

    return (
        <div className={classes.root}>
            <Dialog
                open={onOpenActionDialog}
                onClose={handleCancelDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" className={classes.dialogTitle}>
                    <strong>{action === 'add' ? 'Add new ' : 'Edit '} calender</strong>
                </DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={8}>
                            <Grid item xs={12}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-outlined-label">City</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        className={classes.outlined}
                                        value={city}
                                        onChange={handleCity}
                                        label="City"
                                        >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {cities.map((city, key) => {
                                            return (
                                                <MenuItem value={city} key={key}>{city.city}, {city.street}</MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-outlined-label">Medical</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        className={classes.outlined}
                                        value={medical}
                                        onChange={handleMedical}
                                        label="Medical"
                                        >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {medicals.map((medical, key) => {
                                            return (
                                                <MenuItem value={medical} key={key}>{medical.medical}</MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-outlined-label">Doctor</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={doctor}
                                        onChange={handleDoctor}
                                        label="Doctor"
                                        >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {doctors.map((doctor, key) => {
                                            return (
                                                <MenuItem value={doctor} key={key}>{doctor.surname} {doctor.firstname}</MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <TextField
                                margin="dense"
                                id="date"
                                label="Date"
                                name="date"
                                fullWidth
                                variant="outlined"
                                // defaultValue={defaultValue.date}
                                value={endDate === "" ? startDate : startDate + ' - ' + endDate}
                                disabled
                            />
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Start Date"
                                        format="MM/dd/yyyy"
                                        value={defaultStartDate}
                                        onChange={handleDateChange('startDate')}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                        />
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="End Date"
                                        format="MM/dd/yyyy"
                                        value={defaultEndDate}
                                        onChange={handleDateChange('endDate')}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                        />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Grid container spacing={1}>
                            {timeList.map((time, key) => {
                                return (
                                    key / 2 === 0 ?
                                        <Grid item xs={12} sm={6} key={key}>
                                            <Checkbox
                                            color="default"
                                            onChange={handleCheck(time)}
                                            inputProps={{ 'aria-label': 'checkbox with default color' }}
                                            />
                                            <span>{time.startTime}-{time.endTime}</span>
                                        </Grid> :
                                        <Grid item xs={12} sm={6} key={key}>
                                            <Checkbox
                                            color="default"
                                            onChange={handleCheck(time)}
                                            inputProps={{ 'aria-label': 'checkbox with default color' }}
                                            />
                                            <span>{time.startTime}-{time.endTime}</span>
                                        </Grid>
                                )
                            })}
                            </Grid>
                        </Grid>
                    </Grid>
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