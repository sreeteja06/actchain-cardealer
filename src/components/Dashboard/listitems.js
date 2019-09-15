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
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';

export const DealerNavItems = ( props ) => (
    <div>
        <ListItem button 
        onClick={event => props.handleListItemClick( event, 0, "Market" )}
            selected={props.selectedIndex === 0}
        >
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Market" />
        </ListItem>
        <ListItem button 
            onClick={event => props.handleListItemClick( event, 1, "PlacedBids" )}
            selected={props.selectedIndex === 1}
        >
            <ListItemIcon>
                <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Placed-Bids" />
        </ListItem>
        <ListItem button
            onClick={event => props.handleListItemClick( event, 2, "CarStock" )}
            selected={props.selectedIndex === 2}
        >
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Cars Stock" />
        </ListItem>
        <ListItem button
            onClick={event => props.handleListItemClick( event, 3, "Customers" )}
            selected={props.selectedIndex === 3}
        >
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Customers" />
        </ListItem>
        <ListItem button
            onClick={event => props.handleListItemClick( event, 4, "AddCar" )}
            selected={props.selectedIndex === 4}
        >
            <ListItemIcon>
                <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Add Car" />
        </ListItem>
    </div>
);

export const BuyerNavItems = (
    <div>
        <ListSubheader inset>Saved reports</ListSubheader>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Current month" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Last quarter" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Year-end sale" />
        </ListItem>
    </div>
);
