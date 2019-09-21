/*
 * SPDX-License-Identifier: Apache-2.0
 *     _____________  ___  
      / ___/ ___/ _ \/ _ \ 
     (__  ) /  /  __/  __/ 
    /____/_/   \___/\___  
 * File Created: Sunday, 15th September 2019 11:35:38 am
 * Author: SreeTeja06 (sreeteja.muthyala@gmail.com)

 */
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import LogoutIcon from '@material-ui/icons/PowerSettingsNewOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Market from '../../containers/MarketContainer/MarketContainer';
import { DealerNavItems, BuyerNavItems } from './listitems';
import CarDetails from '../CarDetails/CarDetails'
import AddCar from '../AddCar/AddCar'
import GetQuote from '../GetQuote/GetQuote'
import BuyerTable from '../BuyerTable/BuyerTable'
import DealerSubscribe from '../DealerSubscribe/DealerSubscribe';
import BroughtCars from '../BroughtCars/BroughtCars'
import axios from '../../axios'

const drawerWidth = 240;

const useStyles = makeStyles( theme => ( {
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    backgroundColor: "rgb(25,123,189)"
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create( ['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    } ),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${ drawerWidth }px)`,
    transition: theme.transitions.create( ['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    } ),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    backgroundColor: "rgb(25,123,189)",
    color: "white",
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create( 'width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    } ),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create( 'width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    } ),
    width: theme.spacing( 7 ),
    [theme.breakpoints.up( 'sm' )]: {
      width: theme.spacing( 9 ),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing( 4 ),
    paddingBottom: theme.spacing( 4 ),
  },
  paper: {
    padding: theme.spacing( 2 ),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
} ) );

const DashboardNav = ( props ) => {
  const userType = props.location.state.role //use cookie or sessions later
  const XToken = localStorage.getItem('carDealer_X_auth')
  if(!XToken){
    props.history.push( '/' )
  }
  let firstCard = 'Market'
  if(userType === 'Buyer'){
      firstCard = 'Dashboard'
  }
  let [SelectedNavItem, setSelectedNavItem] = React.useState(firstCard);
  
  const classes = useStyles();
  const [open, setOpen] = React.useState( false );
  const [selectedIndex, setSelectedIndex] = React.useState( 0 );


  function handleDrawerOpen() {
    setOpen( true );
  }

  function handleDrawerClose() {
    setOpen( false );
  }

  function handleListItemClick( event, index, navItem ) {
    setOpen( false );
    setSelectedIndex( index );
    setSelectedNavItem( navItem );
  }
  async function logout(){
    await axios.delete( '/users/logout', {
      headers: {
        'x-auth': localStorage.getItem( 'carDealer_X_auth' )
      }
    })
    localStorage.clear();
    props.history.push('/')
  }
  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={clsx( classes.appBar, open && classes.appBarShift )}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx( classes.menuButton, open && classes.menuButtonHidden )}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              {SelectedNavItem}
            </Typography>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              {userType}
            </Typography>
            <IconButton 
              color="inherit"
              onClick={logout}
            >
             <LogoutIcon/>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx( classes.drawerPaper, !open && classes.drawerPaperClose ),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <List>
              {userType === 'Dealer'? 
                <DealerNavItems handleListItemClick={handleListItemClick} selectedIndex={selectedIndex} ></DealerNavItems>
              :null}
              {userType === 'Buyer' ?
                <BuyerNavItems handleListItemClick={handleListItemClick} selectedIndex={selectedIndex} ></BuyerNavItems>
                : null}
            </List>
          </List>
          <Divider />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          {SelectedNavItem==='Market'?<Market></Market>:null}
          {SelectedNavItem === 'CarDetails' ? <CarDetails></CarDetails> : null}
          {SelectedNavItem === 'AddCar' ? <AddCar></AddCar> : null}
          {SelectedNavItem === 'Dashboard' ? <BuyerTable></BuyerTable> : null}
          {SelectedNavItem === 'getQuote' ? <GetQuote></GetQuote> : null}
          {SelectedNavItem === 'Subscribe' ? <DealerSubscribe></DealerSubscribe> : null}
          {SelectedNavItem === 'BroughtCars' ? <BroughtCars></BroughtCars> : null}
        </main>
      </div>
    </div>
  );
}

export default DashboardNav;

