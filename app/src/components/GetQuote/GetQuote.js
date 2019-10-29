/*
 * SPDX-License-Identifier: Apache-2.0
 *     _____________  ___  
      / ___/ ___/ _ \/ _ \ 
     (__  ) /  /  __/  __/ 
    /____/_/   \___/\___  
 * File Created: Tuesday, 29th October 2019 11:27:00 am
 * Author: SreeTeja06 (sreeteja.muthyala@gmail.com)

 */
import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { Grid, Typography } from '@material-ui/core'
import { Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/AddOutlined';
import axios from '../../axios'
import SnakBar from '../SnackBar/SnackBar'
import LinearProgress from '@material-ui/core/LinearProgress';

const BootstrapInput = withStyles( theme => ( {
    root: {
        'label + &': {
            marginTop: theme.spacing( 3 ),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create( ['border-color', 'box-shadow'] ),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join( ',' ),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
} ) )( InputBase );

const useStyles = makeStyles( theme => ( {
    margin: {
        margin: theme.spacing( 1 ),
    },
    gridMargin: {
        marginTop: '7%'
    }
} ) );

export default function GetQuote() {
    const classes = useStyles();
    const [showSnakBar, setShowSnakBar] = React.useState( false )
    const [snakBarMessage, setSnakBarMessage] = React.useState()
    const [snakBarVarient, setSnakBarVarient] = React.useState( 'success' )
    const [loaded, setLoaded] = React.useState( false );
    const [manuf, setManuf] = React.useState( '' );
    const [model, setModel] = React.useState( '' );
    const [trim, setTrim] = React.useState( '' );
    const [year, setYear] = React.useState( '' );
    const [manufTypes, setManufTypes] = React.useState(["BMW", "Audi"]);
    const [modelTypes, setModelTypes] = React.useState( [] );
    const [trimTypes, setTrimTypes] = React.useState( [] );
    const [yearTypes, setYearTypes] = React.useState( [] );
    const [deal, setDeal] = React.useState(null);

    React.useEffect( () => {
        const fetchData = async () => {
            try {
                if ( showSnakBar ) {
                    await setShowSnakBar( false );
                }
                const result = await axios(
                    `car/getManufs`, {
                    headers: {
                        'x-auth': localStorage.getItem( 'carDealer_X_auth' )
                    }
                }
                );
                if ( result.status === 200 ) {
                    console.log("manuf types"+ result.data );
                    setManufTypes( result.data )
                } else {
                    setSnakBarMessage( "error getting car details" )
                    setSnakBarVarient( 'error' );
                    setShowSnakBar( true )
                }
            } catch ( e ) {
                setSnakBarMessage( "error getting car details" )
                setSnakBarVarient( 'error' );
                setShowSnakBar( true )
            }
            setLoaded( true )
        };
        fetchData();
    }, [] );

    const handleManufChange = async(event) => {
        setManuf( event.target.value );
        const result = await axios(
            `car/getModels?manufacturer=${manuf}`, {
            headers: {
                'x-auth': localStorage.getItem( 'carDealer_X_auth' )
            }
        }
        );
        console.log( result.data );
        setModelTypes( "model types" + result.data )
        setTrimTypes([])
        setYearTypes([])
        setModel( '' );
        setTrim( '' );
        setYear( '' );
    };
    const handleModelChange = async ( event ) => {
        setModel( event.target.value );
        const result = await axios(
            `car/getTrims?manufacturer=${ manuf}&model=${model}`, {
            headers: {
                'x-auth': localStorage.getItem( 'carDealer_X_auth' )
            }
        }
        );
        console.log( "trim types" + result.data );
        setTrimTypes( result.data )
        setYearTypes( [] )
        setTrim( '' );
        setYear( '' );
    };
    const handleTrimChange = async ( event ) => {
        setTrim( event.target.value );
        const result = await axios(
            `car/getYears?manufacturer=${ manuf }&model=${ model}&trim=${trim}`, {
            headers: {
                'x-auth': localStorage.getItem( 'carDealer_X_auth' )
            }
        }
        );
        console.log( "year types" +  result.data );
        setYearTypes( result.data )
        setYear( '' );        
    };
    const handleYearChange = async ( event ) => {
        setYear( event.target.value );
        const result = await axios(
            `car/getBestDeal?manufacturer=${ manuf }&model=${ model }&trim=${ trim}&year=${year}`, {
            headers: {
                'x-auth': localStorage.getItem( 'carDealer_X_auth' )
            }
        }
        );
        console.log( "best deal" + result.data);
        setDeal({price:"100",dealer:"dealer1"})
    };
    const buyCar = () => {
        console.log("buy car clicked")
    }
    return (
        <div>
            <Grid
                className={classes.gridMargin}
                container
                direction="column"
                justify="center"
                alignItems="center">
                <InputLabel id="demo-customized-select-label">Select Manufacturer</InputLabel>
                <FormControl className={classes.margin}>
                    <Select
                        style={{ width: "300px" }}
                        labelId="demo-customized-select-label"
                        id="demo-customized-select"
                        value={manuf}
                        onChange={handleManufChange}
                        input={<BootstrapInput />}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {
                            manufTypes.map( ( item, key ) =>
                                <MenuItem value={item}>{item}</MenuItem>
                            )
                        }
                    </Select>
                </FormControl>
                <InputLabel id="demo-customized-select-label">Select Model</InputLabel>
                <FormControl className={classes.margin}>
                    <Select
                        style={{ width: "300px" }}
                        labelId="demo-customized-select-label"
                        id="demo-customized-select"
                        value={model}
                        onChange={handleModelChange}
                        input={<BootstrapInput />}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {
                            modelTypes.map( ( item, key ) =>
                                <MenuItem value={item}>{item}</MenuItem>
                            )
                        }
                    </Select>
                </FormControl>
                <InputLabel id="demo-customized-select-label">Select Trim</InputLabel>
                <FormControl className={classes.margin}>
                    <Select
                        style={{ width: "300px" }}
                        labelId="demo-customized-select-label"
                        id="demo-customized-select"
                        value={trim}
                        onChange={handleTrimChange}
                        input={<BootstrapInput />}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {
                            trimTypes.map( ( item, key ) =>
                                <MenuItem value={item}>{item}</MenuItem>
                            )
                        }
                    </Select>
                </FormControl>
                <InputLabel id="demo-customized-select-label">Select Year</InputLabel>
                <FormControl className={classes.margin}>
                    <Select
                        style={{ width: "300px" }}
                        labelId="demo-customized-select-label"
                        id="demo-customized-select"
                        value={year}
                        onChange={handleYearChange}
                        input={<BootstrapInput />}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {
                            yearTypes.map( ( item, key ) =>
                                <MenuItem value={item}>{item}</MenuItem>
                            )
                        }
                    </Select>
                </FormControl>
                {deal?<div><Typography style={{ "marginTop": "10px" }}>Lowest Dealer Price: {deal.price}</Typography>
                <Typography style={{ "marginTop": "10px" }}>Dealer Name: {deal.dealer}</Typography>
                <Button
                    style={{ "backgroundColor": "#70b359", "color": "white", "padding": "10px", "marginTop": "30px" }}
                        onClick={buyCar}
                    >
                    Buy Car
                    <AddIcon />
                    </Button></div>:null}
            </Grid>
        </div>
    );
}
