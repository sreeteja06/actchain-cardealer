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
import MUIDataTable from "mui-datatables";
import axios from '../../axios'
import { Button } from '@material-ui/core'
import SnakBar from '../SnackBar/SnackBar'
import LinearProgress from '@material-ui/core/LinearProgress';

export default function GetQuote() {
    const [data, setData] = React.useState( [] );
    const [showSnakBar, setShowSnakBar] = React.useState( false )
    const [snakBarMessage, setSnakBarMessage] = React.useState()
    const [snakBarVarient, setSnakBarVarient] = React.useState( 'success' )
    const [loaded, setLoaded] = React.useState( false );

    React.useEffect( () => {
        const fetchData = async () => {
            try {
                if ( showSnakBar ) {
                    await setShowSnakBar( false );
                }
                const result = await axios(
                    `customer/getQuotableCars`, {
                    headers: {
                        'x-auth': localStorage.getItem( 'carDealer_X_auth' )
                    }
                }
                );
                if ( result.status === 200 ) {
                    setData( result.data )
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

    const getQuote = async ( e ) => {
        try {
            if ( showSnakBar ) {
                await setShowSnakBar( false );
            }
            let result = await axios.post( '/customer/requestACar', {
                carID: e[0]
            }, {
                headers: {
                    'x-auth': localStorage.getItem( 'carDealer_X_auth' )
                }
            } )
            if ( result.status !== 200 ){
                setSnakBarMessage( "error asking quote" )
                setSnakBarVarient( 'error' );
                setShowSnakBar( true )
            } else{
                setSnakBarMessage( "success asking quote" )
                setSnakBarVarient( 'success' );
                setShowSnakBar( true )
            }
            const result1 = await axios(
                `customer/getQuotableCars`, {
                headers: {
                    'x-auth': localStorage.getItem( 'carDealer_X_auth' )
                }
            }
            );
            if ( result1.status === 200 ) {
                setData( result1.data )
            }
        } catch ( e ) {
            setSnakBarMessage( "error asking quote" )
            setSnakBarVarient( 'error' );
            setShowSnakBar( true )
            setLoaded( true )
        }
    }

    const columns = [
        {
            name: "_id",
            label: "Car ID",
            options: {
                filter: true,
                sort: true,
                display: false
            }
        },
        {
            name: "manufacturer",
            label: "Manufacturer",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "model",
            label: "Model",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "trim",
            label: "Trim",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "year",
            label: "Year",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Msrp",
            label: "MSRP",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "quotable",
            label: "quotable",
            options: {
                filter: true,
                sort: true,
                display: false
            }
        },
        {
            name: "GetQuote",
            label: "Get Quote",
            options: {
                filter: false,
                sort: false,
                customBodyRender: ( value, tableMeta, updateValue ) => {
                    let styleObj;
                    if ( !tableMeta.rowData[6] ){
                        styleObj = { "backgroundColor": "grey", "color": "white" }
                    }else {
                        styleObj = { "backgroundColor": "rgb(25,123,189)", "color": "white" }
                    }
                    return (
                        <Button
                            style={styleObj}
                            onClick={e => getQuote( tableMeta.rowData )}
                            disabled={!tableMeta.rowData[6]}>
                            Get Quote
                        </Button>
                    );
                }
            }
        },
    ];

    const options = {
        filterType: 'checkbox',
        selectableRows: 'none',
        responsive: 'scrollFullHeight',
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 20, 30, 50, 100]
    };

    return (
        <div>
            {!loaded
                ? <LinearProgress color="secondary" />
                :
                <MUIDataTable
                    data={data}
                    columns={columns}
                    options={options}
                />}
            {showSnakBar ? <SnakBar message={snakBarMessage} variant={snakBarVarient} className={{
                "margin": "theme.spacing( 1 )"
            }}></SnakBar> : null}
        </div>
    )
}