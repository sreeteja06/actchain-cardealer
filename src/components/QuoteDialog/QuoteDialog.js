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

export default function FormDialog( props ) {

    // const handleClickOpen = () => {
    //     setOpen( true );
    // };

    const handleCancel = () => {
        props.setOpen( false );
    };
    const handleSubmit = () => {
        props.setOpen( false );
    };
    console.log( props.values );

    return (
        <div>
            <Dialog open={props.open} onClose={handleCancel} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Quote Your Price</DialogTitle>
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
                        id="price"
                        label="Quote Price"
                        type="text"
                        fullWidth
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
        </div>
    );
}