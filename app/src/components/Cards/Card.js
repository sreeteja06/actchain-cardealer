import React from 'react';
import ReactAux from '../../hoc/ReactAux'
import Login from '../Login/Login';
import Signup from '../Singup/Signup'
import Logo from '../../assets/img/Logo/actchain.png'
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles(theme => ({
//     root: {
//       flexGrow: 1,
//     },
//     paper: {
//       padding: theme.spacing(2),
//       textAlign: 'center',
//       color: theme.palette.text.secondary,
//     },
//   }));

const Card = (props) => {
    // const classes = useStyles();
    return (
      <ReactAux>
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div
                className="col-md-6 text-center"
                style={{ alignItems: "center", marginTop: 0 }}
              >
                {props.type === "login" ? (
                  <Login
                    login={props.login}
                    email={props.email}
                    password={props.password}
                  />
                ) : null}
                {props.type === "signup" ? (
                  <Signup
                    signup={props.signup}
                    firstname={props.firstname}
                    lastname={props.lastname}
                    phone={props.phone}
                    email={props.email}
                    password={props.password}
                    ID={props.ID}
                    usertype={props.usertype}
                    address={props.address}
                    addState={props.addState}
                    city={props.city}
                    brand={props.brand}
                    website={props.website}
                    contactName={props.contactName}
                    contactTitle={props.contactTitle}
                    contactPhone={props.contactPhone}
                    contactEmail={props.contactEmail}
                  />
                ) : null}
              </div>
              <div className="col-md-6 text-center">
                <img
                  style={{
                    height: "200px",
                    marginTop: "80px",
                    marginLeft: "-80px"
                  }}
                  src={Logo}
                  alt="Actchain Logo"
                />
              </div>
            </div>
          </div>
        </div>
      </ReactAux>
    );
}
 
export default Card; 