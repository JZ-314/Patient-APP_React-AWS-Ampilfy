import React, { useState, useEffect } from 'react';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { makeStyles } from '@material-ui/core/styles';

import DataTable from '../../components/DataTable';
import VisitAlert from '../../components/alerts/VisitAlert';

import { listVisits } from '../../graphql/queries';

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

export default function VisitComponent() {
    const classes = useStyles();
    
    const currentUser = Auth.userPool.getCurrentUser();
    const [visits, setVisits] = useState([]);

    useEffect(() => {
        handleListVisits();
    }, []);

    const handleListVisits = async () => {
        let filter = {
            or : [
                {userEmail: {eq : currentUser.username}},
            ]
        }

        const { data } = await API.graphql(graphqlOperation(listVisits, {limit: 20, filter: filter }));
        setVisits(data.listVisits.items);
    }
 
    return (
        <div className={classes.root}>   
            <VisitAlert value='Scheduled'></VisitAlert>
            <DataTable type='visit' columns={columns} rows={visits}></DataTable> 
        </div>
    );
}