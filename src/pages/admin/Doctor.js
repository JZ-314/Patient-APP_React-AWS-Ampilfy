import React, { useState, useEffect } from 'react';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import { Redirect, useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import MainAlert from '../../components/alerts/MainAlert';
import AddButton from '../../components/buttons/AddButton';
import DataTable from '../../components/DataTable';

import { listDoctors } from '../../graphql/queries';

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

export default function DoctorComponent() {
    const classes = useStyles();

    const columns = [
        // { id: 'id', label: 'ID', minWidth: 200 },
        { id: 'surname', label: 'Surname', minWidth: 300 },
        { id: 'firstname', label: 'Firstname', minWidth: 200 },
        { id: 'button', label: '', align: 'right'},
    ];

    const rows = [
        {id: 'India', surname: 'IN', firstname: 1324171354},
        {id: 'China', surname: 'CN', firstname: 1403500365},
        {id: 'Italy', surname: 'IT', firstname: 60483973},
        {id: 'United States', surname: 'US', firstname: 327167434},
        {id: 'Canada', surname: 'CA', firstname: 37602103},
        {id: 'Australia', surname: 'AU', firstname: 25475400},
        {id: 'Germany', surname: 'DE', firstname: 83019200},
        {id: 'Ireland', surname: 'IE', firstname: 4857000},
        {id: 'Mexico', surname: 'MX', firstname: 126577691},
        {id: 'Japan', surname: 'JP', firstname: 126317000},
        {id: 'France', surname: 'FR', firstname: 67022000},
        {id: 'United Kingdom', surname: 'GB', firstname: 67545757},
        {id: 'Russia', surname: 'RU', firstname: 146793744},
        {id: 'Nigeria', surname: 'NG', firstname: 200962417},
        {id: 'Brazil', surname: 'BR', firstname: 210147125}
    ];

    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        handleListDoctors();
    }, []);

    const handleListDoctors = async () => {
        const { data } = await API.graphql(graphqlOperation(listDoctors));
        setDoctors(data.listDoctors.items);
    }
 
    return (
        <div className={classes.root}>   
            <MainAlert type='Administrator Page'></MainAlert>
            <AddButton type='doctor'></AddButton>
            <DataTable type='doctor' columns={columns} rows={doctors}></DataTable> 
        </div>
    );
}