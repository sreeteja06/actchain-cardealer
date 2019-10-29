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
    const [age, setAge] = React.useState( '' );
    const handleChange = event => {
        setAge( event.target.value );
    };
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
                        value={age}
                        onChange={handleChange}
                        input={<BootstrapInput />}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <InputLabel id="demo-customized-select-label">Select Model</InputLabel>
                <FormControl className={classes.margin}>
                    <Select
                        style={{ width: "300px" }}
                        labelId="demo-customized-select-label"
                        id="demo-customized-select"
                        value={age}
                        onChange={handleChange}
                        input={<BootstrapInput />}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <InputLabel id="demo-customized-select-label">Select Trim</InputLabel>
                <FormControl className={classes.margin}>
                    <Select
                        style={{ width: "300px" }}
                        labelId="demo-customized-select-label"
                        id="demo-customized-select"
                        value={age}
                        onChange={handleChange}
                        input={<BootstrapInput />}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <InputLabel id="demo-customized-select-label">Select Year</InputLabel>
                <FormControl className={classes.margin}>
                    <Select
                        style={{ width: "300px" }}
                        labelId="demo-customized-select-label"
                        id="demo-customized-select"
                        value={age}
                        onChange={handleChange}
                        input={<BootstrapInput />}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <Typography style={{ "marginTop": "10px" }}>Lowest Dealer Price: 10000</Typography>
                <Typography style={{ "marginTop": "10px" }}>Dealer Name: Dealer 1</Typography>
                <Button
                    style={{ "backgroundColor": "#70b359", "color": "white", "padding": "10px", "marginTop": "30px" }}
                    // onClick={e => addCarButtonClick( e )}
                    >
                    Buy Car
                    <AddIcon />
                </Button>
            </Grid>
        </div>
    );
}
