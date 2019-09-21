/*
 * SPDX-License-Identifier: Apache-2.0
 *     _____________  ___  
      / ___/ ___/ _ \/ _ \ 
     (__  ) /  /  __/  __/ 
    /____/_/   \___/\___  
 * File Created: Saturday, 21st September 2019 12:08:47 pm
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
    const [showSnakBar, setShowSnakBar] = React.useState( false )
    const [snakBarMessage, setSnakBarMessage] = React.useState()
    const [snakBarVarient, setSnakBarVarient] = React.useState( 'success' )
    // const handleClickOpen = () => {
    //     setOpen( true );
    // };
    const handleCancel = () => {
        props.setOpen( false );
    };
    let value;
    let pass;
    const handleSubmit = async () => {
        try {
            if ( showSnakBar ) {
                await setShowSnakBar( false );
            }
            let response = await axios.post( '/users/verify', {
                tempuserID: localStorage.getItem('carDealer_userid'),
                OTP: value,
                password: pass
            } )
            if ( response.status === 200 ) {
                localStorage.setItem( 'carDealer_X_auth', response.data.user.tokens[response.data.user.tokens.length - 1].token )
                localStorage.setItem( 'carDealer_userid', response.data.user._id )
                props.verified(response.data.user.role);
            }
            else {
                setSnakBarMessage( "error Verifying" )
                setSnakBarVarient( 'error' );
            }
            props.setOpen( false );
        } catch ( e ) {
            console.error( e );
            setSnakBarMessage( "error Verifying" )
            setSnakBarVarient( 'error' );
            await setShowSnakBar( true )
        }
    };


    const inputHandler = event => {
        value = parseInt( event.target.value );
    }

    const inputHandlerPass = event => {
        pass = parseInt( event.target.value );
    }

    // VBA script

    return (
        <div>
            <Dialog open={props.open} onClose={handleCancel} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Verify With OTP</DialogTitle>
                <DialogContent>
                    Verify your EMAIL/PHONE by entering the OTP which is sent to your EMAIL and PHONE
                    <TextField
                        autoFocus
                        margin="dense"
                        id="OTP"
                        label="OTP"
                        type="number"
                        fullWidth
                        onChange={e => inputHandler( e )}
                    />
                    Verify Password
                    <TextField
                        autoFocus
                        margin="dense"
                        id="password"
                        label="password"
                        type="password"
                        fullWidth
                        onChange={e => inputHandlerPass( e )}
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