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
import SnakBar from '../../components/SnackBar/SnackBar'

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
        type: 'Buyer',
        showSnakBar: false,
        snakBarMessage: '',
        snakBarVarient: 'warn'
    }

    SignupHandler = async ( e ) => {
        e.preventDefault()
        // console.log( `${JSON.stringify(this.state)}` )
        try {
            if ( this.state.showSnakBar ) {
                await this.setState( {
                    showSnakBar: false
                } )
            }
            let response = await axios.post( "users", {
                "email": this.state.email,
                "password": this.state.password,
                "role": this.state.type,
                "ID": this.state.ID,
                "firstName": this.state.firstname,
                "lastName": this.state.lastname
            } )
            if ( response.status === 200 ) {
                localStorage.setItem( 'carDealer_X_auth', response.data.user.tokens[response.data.user.tokens.length - 1].token )
                localStorage.setItem( 'carDealer_userid', response.data.user._id )
                this.props.history.push( { pathname: '/dashboard', state: { role: this.state.type } } )
            } else {
                this.setState( {
                    showSnakBar: true,
                    snakBarMessage: 'error logging in',
                    snakBarVarient: 'error'
                } )
            }
        } catch ( e ) {
            this.setState( {
                showSnakBar: true,
                snakBarMessage: 'can not load data',
                snakBarVarient: 'error'
            } )
        }

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
                {this.state.showSnakBar ? <SnakBar message={this.state.snakBarMessage} variant={this.state.snakBarVarient} className={{
                    "margin": "theme.spacing( 1 )"
                }}></SnakBar> : null}
            </div>
        );
    }
}

export default LoginContainer;