/*
 * SPDX-License-Identifier: Apache-2.0
 *     _____________  ___  
      / ___/ ___/ _ \/ _ \ 
     (__  ) /  /  __/  __/ 
    /____/_/   \___/\___  
 * File Created: Tuesday, 17th September 2019 2:53:48 pm
 * Author: SreeTeja06 (sreeteja.muthyala@gmail.com)

 */
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from '../../axios'
import SnakBar from '../SnackBar/SnackBar'

export default function FormDialog( props ) {
    const [validationError, setValidationError] = React.useState( true );
    const [showSnakBar, setShowSnakBar] = React.useState( false )
    const [snakBarMessage, setSnakBarMessage] = React.useState()
    const [snakBarVarient, setSnakBarVarient] = React.useState( 'success' )
    const [value, setValue] = React.useState()
    // const handleClickOpen = () => {
    //     setOpen( true );
    // };
    const handleCancel = () => {
        props.setOpen( false );
    };
    const handleSubmit = async () => {
        try {
            if ( showSnakBar ) {
                await setShowSnakBar( false );
            }
            if ( validationError ) {
                setSnakBarVarient( 'warning' )
                setSnakBarMessage( "only supported upto 1 decimals" )
                await setShowSnakBar( true );
            }
            if ( !validationError ) {
                let result = await axios.post( '/dealer/quoteDiscount', {
                    requestID: props.values.requestID,
                    Pricequote: value
                }, {
                    headers: {
                        'x-auth': localStorage.getItem( 'carDealer_X_auth' )
                    }
                } )
                if ( result.status === 200 ) {
                    setSnakBarVarient( 'success' );
                    setSnakBarMessage( "successfully quoted discount" )
                    props.refreshMarket();
                }
                else {
                    setSnakBarMessage( "error quoting discount" )
                    setSnakBarVarient( 'error' );
                }
                await setShowSnakBar( true )
                props.setOpen( false );
            }
        } catch ( e ) {
            console.error( e );
            setSnakBarMessage( "error quoting discount" )
            setSnakBarVarient( 'error' );
            await setShowSnakBar( true )
        }
    };

    var countDecimals = function ( value1 ) {
        if ( Math.floor( value1 ) === value1 ) return 0;
        return value1.toString().split( "." )[1].length || 0;
    }

    const inputHandler = event => {
        let tempValue
        if ( event.target.value.length === 0 ) {
            setValidationError( true )
            return 0;
        }
        tempValue = parseFloat( event.target.value );
        if ( countDecimals( tempValue ) > 1 ) {
            setValidationError( true )
        } else if ( countDecimals( tempValue ) <= 1 ) {
            setValidationError( false )
        }
        if ( tempValue > 100 ) {
            setValidationError( true )
        }
        if ( !tempValue){
            setValidationError( true )
        }
        setValue(tempValue)
    }

    // VBA script

    return (
        <div>
            <Dialog open={props.open} onClose={handleCancel} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Quote Your Discount</DialogTitle>
                <DialogContent>
                    Name:<h6>{props.values.name}</h6>
                    Manufacturer:<h6>{props.values.manufacturer}</h6>
                    Model:<h6>{props.values.model}</h6>
                    Trim:<h6>{props.values.trim}</h6>
                    Year:<h6>{props.values.year}</h6>
                    MSRP:<h6>{props.values.MSRP}</h6>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="discount"
                        label="Quote Discount"
                        type="number"
                        fullWidth
                        error={validationError}
                        onChange={e => inputHandler( e )}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                        Cancel
          </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Submit
          </Button>
                </DialogActions>
            </Dialog>
            {showSnakBar ? <SnakBar message={snakBarMessage} variant={snakBarVarient} className={{
                "margin": "theme.spacing( 1 )"
            }}></SnakBar> : null}
        </div>
    );
}