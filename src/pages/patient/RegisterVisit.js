import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { Auth } from 'aws-amplify';
import { makeStyles } from '@material-ui/core/styles';

import SearchAgainButton from '../../components/buttons/SearchAgainButton';
import DataTable from '../../components/DataTable';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
        marginTop: 100
    },
    paper: {
        marginTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
}));

export default function RegisterVisitComponent() {
    const classes = useStyles();
    const location = useLocation();

    const columns = [
        // { id: 'id', label: 'ID', minWidth: 100 },
        { id: 'date', label: 'Date', minWidth: 150 },
        { id: 'times', label: 'Time', minWidth: 150 },
        { id: 'doctor', label: 'Doctor Surname, Firstname', minWidth: 150 },
        { id: 'medical', label: 'Medical Specialization', minWidth: 150 },
        { id: 'city', label: 'City, Street', minWidth: 150 },
        { id: 'button', label: '', align: 'center'},
    ];

    const rows = [
        {id: '1', doctor: 'IN', medical: '1324171354', city: 'IN', date: '1324171354', startDate: '1324', endDate: '171354', time: '134'},
        {id: '2', doctor: 'CN', medical: '1403500365', city: 'IN', date: '1324171354', startDate: '1324', endDate: '171354', time: '134'},
        {id: '3', doctor: 'IT', medical: '60483973', city: 'IN', date: '1324171354', startDate: '1324', endDate: '171354', time: '134'},
        {id: '4', doctor: 'US', medical: '327167434', city: 'IN', date: '1324171354', startDate: '1324', endDate: '171354', time: '134'},
        {id: '5', doctor: 'CA', medical: '37602103', city: 'IN', date: '1324171354', startDate: '1324', endDate: '171354', time: '134'},
        {id: '6', doctor: 'AU', medical: '25475400', city: 'IN', date: '1324171354', startDate: '1324', endDate: '171354', time: '134'},
        {id: '7', doctor: 'DE', medical: '83019200', city: 'IN', date: '1324171354', startDate: '1324', endDate: '171354', time: '134'},
        {id: '8', doctor: 'IE', medical: '4857000', city: 'IN', date: '1324171354', startDate: '1324', endDate: '171354', time: '134'},
        {id: '9', doctor: 'MX', medical: '126577691', city: 'IN', date: '1324171354', startDate: '1324', endDate: '171354', time: '134'},
        {id: '10', doctor: 'JP', medical: '126317000', city: 'IN', date: '1324171354', startDate: '1324', endDate: '171354', time: '134'},
        {id: '11', doctor: 'FR', medical: '67022000', city: 'IN', date: '1324171354', startDate: '1324', endDate: '171354', time: '134'},
        {id: '12', doctor: 'GB', medical: '67545757', city: 'IN', date: '1324171354', startDate: '1324', endDate: '171354', time: '134'},
        {id: '13', doctor: 'RU', medical: '146793744', city: 'IN', date: '1324171354', startDate: '1324', endDate: '171354', time: '134'},
        {id: '14', doctor: 'NG', medical: '200962417', city: 'IN', date: '1324171354', startDate: '1324', endDate: '171354', time: '134'},
        {id: '15', doctor: 'BR', medical: '210147125', city: 'IN', date: '1324171354', startDate: '1324', endDate: '171354', time: '134'}
    ];

    const [searchResult, setSearchResult] = useState([]);
    const { searchVisits, action, modifyId } = location.state; // get visit data to change from visit component

    useEffect(() => {
        console.log(searchVisits);
        setSearchResult(searchVisits.data.listCalenders.items);
    }, [searchVisits])
    
 
    return (
        <div className={classes.root}>   
            <SearchAgainButton></SearchAgainButton>
            <DataTable type='registerVisit' columns={columns} rows={searchResult} actionVisit={action} modifyVisitId={modifyId}></DataTable> 
        </div>
    );
}