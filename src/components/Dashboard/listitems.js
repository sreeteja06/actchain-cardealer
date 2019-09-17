/*
 * SPDX-License-Identifier: Apache-2.0
 *     _____________  ___  
      / ___/ ___/ _ \/ _ \ 
     (__  ) /  /  __/  __/ 
    /____/_/   \___/\___  
 * File Created: Sunday, 15th September 2019 12:58:41 pm
 * Author: SreeTeja06 (sreeteja.muthyala@gmail.com)

 */
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
// import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import BarChartIcon from '@material-ui/icons/BarChartOutlined';
import AddIcon from '@material-ui/icons/AddOutlined';

export const DealerNavItems = ( props ) => (
    <div>
        <ListItem button 
        onClick={event => props.handleListItemClick( event, 0, "Market" )}
            selected={props.selectedIndex === 0}
        >
            <ListItemIcon style={{ "color": '#FFFFFF' }}>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Market" />
        </ListItem>
        <ListItem button
            onClick={event => props.handleListItemClick( event, 2, "CarDetails" )}
            selected={props.selectedIndex === 2}
        >
            <ListItemIcon style={{ "color": '#FFFFFF' }}>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Cars Stock" />
        </ListItem>
        {/* <ListItem button
            onClick={event => props.handleListItemClick( event, 3, "Customers" )}
            selected={props.selectedIndex === 3}
        >
            <ListItemIcon style={{ "color": '#FFFFFF' }}>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Customers" />
        </ListItem> */}
        <ListItem button
            onClick={event => props.handleListItemClick( event, 4, "AddCar" )}
            selected={props.selectedIndex === 4}
        >
            <ListItemIcon style={{ "color": '#FFFFFF' }}>
                <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add Car" />
        </ListItem>
    </div>
);

export const BuyerNavItems = (props) => (
    <div>
        <ListItem button onClick={event => props.handleListItemClick( event, 0, "Dashboard" )}
            selected={props.selectedIndex === 0}>
            <ListItemIcon style={{ "color": '#FFFFFF' }}>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Current month" />
        </ListItem>
        <ListItem button onClick={event => props.handleListItemClick( event, 1, "getQuote" )}
            selected={props.selectedIndex === 1}>
            <ListItemIcon style={{ "color": '#FFFFFF' }}>
                <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Last quarter" />
        </ListItem>
    </div>
);
