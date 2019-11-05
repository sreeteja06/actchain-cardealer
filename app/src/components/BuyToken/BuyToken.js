/*
 * SPDX-License-Identifier: Apache-2.0
 *     _____________  ___  
      / ___/ ___/ _ \/ _ \ 
     (__  ) /  /  __/  __/ 
    /____/_/   \___/\___  
 * File Created: Friday, 1st November 2019 3:19:41 pm
 * Author: SreeTeja06 (sreeteja.muthyala@gmail.com)

 */
import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Grid, Button, Box, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/AddOutlined";
import axios from "../../axios";
import SnakBar from "../SnackBar/SnackBar";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing(1)
  },
  gridMargin: {
    marginTop: "7%"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}));

const ValidationTextField = withStyles({
  root: {
    "& input:valid + fieldset": {
      borderColor: "green",
      borderWidth: 2
    },
    "& input:invalid + fieldset": {
      borderColor: "red",
      borderWidth: 2
    },
    "& input:valid:focus + fieldset": {
      borderLeftWidth: 6,
      padding: "4px !important" // override inline-style
    }
  }
})(TextField);

let car = {
  manufacturer: "BMW",
  model: "S07",
  trim: "Lxi",
  year: "2007",
  msrp: "20000"
};

export default function BuyToken() {
  const classes = useStyles();
  const [data, setData] = React.useState(0);
  const [showSnakBar, setShowSnakBar] = React.useState(false);
  const [validationError, setValidationError] = React.useState(false);
  const [snakBarMessage, setSnakBarMessage] = React.useState();
  const [snakBarVarient, setSnakBarVarient] = React.useState("success");
  let tokens;

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        if (showSnakBar) {
          await setShowSnakBar(false);
        }
        const result = await axios(`customer/getNoOfTokens`, {
          headers: {
            "x-auth": localStorage.getItem("carDealer_X_auth")
          }
        });
        if (result.status === 200) {
          setData(result.data.tokens);
        } else {
          setSnakBarMessage("error getting car details");
          setSnakBarVarient("error");
          setShowSnakBar(true);
        }
      } catch (e) {
        setSnakBarMessage("error getting car details");
        setSnakBarVarient("error");
        setShowSnakBar(true);
      }
    };
    fetchData();
  }, []);

  const BuyTokenButtonClick = async () => {
    if(!tokens || validationError){
      setValidationError(true);
    }else{
    try {
      if (showSnakBar) {
        await setShowSnakBar(false);
      }
      let response = await axios.post(
        "/customer/buyTokens",
        {
          tokens: tokens
        },
        {
          headers: {
            "x-auth": localStorage.getItem("carDealer_X_auth")
          }
        }
      );
      if (response.status === 200) {
        setSnakBarMessage("successfully bought tokens");
      } else {
        setSnakBarMessage("error buying tokens");
        setSnakBarVarient("error");
      }
      await setShowSnakBar(true);
    } catch (e) {
      console.error(e);
      setSnakBarMessage("error adding car model");
      setSnakBarVarient("error");
      await setShowSnakBar(true);
    }}
  };

  const inputHandler = event => {
    if(!event.target.value || event.target.value <= 0){
      setValidationError(true)
    }
    console.log(event.target.value)
    tokens = event.target.value
  };

  return (
    <>
      <div style={{ width: "100%" }}>
        <Box component="span" display="block" p={1} m={1} bgcolor="#81c784">
          <Typography align="center" variant="h5" style={{ color: "white" }}>
            Total tokens you have:{data}
          </Typography>
        </Box>
      </div>
      <form className={classes.root} noValidate>
        <Grid
          className={classes.gridMargin}
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <TextField
            id="token"
            className={classes.textField}
            type="number"
            label="Tokens"
            margin="normal"
            variant="filled"
            InputProps={{ inputProps: { min: 1 } }}
            onChange={inputHandler}
            error={validationError}
          />
          <Button
            style={{
              backgroundColor: "#70b359",
              color: "white",
              padding: "10px"
            }}
            onClick={e => BuyTokenButtonClick(e)}
          >
            Buy Token
            <AddIcon />
          </Button>
        </Grid>
        {showSnakBar ? (
          <SnakBar
            message={snakBarMessage}
            variant={snakBarVarient}
            className={classes.margin}
          ></SnakBar>
        ) : null}
      </form>
    </>
  );
}
