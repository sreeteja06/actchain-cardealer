import React from 'react';
import ReactAux from '../../hoc/ReactAux'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { NavLink } from 'react-router-dom';

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
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#70b359"
  }
}));

const Login = ( props ) => {
   console.log(`
       _____________  ___  
      / ___/ ___/ _ \\/ _ \\ 
     (__  ) /  /  __/  __/ 
    /____/_/   \\___/\\___ 
   `)
   const classes = useStyles();
   return (
      <ReactAux>
         <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
               <form className={classes.form} noValidate>
                  <TextField
                     variant="outlined"
                     margin="normal"
                     required
                     fullWidth
                     id="email"
                     label="Email Address"
                     name="email"
                     autoComplete="email"
                     autoFocus
                     onChange={props.email}
                  />
                  <TextField
                     variant="outlined"
                     margin="normal"
                     required
                     fullWidth
                     name="password"
                     label="Password"
                     type="password"
                     id="password"
                     autoComplete="current-password"
                     onChange={props.password}
                  />
                  <Button 
                     type="submit"
                     fullWidth
                     variant="contained"
                     color="primary"
                     className={classes.submit}
                     onClick={props.login}
                  >
                     Sign In
                     </Button>
                  <Grid container>
                     <Grid item xs>
                        <Link href="#" variant="body2">
                           Forgot password?
                        </Link>
                     </Grid>
                     <Grid item xs>
                        <NavLink to="/signup" variant="body2">
                           Sign Up?
                        </NavLink>
                     </Grid>
                     <Grid item>

                     </Grid>
                  </Grid>
               </form>
            </div>
         </Container>
      </ReactAux>
   );

}
export default Login;
