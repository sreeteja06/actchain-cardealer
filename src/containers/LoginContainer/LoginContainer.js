import React, { Component } from 'react';
import Card from '../../components/Cards/Card'
import axios from '../../axios'
import Layout from '../../Layout/Layout';

class LoginContainer extends Component {
    state = {
       label: 'Something',
     }
     username=''
     password= ''
     role= ''

     LoginHandler = async (e) => {
       e.preventDefault()
      //  console.log(`${this.state.username} ${this.state.password}`)
        let response = await axios.post( "users/login", {
           email: this.username,
           password: this.password
        })
        this.role = response.data.role;
        localStorage.setItem( 'carDealer_X_auth', response.data.tokens[response.data.tokens.length-1].token)
        this.props.history.push({pathname: '/dashboard', state: {role: this.role}})
     }

     getEmail = (e) => {
         this.username = e.target.value
     }

     getPassword = (e) => {
            this.password =  e.target.value
     }

    render() { 
        return ( 
            <div>
               <Layout>
              <Card  label={this.state.label} 
                     type='login'
                     login={this.LoginHandler}
                     email={this.getEmail}
                     password={this.getPassword} />
              </Layout>
            </div>
         );
    }
}
 
export default LoginContainer;