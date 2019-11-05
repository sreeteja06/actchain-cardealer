/*
 * SPDX-License-Identifier: Apache-2.0
 *         _____________  ___  
 *        / ___/ ___/ _ \/ _ \ 
 *      (__  ) /  /  __/  __/ 
 *     /____/_/   \___/\___  
 * File Created: Tuesday, 5th November 2019 12:28:50 pm
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
  const [data, setData] = React.useState(false);
  const [showSnakBar, setShowSnakBar] = React.useState(false);
  const [validationError, setValidationError] = React.useState(false);
  const [snakBarMessage, setSnakBarMessage] = React.useState();
  const [snakBarVarient, setSnakBarVarient] = React.useState("success");
  const [disableButton, setDisableButton] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        if (showSnakBar) {
          await setShowSnakBar(false);
        }
        const result = await axios(`dealer/registered`, {
          headers: {
            "x-auth": localStorage.getItem("carDealer_X_auth")
          }
        });
        if (result.status === 200) {
          setData(result.data);
        } else {
          setSnakBarMessage("error registering");
          setSnakBarVarient("error");
          setShowSnakBar(true);
        }
      } catch (e) {
        setSnakBarMessage("error registering");
        setSnakBarVarient("error");
        setShowSnakBar(true);
      }
    };
    fetchData();
  }, []);

  const Register = async () => {
    try {
      setDisableButton(true)
      if (showSnakBar) {
        await setShowSnakBar(false);
      }
      let response = await axios.post(
        "/dealer/register",{},
        {
          headers: {
            "x-auth": localStorage.getItem("carDealer_X_auth")
          }
        }
      );
      if (response.status === 200) {
        setSnakBarMessage("successfully registered");
      } else {
        setSnakBarMessage("error registering");
        setSnakBarVarient("error");
      }
      const result2 = await axios(`dealer/registered`, {
        headers: {
          "x-auth": localStorage.getItem("carDealer_X_auth")
        }
      });
      if (result2.status === 200) {
        setData(result2.data);
      }
      setDisableButton(false)
      await setShowSnakBar(true);
    } catch (e) {
      console.error(e);
      setSnakBarMessage("error adding car model");
      setSnakBarVarient("error");
      await setShowSnakBar(true);
    }
  };

  let styleObj;

  if (data) {
    styleObj = { backgroundColor: "grey", color: "white" };
  } else {
    styleObj = {
      backgroundColor: "#70b359",
      color: "white",
      padding: "10px"
    }
  }

  return (
    <>
      <div style={{ width: "100%" }}>
      </div>
      <form className={classes.root} noValidate>
        <Grid
          className={classes.gridMargin}
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Button
            disabled={data}
            style={styleObj}
            onClick={e => Register(e)}
          >
            Register
            <AddIcon />
          </Button>
          <Typography>A Nominal pay of $1000 is required to register</Typography>
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