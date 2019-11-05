/*
 * SPDX-License-Identifier: Apache-2.0
 *     _____________  ___  
      / ___/ ___/ _ \/ _ \ 
     (__  ) /  /  __/  __/ 
    /____/_/   \___/\___  
 * File Created: Tuesday, 17th September 2019 1:50:25 pm
 * Author: SreeTeja06 (sreeteja.muthyala@gmail.com)

 */
import React from "react";
import MUIDataTable from "mui-datatables";
import axios from "../../axios";
import { Button, Typography, Box } from "@material-ui/core";
import SnakBar from "../SnackBar/SnackBar";
import LinearProgress from "@material-ui/core/LinearProgress";

export default function GetQuote() {
  const [data, setData] = React.useState([]);
  const [showSnakBar, setShowSnakBar] = React.useState(false);
  const [snakBarMessage, setSnakBarMessage] = React.useState();
  const [tokens, setTokens] = React.useState(0);
  const [snakBarVarient, setSnakBarVarient] = React.useState("success");
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        if (showSnakBar) {
          await setShowSnakBar(false);
        }
        const result = await axios(`customer/getQuotableCars`, {
          headers: {
            "x-auth": localStorage.getItem("carDealer_X_auth")
          }
        });
        const result2 = await axios(`customer/getNoOfTokens`, {
          headers: {
            "x-auth": localStorage.getItem("carDealer_X_auth")
          }
        });
        if (result.status === 200 && result2.status === 200) {
          setData(result.data);
          setTokens(result2.data.tokens);
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
      setLoaded(true);
    };
    fetchData();
  }, []);

  const getQuote = async e => {
    try {
      if (showSnakBar) {
        await setShowSnakBar(false);
      }
      setLoaded(false)
      let result = await axios.post(
        "/customer/requestACar",
        {
          carID: e[0]
        },
        {
          headers: {
            "x-auth": localStorage.getItem("carDealer_X_auth")
          }
        }
      );
      if (result.status !== 200) {
        setSnakBarMessage("error asking quote");
        setSnakBarVarient("error");
        setShowSnakBar(true);
      } else {
        setSnakBarMessage("success asking quote");
        setSnakBarVarient("success");
        setShowSnakBar(true);
      }
      const result1 = await axios(`customer/getQuotableCars`, {
        headers: {
          "x-auth": localStorage.getItem("carDealer_X_auth")
        }
      });
      const result2 = await axios(`customer/getNoOfTokens`, {
        headers: {
          "x-auth": localStorage.getItem("carDealer_X_auth")
        }
      });
      if (result1.status === 200) {
        setData(result1.data);
        setTokens(result2.data.tokens);
      }
      setLoaded(true)
    } catch (e) {
      setSnakBarMessage("error asking quote");
      setSnakBarVarient("error");
      setShowSnakBar(true);
      setLoaded(true);
    }
  };

  const columns = [
    {
      name: "_id",
      label: "Car ID",
      options: {
        filter: false,
        sort: true,
        display: false
      }
    },
    {
      name: "manufacturer",
      label: "Manufacturer",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "model",
      label: "Model",
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: "trim",
      label: "Trim",
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: "year",
      label: "Year",
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: "Msrp",
      label: "MSRP",
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: "quotable",
      label: "quotable",
      options: {
        filter: false,
        sort: true,
        display: false
      }
    },
    {
      name: "GetQuote",
      label: "Get Quote",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          let styleObj;
          if (!tableMeta.rowData[6]) {
            styleObj = { backgroundColor: "grey", color: "white" };
          } else {
            styleObj = {
              backgroundColor: "#70b359",
              color: "white"
            };
          }
          return (
            <Button
              style={styleObj}
              onClick={e => getQuote(tableMeta.rowData)}
              disabled={!tableMeta.rowData[6]}
            >
              Get Quote
            </Button>
          );
        }
      }
    }
  ];

  const options = {
    filterType: "checkbox",
    selectableRows: "none",
    responsive: "scrollFullHeight",
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 20, 30, 50, 100]
  };

  return (
    <div>
      {!loaded ? (
        <LinearProgress color="secondary" />
      ) : (
        <>
          <div style={{ width: "100%" }}>
            <Box component="span" display="block" p={1} m={1} bgcolor="#81c784">
              <Typography
                align="center"
                variant="h5"
                style={{ color: "white" }}
              >
                Available Tokens:{tokens}
              </Typography>
            </Box>
          </div>
          <MUIDataTable data={data} columns={columns} options={options} />
        </>
      )}
      {showSnakBar ? (
        <SnakBar
          message={snakBarMessage}
          variant={snakBarVarient}
          className={{
            margin: "theme.spacing( 1 )"
          }}
        ></SnakBar>
      ) : null}
    </div>
  );
}
