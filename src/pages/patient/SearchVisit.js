import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { green } from '@material-ui/core/colors';
// calender module
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import VisitAlert from '../../components/alerts/VisitAlert';
import { listCitys, listDoctors, listMedicals, listCalenders } from '../../graphql/queries';

const cities = [
    {id: 1, city: 'IN', street: 1324171354},
    {id: 2, city: 'CN', street: 1403500365},
    {id: 3, city: 'IT', street: 60483973},
    {id: 4, city: 'US', street: 327167434},
    {id: 5, city: 'CA', street: 37602103},
];

const doctors = [
    {id: 1, surname: 'IN', firstname: 1324171354},
    {id: 2, surname: 'CN', firstname: 1403500365},
    {id: 3, surname: 'IT', firstname: 60483973},
    {id: 4, surname: 'US', firstname: 327167434},
    {id: 5, surname: 'CA', firstname: 37602103},
    {id: 6, surname: 'AU', firstname: 25475400},
];

const medicals = [
    {id: 1, medical: 'IN'},
    {id: 2, medical: 'CN'},
    {id: 3, medical: 'IT'},
    {id: 4, medical: 'US'},
    {id: 5, medical: 'CA'},
];

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
    },
    paper: {
        marginTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    formControl: {
        margin: '10px auto',
        width: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const SearchButton = withStyles((theme) => ({
    root: {
      fontWeight: 'bold',
      backgroundColor: green[400],
      '&:hover': {
        backgroundColor: green[700],
      },
      width: '100% !important',
      padding: '10px 0 !important',
    },
}))(Button);

export default function SearchComponent() {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    // ------- START get category list from dynamoDB using Grapql ----------- //
    const [changedVisit, setChangedVisit] = useState([]);
    const [city, setCity] = useState([]);
    const [doctor, setDoctor] = useState([]);
    const [medical, setMedical] = useState([]);
    const [cities, setCities] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [medicals, setMedicals] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [defaultStartDate, setDefaultStartDate] = useState(new Date());
    const [defaultEndDate, setDefaultEndDate] = useState(new Date());

    useEffect(() => {
        if (location.state) {
            const { selectedRow } = location.state; // get visit data to change from visit component
            console.log(selectedRow);
            setChangedVisit(selectedRow);
            setStartDate(selectedRow.startDate);
            setEndDate(selectedRow.endDate);
            setDefaultStartDate(selectedRow.startDate);
            setDefaultEndDate(selectedRow.endDate);
        }
    }, [location.state]);
    
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

    const handleCity = (e) => {
        setCity(e.target.value);
        console.log(e.target.value);
    };

    const handleMedical = (e) => {
        setMedical(e.target.value);
        console.log(e.target.value);
    };

    const handleDoctor = (e) => {
        setDoctor(e.target.value);
        console.log(e.target.value);
    };

    const handleDateChange = type => (chooseDate) => {
        const year = chooseDate.getFullYear();
        const month = (chooseDate.getMonth() + 1) > 9 ? (chooseDate.getMonth() + 1) : '0' + (chooseDate.getMonth() + 1);
        const date = chooseDate.getDate() > 9 ? chooseDate.getDate() : '0' + chooseDate.getDate();
        const selectDate = year + '/' + month + '/' + date;
        
        if (type === 'startDate') {
            setStartDate(selectDate);
            setDefaultStartDate(chooseDate);
        } else {
            setEndDate(selectDate);
            setDefaultEndDate(chooseDate);
        }
        console.log(selectDate);
    };

    const handleSearchVisit = () => {
        handleSearchListVisits();
    }

    const handleSearchListVisits = async () => {
        const action = changedVisit.length === 0 ? 'add' : 'modify';
        let filter = {
            or : [
                {doctorID: {eq : doctor.id}},
                {cityID: {eq : city.id}},
                {medicalID: {eq : medical.id}},
                // {startDate: {eq : startDate}},
                // {endDate: {eq : endDate}},
            ]
        }
        const searchVisits = await API.graphql(graphqlOperation(listCalenders, {limit: 20, filter: filter }));
        
        // console.log(searchVisits);
        if(city.length !== 0 && medical.length !== 0 && doctor.length !== 0) {
            history.push('/patient_registerVisit', {searchVisits: searchVisits, action: action, modifyId: changedVisit.id});
            setDoctor([]);
            setCity([]);
            setMedical([]);
        }
    }
 
    return (
        <div className={classes.root}>   
            <VisitAlert value='Register'></VisitAlert>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <div className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">City</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={city}
                                    onChange={handleCity}
                                    label="City"
                                    >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {cities.map((city, key) => {
                                        const cityVal = city.city + ', ' + city.street;
                                        if (cityVal === changedVisit.city && changedVisit.city !== []) {
                                            console.log(city);
                                            // console.log(changedVisit.city);
                                            // setCity(city);
                                        }
                                        return (
                                            <MenuItem value={city} key={key}>{city.city + ' ' + city.street}</MenuItem>
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
                         <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                id="date"
                                label="Date"
                                name="date"
                                fullWidth
                                variant="outlined"
                                // defaultValue={changedVisit.date}
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
                        <Grid item xs={12}>
                            <SearchButton variant="contained" color="primary" onClick={handleSearchVisit}>
                                Search
                            </SearchButton>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
    );
}