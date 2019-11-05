/*
 * SPDX-License-Identifier: Apache-2.0
 *     _____________  ___  
      / ___/ ___/ _ \/ _ \ 
     (__  ) /  /  __/  __/ 
    /____/_/   \___/\___  
 * File Created: Tuesday, 17th September 2019 4:25:02 pm
 * Author: SreeTeja06 (sreeteja.muthyala@gmail.com)

 */
import React from 'react';
import MUIDataTable from "mui-datatables";
import { Button } from '@material-ui/core'
import SnakBar from '../SnackBar/SnackBar'
import axios from '../../axios'
import LinearProgress from '@material-ui/core/LinearProgress';

const BuyerTable = (props) => {
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
                    `customer/requestedCars`, {
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

    const AcceptDiscount = async ( value ) => {
        try{
            if(showSnakBar){
                await setShowSnakBar( false )
            }
            if(!value[6]){
                setSnakBarMessage( "Theres no deal to accept" )
                setSnakBarVarient( 'error' );
                await setShowSnakBar( true )
                return 
            }
            let result = await axios.post( '/customer/acceptDeal', {
                requestID: value[0],
            }, {
                headers: {
                    'x-auth': localStorage.getItem( 'carDealer_X_auth' )
                }
            } )
            if ( result.status === 200 ) {
                setSnakBarMessage( "successfully accepted deal" )
            }
            else {
                setSnakBarMessage( "error accepting deal" )
                setSnakBarVarient( 'error' );
            }
            await setShowSnakBar( true )
            const result2 = await axios(
                `customer/requestedCars`, {
                headers: {
                    'x-auth': localStorage.getItem( 'carDealer_X_auth' )
                }
            }
            );
            if ( result2.status === 200 ) {
                setData( result.data )
            }
        }catch(e){
            console.error( e );
            setSnakBarMessage( "error accepting deal" )
            setSnakBarVarient( 'error' );
            await setShowSnakBar( true )
        }
    }
    const columns = [
        {
            name: "requestID",
            label: "requestID",
            options: {
                filter: false,
                sort: false,
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
            name: "discount",
            label: "Quote%",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "dealerName",
            label: "Quote By",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Accept Deal",
            label: "Accept Deal",
            options: {
                filter: false,
                sort: false,
                customBodyRender: ( value, tableMeta, updateValue ) => {
                    return (
                      <Button
                        style={{ backgroundColor: "#70b359", color: "white" }}
                        onClick={e => AcceptDiscount(tableMeta.rowData)}
                      >
                        Accept Deal
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

export default BuyerTable