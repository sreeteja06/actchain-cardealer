/*
 * SPDX-License-Identifier: Apache-2.0
 *     _____________  ___  
      / ___/ ___/ _ \/ _ \ 
     (__  ) /  /  __/  __/ 
    /____/_/   \___/\___  
 * File Created: Sunday, 15th September 2019 7:57:56 am
 * Author: SreeTeja06 (sreeteja.muthyala@gmail.com)

 */
import React, { Component } from 'react';
import Card from '../../components/Cards/Card'
import { Redirect } from 'react-router-dom'
// import axios from 'axios'
import Layout from '../../Layout/Layout';

class LoginContainer extends Component {
    state = {
        label: 'Something',
        header: 'Header',
        email: '',
        password: '',
        redirect: false,
        firstname: '',
        lastname: '',
        phone: ''
    }
    orgUsername = '';
    organization = '';

    SignupHandler = async ( e ) => {
        e.preventDefault()
        console.log( `${JSON.stringify(this.state)}` )
        // let response = await axios.post( "http://ec2-18-223-209-42.us-east-2.compute.amazonaws.com/users/login", {
        //     email: this.state.username,
        //     password: this.state.password
        // } )
        // this.orgUsername = response.data[0].productdata[0].roles[0].username;
        // this.organization = response.data[0].productdata[0].roles[0].organization;
        // this.setState( {
        //     redirect: true
        // } )
    }

    getEmail = ( e ) => {
        this.setState( {
            email: e.target.value
        } )
    }

    getPassword = ( e ) => {
        this.setState( {
            password: e.target.value
        } )
    }

    getFirstName = ( e ) => {
        this.setState( {
            firstname: e.target.value
        } )
    }

    getLastName = ( e ) => {
        this.setState( {
            lastname: e.target.value
        } )
    }

    getPhone = ( e ) => {
        this.setState( {
            phone: e.target.value
        } )
    }

    render() {
        if ( this.state.redirect ) {
            console.log( 'redirecting' );
            return <Redirect
                to={{
                    pathname: "/dashboard",
                    state: {
                        username: this.orgUsername,
                        organization: this.organization
                    }
                }}
            />
        }
        return (
            <div>
                <Layout>
                    <Card label={this.state.label}
                        type="signup"
                        signup={this.SignupHandler}
                        firstname={this.getFirstName}
                        lastname={this.getLastName}
                        phone={this.getPhone}
                        email={this.getEmail}
                        password={this.getPassword} />
                </Layout>
            </div>
        );
    }
}

export default LoginContainer;