/*
 * SPDX-License-Identifier: Apache-2.0
 *     _____________  ___  
      / ___/ ___/ _ \/ _ \ 
     (__  ) /  /  __/  __/ 
    /____/_/   \___/\___  
 * File Created: Thursday, 10th October 2019 4:24:05 pm
 * Author: SreeTeja06 (sreeteja.muthyala@gmail.com)

 */
const axios = require( 'axios' );

var XLSX = require( 'xlsx' )

let main = async () => {
   var workbook = XLSX.readFile( 'dataSet.xlsx' );
   var sheet_name_list = workbook.SheetNames;
   var xlData = XLSX.utils.sheet_to_json( workbook.Sheets[sheet_name_list[0]] );
   let count = 0
   for ( let i = 1; i < xlData.length; i++ ) {
      let car = {
         manufacturer: xlData[i].B,
         model: xlData[i].B_1,
         trim: xlData[i].B_3,
         year: xlData[i].B_2,
         msrp: xlData[i].B_4
      }
      try {
         let response = await axios.post( 'http://ec2-18-223-209-42.us-east-2.compute.amazonaws.com:4003/car/createCar', {
            "manufacturer": car.manufacturer,
            "model": car.model,
            "trim": car.trim,
            "year": car.year,
            "Msrp": car.msrp
         }, {
            headers: {
               'x-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDg5ZTAyZTY3M2RhZDAwMWFmOWJhZDAiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTY5MzE5NjQ0fQ.up-LjZNoDR280WgE3sZ3SSlQ9zKmKaEXiq4QGoDgj_E'
            }
         } )
         if ( response.status === 200 ) {
            count++;
         } else {
            console.log( 'nope' )
         }
      } catch ( e ) {
         console.error( e );
      }
   }
   console.log( count );
}

main();