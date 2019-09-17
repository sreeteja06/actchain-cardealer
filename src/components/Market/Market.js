/*
 * SPDX-License-Identifier: Apache-2.0
 *     _____________  ___  
      / ___/ ___/ _ \/ _ \ 
     (__  ) /  /  __/  __/ 
    /____/_/   \___/\___  
 * File Created: Sunday, 15th September 2019 5:44:43 pm
 * Author: SreeTeja06 (sreeteja.muthyala@gmail.com)

 */
import React from 'react';
import MUIDataTable from "mui-datatables";
import { Button } from '@material-ui/core'
import QuoteDialog from '../QuoteDialog/QuoteDialog';


const Market = () => {
    const [open, setOpen] = React.useState( false );
    const [dialogProps, setDialogProps] = React.useState( {
        name: "",
        manufacturer: "",
        model:"",
        trim: "",
        year: "",
        MSRP: ""
    } )
    const QuotePrice = ( e ) => {
        console.log( e )
        setOpen(true);
        setDialogProps({
            name: e[1],
            manufacturer: e[2],
            model: e[3],
            trim: e[4],
            year: e[5],
            MSRP: e[6]
        })
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
            name: "name",
            label: "Name",
            options: {
                filter: true,
                sort: true,
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
            name: "MSRP",
            label: "MSRP",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "rank",
            label: "Rank",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Quote Price",
            label: "QuotePrice",
            options: {
                filter: false,
                sort: false,
                customBodyRender: ( value, tableMeta, updateValue ) => {
                    return (
                        <Button
                            style={{ "backgroundColor": "rgb(25,123,189)", "color": "white" }}
                            onClick={e => QuotePrice( tableMeta.rowData )}>
                            Quote Price
                        </Button>
                    );
                }
            }
        },
    ];

    function createData( name, manufacturer,model, trim, year, MSRP ) {
        return { name, manufacturer,model, trim, year, MSRP };
    }

    const data = [
        createData( 'Customer1', "Audi","model1", "LXI", 2019, 4.3 ),
        createData( 'Customer2', "Benz", "model1", "VDI", 2015, 4.9 ),
        createData( 'Customer13', "Ferrari", "model1", "XR", 1992, 6.0 ),
        createData( 'Customer5', "Lambo", "model1", "PRO", 2014, 4.0 ),
        createData( 'Customer6', "HG", "model1", 16.0, 1999, 3.9 ),
        createData( 'Customer8', "VW", "model1", 3.2, 2000, 6.5 ),
        createData( 'Customer15', "BMW", "model1", 9.0, 2004, 4.3 ),
        createData( 'Customer10', "Bugati", "model1", 0.0, 1996, 0.0 ),
        createData( 'Customer21', "Skoda", "model1", 26.0, 2012, 7.0 ),
        createData( 'Customer19', "Yamaha", "model1", 0.2, 2010, 2.0 ),
        createData( 'Customer22', "Astro Martin", "model1", 0, 2016, 2.0 ),
        createData( 'Customer17', "KIA", "model1", 19.0, 1991, 37.0 ),
        createData( 'Customer1', "Ford", "model1", 18.0, 1993, 4.0 ),
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
        <MUIDataTable
            data={data}
            columns={columns}
            options={options}
        />
        <QuoteDialog open={open} setOpen={setOpen} values={dialogProps}></QuoteDialog>
        </div>
    )
}

export default Market