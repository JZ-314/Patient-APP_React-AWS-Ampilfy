import React, { useState, useEffect } from 'react';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import { makeStyles } from '@material-ui/core/styles';

import MainAlert from '../../components/alerts/MainAlert';
import AddButton from '../../components/buttons/AddButton';
import DataTable from '../../components/DataTable';

import { listMedicals } from '../../graphql/queries';

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

export default function MedicalComponent() {
    const classes = useStyles();

    const columns = [
        // { id: 'id', label: 'ID', minWidth: 300 },
        { id: 'medical', label: 'Medical Specializtion', minWidth: 300 },
        { id: 'button', label: '', align: 'right'},
    ];

    const rows = [
        {id: 'India', medical: 'IN'},
        {id: 'China', medical: 'CN'},
        {id: 'Italy', medical: 'IT'},
        {id: 'United States', medical: 'US'},
        {id: 'Canada', medical: 'CA'},
        {id: 'Australia', medical: 'AU'},
        {id: 'Germany', medical: 'DE'},
        {id: 'Ireland', medical: 'IE'} ,
        {id: 'Mexico', medical: 'MX'},
        {id: 'Japan', medical: 'JP'},
        {id: 'France', medical: 'FR'},
        {id: 'United Kingdom', medical: 'GB'},
        {id: 'Russia', medical: 'RU'},
        {id: 'Nigeria', medical: 'NG'},
        {id: 'Brazil', medical: 'BR'}
    ];

    const [medicals, setMedicals] = useState([]);

    useEffect(() => {
        handleListMedicals();
    }, []);

    const handleListMedicals = async () => {
        const { data } = await API.graphql(graphqlOperation(listMedicals));
        setMedicals(data.listMedicals.items);
    }
 
    return (
        <div className={classes.root}>   
            <MainAlert type='Administrator Page'></MainAlert>
            <AddButton type='medical'></AddButton>
            <DataTable type='medical' columns={columns} rows={medicals}></DataTable> 
        </div>
    );
}