/*
 * SPDX-License-Identifier: Apache-2.0
 *     _____________  ___  
      / ___/ ___/ _ \/ _ \ 
     (__  ) /  /  __/  __/ 
    /____/_/   \___/\___  
 * File Created: Sunday, 15th September 2019 6:08:42 pm
 * Author: SreeTeja06 (sreeteja.muthyala@gmail.com)

 */
import React from 'react';
import MUIDataTable from "mui-datatables";
import axios from '../../axios'
import SnakBar from '../SnackBar/SnackBar'
import LinearProgress from '@material-ui/core/LinearProgress';

export default function AddCar() {
    const [data, setData] = React.useState( [] );
    const [showSnakBar, setShowSnakBar] = React.useState( false )
    const [snakBarMessage, setSnakBarMessage] = React.useState()
    const [snakBarVarient, setSnakBarVarient] = React.useState( 'success' )
    const [loaded, setLoaded] = React.useState(false);

    React.useEffect( () => {
        const fetchData = async () => {
            try {
                if ( showSnakBar ) {
                    await setShowSnakBar( false );
                }
                const result = await axios(
                    `car/getAllCars`, {
                    headers: {
                        'x-auth': localStorage.getItem( 'carDealer_X_auth' )
                    }
                }
                );
                if(result.status === 200){
                    setData( result.data )
                }else{
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

    const columns = [
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
                filter: false,
                sort: true,
            }
        },
        {
            name: "trim",
            label: "Trim",
            options: {
                filter: false,
                sort: true,
            }
        },
        {
            name: "year",
            label: "Year",
            options: {
                filter: false,
                sort: true,
            }
        },
        {
            name: "Msrp",
            label: "MSRP",
            options: {
                filter: false,
                sort: true,
            }
        }
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