/*
 * SPDX-License-Identifier: Apache-2.0
 *     _____________  ___  
      / ___/ ___/ _ \/ _ \ 
     (__  ) /  /  __/  __/ 
    /____/_/   \___/\___  
 * File Created: Sunday, 15th September 2019 7:56:40 am
 * Author: SreeTeja06 (sreeteja.muthyala@gmail.com)

 */
import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { NavLink } from 'react-router-dom'
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { InputLabel } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#70b359"
  },
  root: {
    "&.Mui-focused fieldset": {
      borderColor: "green"
    }
  }
}));


export default function SignUp(props) {

    function handleChangeType( event ) {
        setRadioValue( event.target.value );
        props.usertype( event.target.value )
    }
    const [radioValue, setRadioValue] = React.useState( 'Buyer' );
    const classes = useStyles();
    return (
      <Container component="main" maxWidth="xs" style={{ marginTop: "-50px" }}>
        <CssBaseline />
        <div className={classes.paper}>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="first name"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={props.firstname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="last name"
                  onChange={props.lastname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="phone"
                  label="Phone"
                  type="phone"
                  id="phone"
                  autoComplete="phone"
                  onChange={props.phone}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={props.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={props.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="address"
                  onChange={props.address}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="City"
                  name="city"
                  variant="outlined"
                  required
                  fullWidth
                  id="city"
                  label="City"
                  autoFocus
                  onChange={props.city}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="state"
                  label="State"
                  name="state"
                  autoComplete="State"
                  onChange={props.addState}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel component="legend">Type</FormLabel>
                <RadioGroup
                  aria-label="Type"
                  name="Type"
                  value={radioValue}
                  onChange={handleChangeType}
                >
                  <FormControlLabel
                    value="Buyer"
                    control={<Radio />}
                    label="Buyer"
                    style={{ display: "inline-block", width: "150px" }}
                  />
                  <FormControlLabel
                    value="Dealer"
                    control={<Radio />}
                    label="Dealer"
                    style={{
                      display: "inline-block",
                      width: "150px",
                      marginTop: "-50px",
                      marginLeft: "150px"
                    }}
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="ID"
                  label={
                    radioValue === "Buyer"
                      ? "SocialSecurity Number"
                      : "Dealer Registraction No"
                  }
                  type="text"
                  id="ID"
                  onChange={props.ID}
                />
              </Grid>
              {radioValue === "Dealer" ? (
                <>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="brand"
                      label="Brand"
                      type="text"
                      id="brand"
                      onChange={props.brand}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="website"
                      label="Website"
                      type="text"
                      id="website"
                      onChange={props.website}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel>Used Car Contact Details</InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="contactName"
                      variant="outlined"
                      required
                      fullWidth
                      id="contactName"
                      label="contact name"
                      autoFocus
                      onChange={props.contactName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="contactTitle"
                      label="contact title"
                      name="contactTitle"
                      onChange={props.contactTitle}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="contactMobile"
                      variant="outlined"
                      required
                      fullWidth
                      id="contactMobile"
                      label="Contact Mobile"
                      autoFocus
                      onChange={props.contactPhone}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="contactEmail"
                      label="Contact Email"
                      name="contactEmail"
                      onChange={props.contactEmail}
                    />
                  </Grid>
                </>
              ) : null}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={props.signup}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <NavLink to="/" variant="body2">
                  Already have an account? Sign in
                </NavLink>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
}