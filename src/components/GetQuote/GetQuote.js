/*
 * SPDX-License-Identifier: Apache-2.0
 *     _____________  ___  
      / ___/ ___/ _ \/ _ \ 
     (__  ) /  /  __/  __/ 
    /____/_/   \___/\___  
 * File Created: Tuesday, 17th September 2019 1:50:25 pm
 * Author: SreeTeja06 (sreeteja.muthyala@gmail.com)

 */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Grid } from '@material-ui/core'
import { Button } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles( theme => ( {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing( 1 ),
        minWidth: 150,
    },
    selectEmpty: {
        marginTop: theme.spacing( 2 ),
    },
    gridMargin: {
        marginTop: '7%'
    }
} ) );

export default function NativeSelects() {
    const classes = useStyles();
    const [state, setState] = React.useState( {
        manufacturer: 'BMW',
        model: 'S07',
        trim: 'Lxi',
        year: '2007'
    } );

    const inputLabel = React.useRef( null );
    const [labelWidth, setLabelWidth] = React.useState( 0 );
    React.useEffect( () => {
        setLabelWidth( inputLabel.current.offsetWidth );
    }, [] );

    const handleChange = name => event => {
        setState( {
            ...state,
            [name]: event.target.value,
        } );
    };

    const getQuotaButtonClick = (e) => {
        console.log(state)
    }

    const manufacturers = ['manu1', 'manu2', 'manu3', 'manu4'];
    const renderManuList = () => {
        let list = [];
        for ( let i = 0; i < manufacturers.length; i++ ) {
            list.push( <option value={manufacturers[i]}>{manufacturers[i]}</option> )
        }
        return list;
    }

    return (
        <div className={classes.root}>
            <Grid
                className={classes.gridMargin}
                container
                direction="column"
                justify="center"
                alignItems="center">
                    {/* \\\\\\\\\\\\\\\\\\ */}
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel ref={inputLabel} required htmlFor="outlined-age-native-simple">
                        Manufacturer
                </InputLabel>
                    <Select
                        native
                        value={state.manufacturer}
                        onChange={handleChange( 'manufacturer' )}
                        labelWidth={labelWidth}
                        inputProps={{
                            name: 'Manufacturer',
                            id: 'outlined-age-native-simple',
                        }}
                    >
                        <option value="" />
                        {renderManuList()}
                    </Select>
                </FormControl>

                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel ref={inputLabel} required htmlFor="outlined-age-native-simple1">
                        Model
                </InputLabel>
                    <Select
                        native
                        value={state.model}
                        onChange={handleChange( 'model' )}
                        labelWidth={labelWidth}
                        inputProps={{
                            name: 'model',
                            id: 'outlined-age-native-simple1',
                        }}
                    >
                        <option value="" />
                        {renderManuList()}
                    </Select>
                </FormControl>

                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel ref={inputLabel} required htmlFor="outlined-age-native-simple2">
                        Trim
                </InputLabel>
                    <Select
                        native
                        value={state.trim}
                        onChange={handleChange( 'trim' )}
                        labelWidth={labelWidth}
                        inputProps={{
                            name: 'trim',
                            id: 'outlined-age-native-simple2',
                        }}
                    >
                        <option value="" />
                        {renderManuList()}
                    </Select>
                </FormControl>

                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel ref={inputLabel} required htmlFor="outlined-age-native-simple3">
                        Year
                </InputLabel>
                    <Select
                        native
                        value={state.year}
                        onChange={handleChange( 'year' )}
                        labelWidth={labelWidth}
                        inputProps={{
                            name: 'year',
                            id: 'outlined-age-native-simple3',
                        }}
                    >
                        <option value="" />
                        {renderManuList()}
                    </Select>
                </FormControl>
                {/* \\\\\\\\\\\\\\\\\\ */}
                <Button
                    style={{ "backgroundColor": "rgb(25,123,189)", "color": "white", "padding": "10px" }}
                    onClick={e => getQuotaButtonClick( e )}>
                    Get Quote
                    <SendIcon />
                </Button>
            </Grid>
        </div>
    );
}