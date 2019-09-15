import React, { Component } from 'react';
import Card from '../../components/Cards/Card'
import { Redirect } from 'react-router-dom'
// import axios from 'axios'
import Layout from '../../Layout/Layout';

class LoginContainer extends Component {
    state = {  
        label: 'Something',
        header: 'Header',
        username: '',
        password: '',
        redirect: false,
     }
     orgUsername = '';
     organization = '';

     LoginHandler = async (e) => {
       e.preventDefault()
      //  console.log(`${this.state.username} ${this.state.password}`)
      //   let response = await axios.post( "http://ec2-18-223-209-42.us-east-2.compute.amazonaws.com/users/login", {
      //      email: this.state.username,
      //      password: this.state.password
      //   })
      //   this.orgUsername = response.data[0].productdata[0].roles[0].username;
      //   this.organization = response.data[0].productdata[0].roles[0].organization;
        this.setState({
           redirect: true
        })
     }

     getEmail = (e) => {
        this.setState({
           username: e.target.value
        })
     }

     getPassword = (e) => {
        this.setState({
            password: e.target.value
        })
     }

    render() { 
        if(this.state.redirect){
           console.log('redirecting');
            return <Redirect 
            to={{
                  pathname: "/dashboard",
                  // state: {
                  //    username: this.orgUsername,
                  //    organization: this.organization
                  // }
               }}
            />
        }
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