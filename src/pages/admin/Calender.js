import React, { useState, useEffect } from 'react';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { makeStyles } from '@material-ui/core/styles';

import MainAlert from '../../components/alerts/MainAlert';
import AddButton from '../../components/buttons/AddButton';
import DataTable from '../../components/DataTable';

import { listCalenders } from '../../graphql/queries';

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
    }
}));

export default function CalenderComponent() {
    const classes = useStyles();

    const columns = [
        // { id: 'id', label: 'ID', minWidth: 100 },
        { id: 'doctor', label: 'Doctor Surname, Firstname', minWidth: 150 },
        { id: 'medical', label: 'Medical Specialization', minWidth: 150 },
        { id: 'city', label: 'City, Street', minWidth: 150 },
        { id: 'date', label: 'Date, Time', minWidth: 150 },
        { id: 'button', label: '', align: 'right'},
    ];

    const rows = [
        {id: 'India', doctor: 'IN', medical: 1324171354, city: 'IN', date: 1324171354},
        {id: 'China', doctor: 'CN', medical: 1403500365, city: 'IN', date: 1324171354},
        {id: 'Italy', doctor: 'IT', medical: 60483973, city: 'IN', date: 1324171354},
        {id: 'United States', doctor: 'US', medical: 327167434, city: 'IN', date: 1324171354},
        {id: 'Canada', doctor: 'CA', medical: 37602103, city: 'IN', date: 1324171354},
        {id: 'Australia', doctor: 'AU', medical: 25475400, city: 'IN', date: 1324171354},
        {id: 'Germany', doctor: 'DE', medical: 83019200, city: 'IN', date: 1324171354},
        {id: 'Ireland', doctor: 'IE', medical: 4857000, city: 'IN', date: 1324171354},
        {id: 'Mexico', doctor: 'MX', medical: 126577691, city: 'IN', date: 1324171354},
        {id: 'Japan', doctor: 'JP', medical: 126317000, city: 'IN', date: 1324171354},
        {id: 'France', doctor: 'FR', medical: 67022000, city: 'IN', date: 1324171354},
        {id: 'United Kingdom', doctor: 'GB', medical: 67545757, city: 'IN', date: 1324171354},
        {id: 'Russia', doctor: 'RU', medical: 146793744, city: 'IN', date: 1324171354},
        {id: 'Nigeria', doctor: 'NG', medical: 200962417, city: 'IN', date: 1324171354},
        {id: 'Brazil', doctor: 'BR', medical: 210147125, city: 'IN', date: 1324171354}
    ];

    const [calenders, setCalenders] = useState([]);

    useEffect(() => {
        handleListCalenders();
    }, []);

    const handleListCalenders = async () => {
        const { data } = await API.graphql(graphqlOperation(listCalenders));
        setCalenders(data.listCalenders.items);
    }
 
    return (
        <div className={classes.root}>   
            <MainAlert type='Administrator Page'></MainAlert>
            <AddButton type='calender'></AddButton>
            <DataTable type='calender' columns={columns} rows={calenders}></DataTable> 
        </div>
    );
}