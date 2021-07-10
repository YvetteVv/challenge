import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import LinearProgress from '@material-ui/core/LinearProgress';

import {
    getListOfAgesOfUsersWithHandler,
    getItemsHandler,
} from '../../apis/APIs';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    process: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(5),
        },
    },
}));

export function AgeCounter() {
    const [hobbiesList, setItemsList] = useState([]);
    const [ageCounter, setAgeCounter] = useState([]);
    const [item, setItem] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getItemsHandler().then((data) => {
            setItemsList(data);
        });
    }, []);
    const handleChange = (event) => {
        const itemQuery = event.target.value;
        setItem(itemQuery);
        setLoading(true);
        getListOfAgesOfUsersWithHandler(itemQuery).then((data) => {
            setAgeCounter(data);
            setLoading(false);
        });
    };

    const classes = useStyles();
    return (
        <>
            <h1>Age Demographic of Users with item</h1>
            <FormControl className={classes.formControl}>
                <InputLabel id='demo-simple-select-label'>Item</InputLabel>
                <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={item}
                    onChange={handleChange}
                >
                    {hobbiesList.map((item) => (
                        <MenuItem value={item} key={item}>
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {loading ? (
                <div className={classes.process}>
                    <LinearProgress />
                </div>
            ) : (
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell>Age</TableCell>
                                <TableCell align='right'>Count</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ageCounter.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component='th' scope='row'>
                                        {row.age}
                                    </TableCell>
                                    <TableCell align='right'>
                                        {row.count}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </>
    );
}
