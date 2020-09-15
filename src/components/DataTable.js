import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { amber, red, green } from '@material-ui/core/colors';
import { Alert } from '@material-ui/lab';

import ActionDialog from './dialogs/ActionDialog';
import CalenderDialog from './dialogs/CalenderDialog';
import { handleActionDialog, cancelActionDialog } from '../store/modules/dialogRedux';

// Grapql
import {createCity, updateCity, deleteCity} from '../graphql/mutations';
import {createMedical, updateMedical, deleteMedical} from '../graphql/mutations';
import {createDoctor, updateDoctor, deleteDoctor} from '../graphql/mutations';
import {createCalender, updateCalender, deleteCalender} from '../graphql/mutations';
import {createVisit, updateVisit, deleteVisit} from '../graphql/mutations';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    margin: '50px auto 10px !important'
  },
  container: {
    maxHeight: 500,
  },
  actionButton: {
    fontSize: 12,
    padding: '7px 13px'
  },
  alertArea: {
    width: '80%',
    margin: '20px auto',
    },
}));

const RegisterButton = withStyles((theme) => ({
    root: {
      color: '#fff',
      fontWeight: 'bold',
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    },
}))(Button);

const ChangeButton = withStyles((theme) => ({
    root: {
      color: '#fff',
      fontWeight: 'bold',
      backgroundColor: amber[500],
      '&:hover': {
        backgroundColor: amber[700],
      },
      marginRight: theme.spacing(2),
    },
}))(Button);

const DeleteButton = withStyles((theme) => ({
    root: {
      color: '#fff',
      fontWeight: 'bold',
      backgroundColor: red[500],
      '&:hover': {
        backgroundColor: red[700],
      },
    },
}))(Button);

