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
        }
    ];

    function createData( name, manufacturer, type, year ) {
        return { name, manufacturer, type, year };
    }

    const data = [
        createData( 'Cupcake', "Audi", "LXI", 2019 ),
        createData( 'Donut', "Benz", "VDI", 2015 ),
        createData( 'Eclair', "Ferrari", "XR", 1992 ),
        createData( 'Frozen yoghurt', "Lambo", "PRO", 2014 ),
        createData( 'Gingerbread', "HG", 16.0, 1999 ),
        createData( 'Honeycomb', "VW", 3.2, 2000 ),
        createData( 'Ice cream sandwich', "BMW", 9.0, 2004 ),
        createData( 'Jelly Bean', "Bugati", 0.0, 1996 ),
        createData( 'KitKat', "Skoda", 26.0, 2012 ),
        createData( 'Lollipop', "Yamaha", 0.2, 2010 ),
        createData( 'Marshmallow', "Astro Martin", 0, 2016 ),
        createData( 'Nougat', "KIA", 19.0, 1991 ),
        createData( 'Oreo', "Ford", 18.0, 1993 ),
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