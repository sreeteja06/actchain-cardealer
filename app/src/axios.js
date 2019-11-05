/*
 * SPDX-License-Identifier: Apache-2.0
 *     _____________  ___  
      / ___/ ___/ _ \/ _ \ 
     (__  ) /  /  __/  __/ 
    /____/_/   \___/\___  
 * File Created: Thursday, 19th September 2019 10:34:18 am
 * Author: SreeTeja06 (sreeteja.muthyala@gmail.com)

 */
import axios from 'axios';
export default axios.create( {
    baseURL: '/api',
    //baseURL: 'http://ec2-18-223-209-42.us-east-2.compute.amazonaws.com:4003/',
    // timeout: 1000,
} );