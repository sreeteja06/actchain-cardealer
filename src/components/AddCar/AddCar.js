/*
 * SPDX-License-Identifier: Apache-2.0
 *     _____________  ___  
      / ___/ ___/ _ \/ _ \ 
     (__  ) /  /  __/  __/ 
    /____/_/   \___/\___  
 * File Created: Monday, 16th September 2019 2:29:12 pm
 * Author: SreeTeja06 (sreeteja.muthyala@gmail.com)

 */
import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core'
import { Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/AddOutlined';
import axios from '../../axios';
import SnakBar from '../SnackBar/SnackBar'

const useStyles = makeStyles( theme => ( {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing( 1 )
    },
    gridMargin: {
        marginTop: '7%'
    }
} ) );

const ValidationTextField = withStyles( {
    root: {
        '& input:valid + fieldset': {
            borderColor: 'green',
            borderWidth: 2,
        },
        '& input:invalid + fieldset': {
            borderColor: 'red',
            borderWidth: 2,
        },
        '& input:valid:focus + fieldset': {
            borderLeftWidth: 6,
            padding: '4px !important', // override inline-style
        },
    },
} )( TextField );

let car = {
    manufacturer: 'BMW',
    model: 'S07',
    trim: 'Lxi',
    year: '2007',
    msrp: '20000'
}


export default function AddCar() {
    const classes = useStyles();
    const [showSnakBar, setShowSnakBar] = React.useState( false )
    const [snakBarMessage, setSnakBarMessage] = React.useState()
    const [snakBarVarient, setSnakBarVarient] = React.useState( 'success' )
    
    const addCarButtonClick = async () => {
        try{
        if ( showSnakBar ) {
            await setShowSnakBar( false );
        }
        let response = await axios.post( '/car/createCar', {
            "manufacturer": car.manufacturer,
            "model": car.model,
            "trim": car.trim,
            "year": car.year,
            "Msrp": car.msrp
        }, {
            headers: {
                'x-auth': localStorage.getItem( 'carDealer_X_auth' )
            }
        } )
        if ( response.status === 200 ){
            setSnakBarMessage( "successfully added car model" )
        }else{
            setSnakBarMessage( "error adding car model" )
            setSnakBarVarient('error');
        }
        await setShowSnakBar(true)
        }catch(e){
            console.error(e);
            setSnakBarMessage( "error adding car model" )
            setSnakBarVarient( 'error' );
            await setShowSnakBar( true )
        }
    }

    const onChangeManu = ( value, type ) => {
        car[type] = value
    }

    return (
        <form className={classes.root} noValidate>
            <Grid
                className={classes.gridMargin}
                container
                direction="column"
                justify="center"
                alignItems="center">
                <ValidationTextField
                    className={classes.margin}
                    label="Manufacturer"
                    required
                    variant="outlined"
                    defaultValue="BMW"
                    id="Manufacturer"
                    onChange={e => onChangeManu( e.target.value, "manufacturer" )}
                />
                <ValidationTextField
                    className={classes.margin}
                    label="Model"
                    required
                    variant="outlined"
                    defaultValue="S07"
                    id="Model"
                    onChange={e => onChangeManu( e.target.value, "model" )}
                />
                <ValidationTextField
                    className={classes.margin}
                    label="Trim"
                    required
                    variant="outlined"
                    defaultValue="Lxi"
                    id="Trim"
                    onChange={e => onChangeManu( e.target.value, "trim" )}
                />
                <ValidationTextField
                    className={classes.margin}
                    label="Year"
                    required
                    variant="outlined"
                    defaultValue="2007"
                    id="Year"
                    onChange={e => onChangeManu( e.target.value, "year" )}
                />
                <ValidationTextField
                    className={classes.margin}
                    label="MSRP"
                    required
                    variant="outlined"
                    defaultValue="20000"
                    id="MSRP"
                    onChange={e => onChangeManu( e.target.value, "msrp" )}
                />
                <Button
                    style={{ "backgroundColor": "rgb(25,123,189)", "color": "white", "padding": "10px" }}
                    onClick={e => addCarButtonClick( e )}>
                    Add Car
                    <AddIcon />
                </Button>
            </Grid>
            {showSnakBar ? <SnakBar message={snakBarMessage} variant={snakBarVarient} className={classes.margin}></SnakBar> : null}
        </form>
    );
}