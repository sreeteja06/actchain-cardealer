import React, { Component } from 'react';
import Card from '../../components/Cards/Card'
import axios from '../../axios'
import Layout from '../../Layout/Layout';
import SnakBar from '../../components/SnackBar/SnackBar'

class LoginContainer extends Component {
  state = {
    label: 'Something',
    showSnakBar: false,
    snakBarMessage: '',
    snakBarVarient: 'warn'
  }
  username = ''
  password = ''
  role = ''

  LoginHandler = async ( e ) => {
    e.preventDefault()
    //  console.log(`${this.state.username} ${this.state.password}`)
    try {
      if ( this.state.showSnakBar ) {
        await this.setState( {
          showSnakBar: false
        } )
      }
      let response = await axios.post( "users/login", {
        email: this.username,
        password: this.password
      } )
      console.log( response )
      if ( response.status === 200 ) {
        this.role = response.data.role;
        await localStorage.setItem( 'carDealer_X_auth', response.data.tokens[response.data.tokens.length - 1].token )
        await localStorage.setItem( 'carDealer_userid', response.data._id )
        this.props.history.push( { pathname: '/dashboard', state: { role: this.role } } )
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
        snakBarMessage: 'error logging in',
        snakBarVarient: 'error'
      } )
    }
  }

  getEmail = ( e ) => {
    this.username = e.target.value
  }

  getPassword = ( e ) => {
    this.password = e.target.value
  }

  render() {
    return (
      <div>
        <Layout>
          <Card label={this.state.label}
            type='login'
            login={this.LoginHandler}
            email={this.getEmail}
            password={this.getPassword} />
        </Layout>
        {this.state.showSnakBar ? <SnakBar message={this.state.snakBarMessage} variant={this.state.snakBarVarient} className={{
          "margin": "theme.spacing( 1 )"
        }}></SnakBar> : null}
      </div>
    );
  }
}

export default LoginContainer;