export default function DataTable(props) {
    const classes = useStyles();
    const history = useHistory();
    const currentUser = Auth.userPool.getCurrentUser();

    const {type, columns, rows, actionVisit, modifyVisitId} = props;

    const [page, setPage] = useState(0);
    const [rowsData, setRowsData] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openActionDialog, setOpenActionDialog] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState(''); // selected table row data id
    const [selectedRowIndex, setSelectedRowIndex] = useState(''); // selected table row array index
    const [selectedRow, setSelectedRow] = useState([]);
    const [deletedRecord, setDeletedRecord] = useState(false);
    const [actionVisitType, setActionVisitType] = useState('');

    // set rowData from each category pages
    useEffect(() => {
        setRowsData(rows);
        setActionVisitType(actionVisit);
    }, [actionVisit, rows])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        setDeletedRecord(false);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
        setDeletedRecord(false);
    };

    const handleChange = (selectedRow, index) => () => {
        setSelectedRow(selectedRow);
        setSelectedRowIndex(index);
        setSelectedRowId(selectedRow.id);
        setDeletedRecord(false);
        // console.log(selectedRow);

        if(type === 'visit') {
            history.push('/patient_searchVisit', {
                selectedRow: selectedRow
            });
        } 
        else {
            console.log('true');
            setOpenActionDialog(true);
        }
    }

    const handleDelete = async selectedRow => {
        console.log(selectedRow);
        const payload = { id: selectedRow.id };
        if (type === 'city') {
            const { data } = await API.graphql(graphqlOperation(deleteCity, {input: payload}));
            const deletedCityId = data.deleteCity.id;
            const deletedCityIndex = rowsData.findIndex(row => row.id === deletedCityId);
            const updatedCities = [
                ...rowsData.slice(0, deletedCityIndex),
                ...rowsData.slice(deletedCityIndex + 1)
            ]
            setRowsData(updatedCities);
        } else if (type === 'doctor') {
            const { data } = await API.graphql(graphqlOperation(deleteDoctor, {input: payload}));
            const deletedDoctorId = data.deleteDoctor.id;
            const deletedDoctorIndex = rowsData.findIndex(row => row.id === deletedDoctorId);
            const updatedDoctors = [
                ...rowsData.slice(0, deletedDoctorIndex),
                ...rowsData.slice(deletedDoctorIndex + 1)
            ]
            setRowsData(updatedDoctors);
        } else if (type === 'medical') {
            const { data } = await API.graphql(graphqlOperation(deleteMedical, {input: payload}));
            const deletedMedicalId = data.deleteMedical.id;
            const deletedMedicalIndex = rowsData.findIndex(row => row.id === deletedMedicalId);
            const updatedMedicals = [
                ...rowsData.slice(0, deletedMedicalIndex),
                ...rowsData.slice(deletedMedicalIndex + 1)
            ]
            setRowsData(updatedMedicals);
        } else if (type === 'calender') {
            const { data } = await API.graphql(graphqlOperation(deleteCalender, {input: payload}));
            const deletedCalenderId = data.deleteCalender.id;
            const deletedCalenderIndex = rowsData.findIndex(row => row.id === deletedCalenderId);
            const updatedCalenders = [
                ...rowsData.slice(0, deletedCalenderIndex),
                ...rowsData.slice(deletedCalenderIndex + 1)
            ]
            setRowsData(updatedCalenders);
        } else if (type === 'visit') {
            const { data } = await API.graphql(graphqlOperation(deleteVisit, {input: payload}));
            const deletedVisitId = data.deleteVisit.id;
            const deletedVisitIndex = rowsData.findIndex(row => row.id === deletedVisitId);
            const updatedVisits = [
                ...rowsData.slice(0, deletedVisitIndex),
                ...rowsData.slice(deletedVisitIndex + 1)
            ]
            setRowsData(updatedVisits);
        }
        setDeletedRecord(true);
    }

    /**
     * ||----------- patient ---------------||
     */
    const handleRegister = (selectedRow) => (e) => {
        setSelectedRow(selectedRow);
        setDeletedRecord(false);
        handleCreateVisit(selectedRow);
    }

    const handleCreateVisit = async selectedVisit => {
        if (actionVisitType === 'add') {
            const payload = {
                userEmail: currentUser.username,
                doctor: selectedVisit.doctor, 
                city: selectedVisit.city, 
                medical: selectedVisit.medical,
                doctorID: selectedVisit.doctorID, 
                cityID: selectedVisit.cityID, 
                medicalID: selectedVisit.medicalID,
                startDate: selectedVisit.startDate,
                endDate: selectedVisit.endDate,
                times: selectedVisit.times
            }
            const { data } = await API.graphql(graphqlOperation(createVisit, { input: payload }));
            const updatedVisit = data.createVisit;

        } else if (actionVisitType === 'modify') {
            const payload = {
                id: modifyVisitId, 
                userEmail: currentUser.username,
                doctor: selectedVisit.doctor, 
                city: selectedVisit.city, 
                medical: selectedVisit.medical,
                doctorID: selectedVisit.doctorID, 
                cityID: selectedVisit.cityID, 
                medicalID: selectedVisit.medicalID,
                startDate: selectedVisit.startDate,
                endDate: selectedVisit.endDate,
                times: selectedVisit.times
            }
            console.log(payload);

            const { data } = await API.graphql(graphqlOperation(updateVisit, { input: payload }));
            const updatedVisit = data.updateVisit;
            // console.log(updatedVisit);
            history.push('/patient_visit')
        }
    }

    /**
     * ||-------------- redux ----------------||
     */
    const dispatch = useDispatch();

    const resCancelActionDialog = useSelector(state => state.dialogRedux.closeActionDialog);

    useEffect(() => {
        if (resCancelActionDialog !== null) {
                setOpenActionDialog(false);
                dispatch(cancelActionDialog(null));
                console.log('cancelDialog');
            }
    }, [resCancelActionDialog, dispatch]);

    const resRowData = useSelector(state => state.dialogRedux.rowData);
    const resType = useSelector(state => state.dialogRedux.type);
    const resAction = useSelector(state => state.dialogRedux.action);

    useEffect(() => {
        if (resRowData.length !== 0) {
            resAction === 'add' ?
                createOperation(resRowData, resType) : updateOperation(resRowData, resType)
                // console.log(resAddRowData);
        }
    }, [resType, resRowData, resAction]);


    // handleAddRow
    // when receiving action data from dialog redux, processing action operation
    const createOperation = async (addRowData, type) => {
        console.log(addRowData);
        if (type === 'city') {
            const { data } = await API.graphql(graphqlOperation(createCity, { input: addRowData }));
            const newCity = data.createCity;
            const updateCitys = [newCity, ...rowsData];
            setRowsData(updateCitys);
        } 
        else if (type === 'doctor') {
            const { data } = await API.graphql(graphqlOperation(createDoctor, { input: addRowData }));
            const newDoctor = data.createDoctor;
            const updateDoctors = [newDoctor, ...rowsData];
            setRowsData(updateDoctors);
        } else if (type === 'medical') {
            const { data } = await API.graphql(graphqlOperation(createMedical, { input: addRowData }));
            const newMedical = data.createMedical;
            const updateMedicals = [newMedical, ...rowsData];
            setRowsData(updateMedicals);
        } else if (type === 'calender') {
            const { data } = await API.graphql(graphqlOperation(createCalender, { input: addRowData }));
            const newCalender = data.createCalender;
            const updateCalenders = [newCalender, ...rowsData];
            setRowsData(updateCalenders);
        }
        
        dispatch(handleActionDialog([], '', ''));
    }


    // check the update row is existing in table rows
    const hasExistingRowData = () => {
        if (selectedRowId) {
            const isRowData = rowsData.findIndex(rowData => rowData.id === selectedRowId) > -1;
            return isRowData;
        }
        return false;
    }

    // handleUpdateRow
    const updateOperation = async (updateRowData, type) => {
        if (hasExistingRowData()) {
            // console.log(updateRowData);
            if (type === 'city') {
                const payload = {id: selectedRowId, city: updateRowData.city, street: updateRowData.street};
                const { data } = await API.graphql(graphqlOperation(updateCity, { input: payload }));    
                const updatedCity = data.updateCity;
                const updateCitys = [
                    ...rowsData.slice(0, selectedRowIndex),
                    updatedCity,
                    ...rowsData.slice(selectedRowIndex + 1)
                ];
                setRowsData(updateCitys);
                // setSelectedRowIndex('');
            } 
            else if (type === 'doctor') {
                const payload = {id: selectedRowId, surname: updateRowData.surname, firstname: updateRowData.firstname};
                const { data } = await API.graphql(graphqlOperation(updateDoctor, { input: payload }));
                const updatedDoctor = data.updateDoctor;
                const updateDoctors = [
                    ...rowsData.slice(0, selectedRowIndex),
                    updatedDoctor,
                    ...rowsData.slice(selectedRowIndex + 1)
                ];
                setRowsData(updateDoctors);
                setSelectedRowId('');
            } else if (type === 'medical') {
                const payload = {id: selectedRowId, medical: updateRowData.medical};
                const { data } = await API.graphql(graphqlOperation(updateMedical, { input: payload }));
                const updatedMedical = data.updateMedical;
                const updateMedicals = [
                    ...rowsData.slice(0, selectedRowIndex),
                    updatedMedical,
                    ...rowsData.slice(selectedRowIndex + 1)
                ];
                setRowsData(updateMedicals);
            } else if (type === 'calender') {
                const payload = {
                    id: selectedRowId, 
                    doctor: updateRowData.doctor, 
                    medical: updateRowData.medical,
                    city: updateRowData.city, 
                    date: updateRowData.date,
                    startDate: updateRowData.startDate,
                    endDate: updateRowData.endDate,
                    times: updateRowData.times
                };
                const { data } = await API.graphql(graphqlOperation(updateCalender, { input: payload }));
                const updatedCalender = data.updateCalender;
                const updateCalenders = [
                    ...rowsData.slice(0, selectedRowIndex),
                    updatedCalender,
                    ...rowsData.slice(selectedRowIndex + 1)
                ];
                setRowsData(updateCalenders);
            }
            setSelectedRowId('');
            dispatch(handleActionDialog([], '', ''));
        }
    }

    return (
        <div>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                        {columns.map((column) => (
                            <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                            >
                            {column.label}
                            </TableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, key) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    {columns.map((column) => {
                                        const value = column.id === 'date' ? row.startDate + ' - ' + row.endDate : row[column.id];
                                        return (
                                            column.id === 'button' ? 
                                                <TableCell key={column.id} align={column.align}>
                                                    {type === 'registerVisit' ? 
                                                        <RegisterButton className={classes.actionButton} onClick={handleRegister(row, key)}>{actionVisitType === 'modify' ? 'Change Visit' : 'Register'}</RegisterButton> :
                                                        <>
                                                        <ChangeButton className={classes.actionButton} onClick={handleChange(row, key)}>
                                                            {type === 'visit' ? 'Change Day' : 'Change'}</ChangeButton>
                                                        <DeleteButton className={classes.actionButton} onClick={() => handleDelete(row)}>
                                                            {type === 'visit' ? 'Cancel Visit' : 'Delete'}</DeleteButton>
                                                        </>
                                                    }
                                                </TableCell> :
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.id !== 'times' ?
                                                        column.format && typeof value === 'number' ? column.format(value) : value 
                                                        : row.times.map((time, key) => {
                                                            const timeVal = time.startTime + ' - ' + time.endTime;
                                                            return (
                                                                <div key={key}>{timeVal}</div>
                                                            )
                                                        })
                                                    }
                                                </TableCell>                                           
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <div id="dialog-area">
                {type !== 'calender' ?
                    <ActionDialog type={type} action='modify' onOpenActionDialog={openActionDialog} selectedRow={selectedRow}></ActionDialog> :
                    <CalenderDialog action='modify' onOpenActionDialog={openActionDialog} selectedRow={selectedRow}></CalenderDialog>
                }
            </div>
            <div className={classes.alertArea}>
                {deletedRecord ?
                    <Alert severity="success"><strong>Well done!</strong> You successfully deleted record</Alert> : null
                }
            </div>
        </div>
    );
}
