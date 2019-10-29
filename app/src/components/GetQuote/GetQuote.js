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
import LinearProgress from '@material-ui/core/CircularProgress';

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
    const [carCostID, setCarCostID] = React.useState( null );

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
        console.log("manuf " + event.target.value)   
        await setManuf( event.target.value );
        setLoaded(false)
        const result = await axios(
            `car/getModels?manufacturer=${ event.target.value}`, {
            headers: {
                'x-auth': localStorage.getItem( 'carDealer_X_auth' )
            }
        }
        );
        setLoaded( true )
        console.log( "model types" + result.data );
        await setModelTypes( result.data )
        await setTrimTypes([])
        await setYearTypes([])
        await setModel( '' );
        await setTrim( '' );
        await setYear( '' );
    };
    const handleModelChange = async ( event ) => {
        await setModel( event.target.value );
        setLoaded( false )
        const result = await axios(
            `car/getTrims?manufacturer=${ manuf }&model=${ event.target.value}`, {
            headers: {
                'x-auth': localStorage.getItem( 'carDealer_X_auth' )
            }
        }
        );
        setLoaded( true )
        console.log( "trim types" + result.data );
        await setTrimTypes( result.data )
        await setYearTypes( [] )
        await setTrim( '' );
        await setYear( '' );
    };
    const handleTrimChange = async ( event ) => {
        await setTrim( event.target.value );
        setLoaded( false )
        const result = await axios(
            `car/getYears?manufacturer=${ manuf }&model=${ model }&trim=${ event.target.value}`, {
            headers: {
                'x-auth': localStorage.getItem( 'carDealer_X_auth' )
            }
        }
        );
        setLoaded( true )
        console.log( "year types" +  result.data );
        await setYearTypes( result.data )
        await setYear( '' );        
    };
    const handleYearChange = async ( event ) => {
        await setYear( event.target.value );
        setLoaded( false )
        const result = await axios(
            `car/getBestDeal?manufacturer=${ manuf }&model=${ model }&trim=${ trim }&year=${ event.target.value}`, {
            headers: {
                'x-auth': localStorage.getItem( 'carDealer_X_auth' )
            }
        }
        );
        setLoaded( true )
        setCarCostID(result.data._id);
        console.log( result.data._id);
        await setDeal( { price: result.data.cost,dealer:result.data.dealerName})
    };
    const buyCar = async () => {
        try {
            if ( showSnakBar ) {
                await setShowSnakBar( false );
            }
            let response = await axios.post( '/customer/BuyACar', {
                "carCostID": carCostID
            }, {
                headers: {
                    'x-auth': localStorage.getItem( 'carDealer_X_auth' )
                }
            } )
            if ( response.status === 200 ) {
                setSnakBarMessage( "successfully bought car" )
            } else {
                setSnakBarMessage( "error buying car" )
                setSnakBarVarient( 'error' );
            }
            await setShowSnakBar( true )
        } catch ( e ) {
            console.error( e );
            setSnakBarMessage( "error adding car model" )
            setSnakBarVarient( 'error' );
            await setShowSnakBar( true )
        }
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
                {!loaded?<LinearProgress color="secondary"></LinearProgress>:null}
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
