/*
 * SPDX-License-Identifier: Apache-2.0
 *     _____________  ___  
      / ___/ ___/ _ \/ _ \ 
     (__  ) /  /  __/  __/ 
    /____/_/   \___/\___  
 * File Created: Sunday, 15th September 2019 5:44:25 pm
 * Author: SreeTeja06 (sreeteja.muthyala@gmail.com)

 */
/*
 * SPDX-License-Identifier: Apache-2.0
 *     _____________  ___  
      / ___/ ___/ _ \/ _ \ 
     (__  ) /  /  __/  __/ 
    /____/_/   \___/\___  
 * File Created: Monday, 16th September 2019 2:29:12 pm
 * Author: SreeTeja06 (sreeteja.muthyala@gmail.com)

 */
import React from 'react';
import MUIDataTable from "mui-datatables";
import { Button } from '@material-ui/core'


const QuotePrice = ( e ) => {
    console.log( e )
}

export default function addCar() {

    const columns = [
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
                sort: false,
            }
        },
        {
            name: "type",
            label: "Type",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "year",
            label: "Year",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "lowestdeal",
            label: "Lowestdeal",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "yourdeal",
            label: "Your Deal",
            options: {
                filter: true,
                sort: false,
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
                            onClick={e => QuotePrice( tableMeta )}>
                            Quote Price
                        </Button>
                    );
                }
            }
        },
    ];

    function createData( name, manufacturer, type, year, yourdeal, lowestdeal ) {
        return { name, manufacturer, type, year, yourdeal, lowestdeal };
    }

    const data = [
        createData( 'Cupcake', "Audi", "LXI", 2019, 4.3, 4.2 ),
        createData( 'Donut', "Benz", "VDI", 2015, 4.9, 4.9 ),
        createData( 'Eclair', "Ferrari", "XR", 1992, 6.0, 5.3 ),
        createData( 'Frozen yoghurt', "Lambo", "PRO", 2014, 4.0, 4.0 ),
        createData( 'Gingerbread', "HG", 16.0, 1999, 3.9, 3 ),
        createData( 'Honeycomb', "VW", 3.2, 2000, 6.5, 6.5 ),
        createData( 'Ice cream sandwich', "BMW", 9.0, 2004, 4.3, 4.3 ),
        createData( 'Jelly Bean', "Bugati", 0.0, 1996, 0.0, 0.0 ),
        createData( 'KitKat', "Skoda", 26.0, 2012, 7.0, 7.0 ),
        createData( 'Lollipop', "Yamaha", 0.2, 2010, 2.0, 1.8 ),
        createData( 'Marshmallow', "Astro Martin", 0, 2016, 2.0, 1.7 ),
        createData( 'Nougat', "KIA", 19.0, 1991, 37.0, 33.0 ),
        createData( 'Oreo', "Ford", 18.0, 1993, 4.0, 3.9 ),
    ];

    const options = {
        filterType: 'checkbox',
        selectableRows: 'none',
        responsive: 'scrollFullHeight',
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 20, 30, 50, 100]
    };

    return (
        <MUIDataTable
            data={data}
            columns={columns}
            options={options}
        />
    )
}