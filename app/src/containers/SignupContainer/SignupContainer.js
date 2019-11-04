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
import OTPDialog from '../../components/OTPverifyDialog/OTPverifyDialog'

class LoginContainer extends Component {
  constructor(props) {
    super(props);

    this.setOpen = this.setOpen.bind(this);
  }

  state = {
    label: "Something",
    header: "Header",
    email: "",
    password: "",
    redirect: false,
    firstname: "",
    lastname: "",
    phone: "",
    ID: "",
    type: "Buyer",
    showSnakBar: false,
    snakBarMessage: "",
    snakBarVarient: "warn",
    open: false,
    address: "",
    city: "",
    addState: "",
    brand: "",
    website: "",
    contactName: "",
    contactTitle: "",
    contactEmail: "",
    contactPhone: ""
  };

  SignupHandler = async e => {
    e.preventDefault();
    console.log(`${JSON.stringify(this.state)}`);
    try {
      if (this.state.showSnakBar) {
        await this.setState({
          showSnakBar: false
        });
      }
      let response = await axios.post("/users/signup", {
        email: this.state.email,
        password: this.state.password,
        role: this.state.type,
        ID: this.state.ID,
        firstName: this.state.firstname,
        lastName: this.state.lastname,
        city: this.state.city,
        state: this.state.addState,
        mobile:this.state.phone,
        contact_name: this.state.contactName,
        contact_email: this.state.contactEmail,
        contact_title: this.state.contactTitle,
        contact_mobile: this.state.contactPhone,
        Brand: this.state.brand,
        website: this.state.website,
      });
      if (response.status === 200) {
        localStorage.setItem("carDealer_userid", response.data);
        this.setOpen(true);
      } else {
        this.setState({
          showSnakBar: true,
          snakBarMessage: "error signing up",
          snakBarVarient: "error"
        });
      }
    } catch (e) {
      this.setState({
        showSnakBar: true,
        snakBarMessage: "error signing up",
        snakBarVarient: "error"
      });
    }
  };

  getEmail = e => {
    this.setState({
      email: e.target.value
    });
  };

  getPassword = e => {
    this.setState({
      password: e.target.value
    });
  };

  getFirstName = e => {
    this.setState({
      firstname: e.target.value
    });
  };

  getLastName = e => {
    this.setState({
      lastname: e.target.value
    });
  };

  getPhone = e => {
    this.setState({
      phone: e.target.value
    });
  };

  getId = e => {
    this.setState({
      ID: e.target.value
    });
  };

  getType = value => {
    this.setState({
      type: value
    });
  };

  getAddress = e => {
    this.setState({
      address: e.target.value
    });
  };

  getCity = e => {
    this.setState({
      city: e.target.value
    });
  };

  getAddState = e => {
    this.setState({
      addState: e.target.value
    });
  };

  getBrand = e => {
    this.setState({
      brand: e.target.value
    });
  };

  getWebsite = e => {
    this.setState({
      website: e.target.value
    });
  };

  getContactName = e => {
    this.setState({
      contactName: e.target.value
    });
  };

  getContactTitle = e => {
    this.setState({
      contactTitle: e.target.value
    });
  };

  getContactEmail = e => {
    this.setState({
      contactEmail: e.target.value
    });
  };

  getContactPhone = e => {
    this.setState({
      contactPhone: e.target.value
    });
  };

  setOpen = value => {
    this.setState({
      open: value
    });
  };

  verified = type => {
    this.setOpen(false);
    this.props.history.push({ pathname: "/dashboard", state: { role: type } });
  };

  render() {
    return (
      <div>
        <Layout>
          <Card
            label={this.state.label}
            type="signup"
            signup={this.SignupHandler}
            firstname={this.getFirstName}
            lastname={this.getLastName}
            phone={this.getPhone}
            email={this.getEmail}
            password={this.getPassword}
            ID={this.getId}
            usertype={this.getType}
            address={this.getAddress}
            addState={this.getAddState}
            city={this.getCity}
            brand={this.getBrand}
            website={this.getWebsite}
            contactName={this.getContactName}
            contactTitle={this.getContactTitle}
            contactPhone={this.getContactPhone}
            contactEmail={this.getContactEmail}
          />
        </Layout>
        {this.state.showSnakBar ? (
          <SnakBar
            message={this.state.snakBarMessage}
            variant={this.state.snakBarVarient}
            className={{
              margin: "theme.spacing( 1 )"
            }}
          ></SnakBar>
        ) : null}
        <OTPDialog
          open={this.state.open}
          setOpen={this.setOpen}
          verified={this.verified}
          values={{ email: this.state.email }}
        ></OTPDialog>
      </div>
    );
  }
}

export default LoginContainer;