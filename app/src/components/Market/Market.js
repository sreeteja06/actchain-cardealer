/*
 * SPDX-License-Identifier: Apache-2.0
 *     _____________  ___  
      / ___/ ___/ _ \/ _ \ 
     (__  ) /  /  __/  __/ 
    /____/_/   \___/\___  
 * File Created: Sunday, 15th September 2019 5:44:43 pm
 * Author: SreeTeja06 (sreeteja.muthyala@gmail.com)

 */
import React from 'react';
import MUIDataTable from "mui-datatables";
import { Button } from '@material-ui/core'
import QuoteDialog from '../QuoteDialog/QuoteDialog';
import LinearProgress from '@material-ui/core/LinearProgress';
import axios from "../../axios";

const Market = ( props ) => {
    const [open, setOpen] = React.useState( false );
    const [registered, setRegistered] = React.useState( false )

    React.useEffect(() => {
      const fetchData = async () => {
        try {
          const result = await axios(`dealer/registered`, {
            headers: {
              "x-auth": localStorage.getItem("carDealer_X_auth")
            }
          });
          if (result.status === 200) {
            setRegistered(result.data.registered);
          }
        } catch (e) {
        }
      };
      fetchData();
    }, []);

    const [dialogProps, setDialogProps] = React.useState( {
        requestID: "",
        name: "",
        manufacturer: "",
        model: "",
        trim: "",
        year: "",
        MSRP: ""
    } )
    const QuoteDiscount = ( e ) => {
        setOpen( true );
        setDialogProps( {
            requestID: e[0],
            name: e[1],
            manufacturer: e[2],
            model: e[3],
            trim: e[4],
            year: e[5],
            MSRP: e[6]
        } )
    }
    const columns = [
      {
        name: "requestID",
        label: "requestID",
        options: {
          filter: false,
          sort: false,
          display: false
        }
      },
      {
        name: "name",
        label: "Name",
        options: {
          filter: false,
          sort: true
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
          filter: true,
          sort: true
        }
      },
      {
        name: "trim",
        label: "Trim",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "year",
        label: "Year",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "Msrp",
        label: "MSRP",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "rank",
        label: "Rank",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "bestOffer",
        label: "Best Quote%",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "Pricequote",
        label: "Previous Quote%",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "Quote Offer",
        label: "Quote Offer",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <div>
                <Button
                  style={{ backgroundColor: "#70b359", color: "white" }}
                  onClick={e => QuoteDiscount(tableMeta.rowData)}
                >
                  Quote Offer
                </Button>
              </div>
            );
          }
        },
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            let styleObj;
            if (!registered) {
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
                onClick={e => QuoteDiscount(tableMeta.rowData)}
                disabled={!registered}
              >
                Quote Offer
              </Button>
            );
          }
        }
      }
    ];

    const options = {
        filterType: 'checkbox',
        selectableRows: 'none',
        responsive: 'scrollFullHeight',
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 20, 30, 50, 100]
    };

    return (
        <div>
            {open ? <LinearProgress color="secondary" /> : null}
            <MUIDataTable
                data={props.data}
                columns={columns}
                options={options}
            />
            <QuoteDialog open={open} setOpen={setOpen} refreshMarket={props.refreshMarket} values={dialogProps}></QuoteDialog>

        </div>
    )
}

export default Market