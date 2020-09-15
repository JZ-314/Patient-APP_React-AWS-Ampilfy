import React, { useState, useEffect } from 'react';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import { makeStyles } from '@material-ui/core/styles';

import MainAlert from '../../components/alerts/MainAlert';
import AddButton from '../../components/buttons/AddButton';
import DataTable from '../../components/DataTable';

import { listCitys } from '../../graphql/queries';

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
    // { id: 'id', label: 'ID', minWidth: 200 },
    { id: 'city', label: 'City', minWidth: 300 },
    { id: 'street', label: 'Street', minWidth: 200 },
    { id: 'button', label: '', align: 'right' },
];

const rows = [
    {id: '1', city: 'IN', street: 1324171354},
    {id: '2', city: 'CN', street: 1403500365},
    {id: '3', city: 'IT', street: 60483973},
    {id: '4', city: 'US', street: 327167434},
    {id: '5', city: 'CA', street: 37602103},
    {id: '6', city: 'AU', street: 25475400},
    {id: '7', city: 'DE', street: 83019200},
    {id: '8', city: 'IE', street: 4857000},
    {id: '9', city: 'MX', street: 126577691},
    {id: '10', city: 'JP', street: 126317000},
    {id: '11', city: 'FR', street: 67022000},
    {id: '12', city: 'GB', street: 67545757},
    {id: '13', city: 'RU', street: 146793744},
    {id: '14', city: 'NG', street: 200962417},
    {id: '15', city: 'BR', street: 210147125}
];

const CityComponent = () => {

    const classes = useStyles();

    const [citys, setCitys] = useState([]);

    useEffect(() => {
        handleListCitys();
    }, []);

    const handleListCitys = async () => {
        const { data } = await API.graphql(graphqlOperation(listCitys));
        setCitys(data.listCitys.items);
    }

    return (
        <div className={classes.root}>   
            <MainAlert type='Administrator Page'></MainAlert>
            <AddButton type='city'></AddButton>
            <DataTable type='city' columns={columns} rows={citys} ></DataTable> 
        </div>
    );
}

export default CityComponent;