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
import axios from '../../axios'
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
        phone: '',
        ID: '',
        type: 'Buyer'
    }

    SignupHandler = async ( e ) => {
        e.preventDefault()
        // console.log( `${JSON.stringify(this.state)}` )
        let response = await axios.post( "users", {
            "email": this.state.email,
            "password": this.state.password,
            "role": this.state.type,
            "ID": this.state.ID,
            "firstName": this.state.firstname,
            "lastName": this.state.lastname
        } )
        localStorage.setItem( 'carDealer_X_auth', response.data.user.tokens[response.data.user.tokens.length - 1].token )
        this.props.history.push( { pathname: '/dashboard', state: { role: this.state.type } } )
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

    getId = ( e ) => {
        this.setState( {
            ID: e.target.value
        } )
    }

    getType = ( value ) => {
        this.setState( {
            type: value
        } )
    }

    render() {
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
                        password={this.getPassword}
                        ID={this.getId}
                        usertype={this.getType} />
                </Layout>
            </div>
        );
    }
}

export default LoginContainer;