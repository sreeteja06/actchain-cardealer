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

export default function addCar() {

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
        }
    ];

    function createData( model, manufacturer, trim, year, MSRP ) {
        return { model, manufacturer, trim, year, MSRP };
    }

    const data = [
        createData( 'Cupcake', "Audi", "LXI", 2019, 5.3 ),
        createData( 'Donut', "Benz", "VDI", 2015, 5.3 ),
        createData( 'Eclair', "Ferrari", "XR", 1992, 5.3 ),
        createData( 'Frozen yoghurt', "Lambo", "PRO", 2014, 5.3 ),
        createData( 'Gingerbread', "HG", 16.0, 1999, 5.3 ),
        createData( 'Honeycomb', "VW", 3.2, 2000, 5.3 ),
        createData( 'Ice cream sandwich', "BMW", 9.0, 2004, 5.3 ),
        createData( 'Jelly Bean', "Bugati", 0.0, 1996, 5.3 ),
        createData( 'KitKat', "Skoda", 26.0, 2012, 5.3 ),
        createData( 'Lollipop', "Yamaha", 0.2, 2010, 5.3 ),
        createData( 'Marshmallow', "Astro Martin", 0, 2016, 5.3 ),
        createData( 'Nougat', "KIA", 19.0, 1991, 5.3 ),
        createData( 'Oreo', "Ford", 18.0, 1993, 5.3 ),
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