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
import axios from '../../axios'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    },
    paperroot: {
        padding: theme.spacing( 2, 2 ),
        marginLeft: "50px",
        marginRight: "50px",
        marginTop: "20px"
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
    }
} )( TextField );

let car = {
    manufacturer: 'BMW'
}

const onChangeManu = ( value, type ) => {
    car[type] = value
}


export default function Subscribe() {
    const classes = useStyles();
    const [subscriptions, setSubscriptions] = React.useState( [] );
    const [showSnakBar, setShowSnakBar] = React.useState( false )
    const [snakBarMessage, setSnakBarMessage] = React.useState()
    const [snakBarVarient, setSnakBarVarient] = React.useState( 'success' )
    const [loaded, setLoaded] = React.useState(false)

    React.useEffect( () => {
        const fetchData = async () => {
            try {
                if ( showSnakBar ) {
                    await setShowSnakBar( false );
                }
                const result = await axios(
                    `dealer/subscriptions`, {
                    headers: {
                        'x-auth': localStorage.getItem( 'carDealer_X_auth' )
                    }
                }
                );
                if ( result.status === 200 ) {
                    setSubscriptions( result.data )
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
            setLoaded(true)
        };
        fetchData();
    }, [] );

    const showSubscriptions = () => {
        let manu = [];
        for ( let i = 0; i < subscriptions.length; i++ ) {
            manu.push(
                <Paper className={classes.paperroot}>
                    <Typography variant="h5" component="h3">
                        {subscriptions[i]}
                    </Typography>
                </Paper>
            )
        }
        return manu;
    }

    const addCarButtonClick = async ( e ) => {
        try {
            if ( showSnakBar ) {
                await setShowSnakBar( false );
            }
            let result = await axios.post( '/dealer/addSubscription', {
                subscribe: car.manufacturer
            }, {
                headers: {
                    'x-auth': localStorage.getItem( 'carDealer_X_auth' )
                }
            } )
            if ( result.status === 200 ) {
                setSnakBarMessage( "successfully subscribed to " + car.manufacturer )
            }
            else {
                setSnakBarMessage( "error subscribing to " + car.manufacturer )
                setSnakBarVarient( 'error' );
            }
            await setShowSnakBar( true )
        } catch ( e ) {
            console.error( e );
            setSnakBarMessage( "error subscribing to " + car.manufacturer )
            setSnakBarVarient( 'error' );
            await setShowSnakBar( true )
        }
    }

    return (
      <form className={classes.root} noValidate>
        <Grid
          className={classes.gridMargin}
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <ValidationTextField
            className={classes.margin}
            label="Manufacturer"
            required
            variant="outlined"
            defaultValue="BMW"
            id="Manufacturer"
            onChange={e => onChangeManu(e.target.value, "manufacturer")}
          />
          <Button
            style={{
              backgroundColor: "#70b359",
              color: "white",
              padding: "10px"
            }}
            onClick={e => addCarButtonClick(e)}
          >
            Subscribe to manufacturer
            <AddIcon />
          </Button>
        </Grid>
        <Grid
          className={classes.gridMargin}
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Typography variant="h5" component="h3">
            Dealer Subscriptions
          </Typography>
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center">
          {!loaded ? (
            <CircularProgress className={classes.progress} color="secondary" />
          ) : (
            showSubscriptions()
          )}
        </Grid>
        {showSnakBar ? (
          <SnakBar
            message={snakBarMessage}
            variant={snakBarVarient}
            className={classes.margin}
          ></SnakBar>
        ) : null}
      </form>
    );
}