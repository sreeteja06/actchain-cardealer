/*
 * SPDX-License-Identifier: Apache-2.0
 *     _____________  ___  
      / ___/ ___/ _ \/ _ \ 
     (__  ) /  /  __/  __/ 
    /____/_/   \___/\___  
 * File Created: Wednesday, 18th September 2019 9:48:56 pm
 * Author: SreeTeja06 (sreeteja.muthyala@gmail.com)

 */
import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core'
import { Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/AddOutlined';
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
    manufacturer: 'BMW'
}

const onChangeManu = ( value, type ) => {
    car[type] = value
}


export default function AddCar() {
    const classes = useStyles();
    const [showSnakBar, setShowSnakBar] = React.useState(false)
    const [snakBarMessage, setSnakBarMessage] = React.useState()
    const [snakBarVarient, setSnakBarVarient] = React.useState('success')

    const addCarButtonClick = async (e) => {
        setSnakBarMessage("successfully subscribed to car manufacturer")
        if(showSnakBar){
            await setShowSnakBar( false );
        }
        console.log( car )
        await setShowSnakBar(true);
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
                <Button
                    style={{ "backgroundColor": "rgb(25,123,189)", "color": "white", "padding": "10px" }}
                    onClick={e => addCarButtonClick( e )}>
                    Subscribe to manufacturer
                    <AddIcon />
                </Button>
            </Grid>
            {showSnakBar ? <SnakBar message={snakBarMessage} variant={snakBarVarient} className={classes.margin}></SnakBar>:null}
        </form>
    );
}