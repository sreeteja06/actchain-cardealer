/*
 * SPDX-License-Identifier: Apache-2.0
 *     _____________  ___  
      / ___/ ___/ _ \/ _ \ 
     (__  ) /  /  __/  __/ 
    /____/_/   \___/\___  
 * File Created: Saturday, 14th September 2019 10:33:42 pm
 * Author: SreeTeja06 (sreeteja.muthyala@gmail.com)

 */
const SendOtp = require( 'sendotp-promise' );
const MSG91_AUTH_KEY = 'your auth key here';
const MSG91_SENDER_ID = 'your sender id of 6 characters';

// new instance of SendOTP
const sendOtp = new SendOtp( MSG91_AUTH_KEY );

// set the expiry for your OTP
sendOtp.setOtpExpiry( '60' );

const sendOtpToMobile = async ( mobileNumber ) => {
    try {
        // call the send() method
        const response = await sendOtp.send( mobileNumber, MSG91_SENDER_ID );
        console.log( response );
        if ( response.type === 'success' ) {
            return console.log( 'OTP code sent' );
        }

        return console.log( 'Failed to sent OTP' );
    } catch ( err ) {
        console.error( err );
        return console.log( 'Something went wrong' );
    }
};

// the mobile number
const countryCode = '91';
const mobileNumber = '8143434304';
const completeMobileNumber = `${ countryCode }${ mobileNumber }`;

// call 
sendOtpToMobile( completeMobileNumber );