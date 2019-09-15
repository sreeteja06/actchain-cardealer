/*
 * SPDX-License-Identifier: Apache-2.0
 *     _____________  ___  
      / ___/ ___/ _ \/ _ \ 
     (__  ) /  /  __/  __/ 
    /____/_/   \___/\___  
 * File Created: Sunday, 15th September 2019 5:44:43 pm
 * Author: SreeTeja06 (sreeteja.muthyala@gmail.com)

 */
import React from 'react';
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import { Button } from '@material-ui/core'

function createData( name, manufacturer, type, year, lowestdeal ) {
    return { name, manufacturer, type, year, lowestdeal };
}

const rows = [
    createData( 'Cupcake', "Audi", "LXI", 2019, 4.3 ),
    createData( 'Donut', "Benz", "VDI", 2015, 4.9 ),
    createData( 'Eclair', "Ferrari", "XR", 1992, 6.0 ),
    createData( 'Frozen yoghurt', "Lambo", "PRO", 2014, 4.0 ),
    createData( 'Gingerbread', "HG", 16.0, 1999, 3.9 ),
    createData( 'Honeycomb', "VW", 3.2, 2000, 6.5 ),
    createData( 'Ice cream sandwich', "BMW", 9.0, 2004, 4.3 ),
    createData( 'Jelly Bean', "Bugati", 0.0, 1996, 0.0 ),
    createData( 'KitKat', "Skoda", 26.0, 2012, 7.0 ),
    createData( 'Lollipop', "Yamaha", 0.2, 2010, 2.0 ),
    createData( 'Marshmallow', "Astro Martin", 0, 2016, 2.0 ),
    createData( 'Nougat', "KIA", 19.0, 1991, 37.0 ),
    createData( 'Oreo', "Ford", 18.0, 1993, 4.0 ),
];

function desc( a, b, orderBy ) {
    if ( b[orderBy] < a[orderBy] ) {
        return -1;
    }
    if ( b[orderBy] > a[orderBy] ) {
        return 1;
    }
    return 0;
}

function stableSort( array, cmp ) {
    const stabilizedThis = array.map( ( el, index ) => [el, index] );
    stabilizedThis.sort( ( a, b ) => {
        const order = cmp( a[0], b[0] );
        if ( order !== 0 ) return order;
        return a[1] - b[1];
    } );
    return stabilizedThis.map( el => el[0] );
}

function getSorting( order, orderBy ) {
    return order === 'desc' ? ( a, b ) => desc( a, b, orderBy ) : ( a, b ) => -desc( a, b, orderBy );
}

const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Car Name' },
    { id: 'manufacturer', numeric: false, disablePadding: false, label: 'Manufacturer' },
    { id: 'type', numeric: false, disablePadding: false, label: 'Type' },
    { id: 'year', numeric: true, disablePadding: false, label: 'Year' },
    { id: 'lowestdeal', numeric: true, disablePadding: false, label: 'Lowest Deal' },
    { id: 'makedeal', numeric: true, disablePadding: false, label: 'Make Deal' },
];

function EnhancedTableHead( props ) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = property => event => {
        onRequestSort( event, property );
    };

    return (
        <TableHead>
            <TableRow>

                {headCells.map( headCell => (
                    <TableCell
                        key={headCell.id}
                        align='right'
                        padding='default'
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={order}
                            onClick={createSortHandler( headCell.id )}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ) )}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf( ['asc', 'desc'] ).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles( theme => ( {
    root: {
        paddingLeft: theme.spacing( 2 ),
        paddingRight: theme.spacing( 1 ),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten( theme.palette.secondary.light, 0.85 ),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
} ) );

const EnhancedTableToolbar = props => {
    const classes = useToolbarStyles();

    return (
        <Toolbar>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                <Tooltip title="Filter list">
                    <IconButton aria-label="filter list">
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            </div>
        </Toolbar>
    );
};

const useStyles = makeStyles( theme => ( {
    root: {
        width: '100%',
        marginTop: theme.spacing( 3 ),
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing( 2 ),
    },
    table: {
        minWidth: 750,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
} ) );

export default function Market() {
    const classes = useStyles();
    const [order, setOrder] = React.useState( 'asc' );
    const [orderBy, setOrderBy] = React.useState( 'calories' );
    const [page, setPage] = React.useState( 0 );
    const [rowsPerPage, setRowsPerPage] = React.useState( 5 );

    function handleRequestSort( event, property ) {
        const isDesc = orderBy === property && order === 'desc';
        setOrder( isDesc ? 'asc' : 'desc' );
        setOrderBy( property );
    }

    function handleChangePage( event, newPage ) {
        setPage( newPage );
    }

    function handleChangeRowsPerPage( event ) {
        setRowsPerPage( +event.target.value );
        setPage( 0 );
    }

    const emptyRows = rowsPerPage - Math.min( rowsPerPage, rows.length - page * rowsPerPage );

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar />
                <div className={classes.tableWrapper}>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort( rows, getSorting( order, orderBy ) )
                                .slice( page * rowsPerPage, page * rowsPerPage + rowsPerPage )
                                .map( ( row, index ) => {
                                    const labelId = `enhanced-table-checkbox-${ index }`;

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.name}
                                        >
                                            <TableCell component="th" id={labelId} align="right" scope="row" >
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.manufacturer}</TableCell>
                                            <TableCell align="right">{row.type}</TableCell>
                                            <TableCell align="right">{row.year}</TableCell>
                                            <TableCell align="right">{row.lowestdeal}</TableCell>
                                            <TableCell align="right"><Button style={{ "backgroundColor": "rgb(25,123,189)", "color": "white" }}>Quote Price</Button></TableCell>
                                        </TableRow>
                                    );
                                } )}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'previous page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'next page',
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}