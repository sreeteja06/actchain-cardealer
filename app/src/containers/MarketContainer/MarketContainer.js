/*
 * SPDX-License-Identifier: Apache-2.0
 *     _____________  ___  
      / ___/ ___/ _ \/ _ \ 
     (__  ) /  /  __/  __/ 
    /____/_/   \___/\___  
 * File Created: Thursday, 19th September 2019 8:21:10 pm
 * Author: SreeTeja06 (sreeteja.muthyala@gmail.com)

 */
import React, { Component } from 'react';
import Market from '../../components/Market/Market'
import axios from '../../axios';
import SnakBar from '../../components/SnackBar/SnackBar'
import LinearProgress from '@material-ui/core/LinearProgress';

class MarketContainer extends Component {

    constructor( props ) {
        super( props )

        this.refreshData = this.refreshData.bind( this )
    }

    state = {
        data: [],
        showSnakBar: false,
        snakBarMessage: '',
        snakBarVarient: 'warn',
        loaded: false
    }

    fetchData = async () => {
        try {
            if(this.state.showSnakBar){
                this.setState({
                    showSnakBar: false
                })
            }
            const result = await axios(
                `/dealer/market`,{
                    headers: {
                        'x-auth': localStorage.getItem( 'carDealer_X_auth' )
                    }
                }
            );
            if(result.status===200){
                this.setState( {
                    data: result.data
                } )
            }else{
                this.setState( {
                    showSnakBar: true,
                    snakBarMessage: 'can not load data',
                    snakBarVarient: 'error'
                } )
            }
        } catch ( e ) {
            this.setState( {
                showSnakBar: true,
                snakBarMessage: 'can not load data',
                snakBarVarient: 'error'
            } )
        }
        this.setState({
            loaded: true
        })
    };

    async refreshData() {
        await this.fetchData();
    }

    async componentDidMount() {
        await this.fetchData();
    }

    // sleep = ( milliseconds ) => {
    //     return new Promise( resolve => setTimeout( resolve, milliseconds ) )
    // }

    // async componentDidUpdate( prevProps, prevState){
    //     if(prevState.data !== this.state.data){
    //         await this.sleep(15000)
    //         await this.fetchData()
    //     }
    // }
    render() {
        return (
            <div>
                {!this.state.loaded 
                ? <LinearProgress color="secondary" />
                :
                <Market data={this.state.data} refreshMarket={this.refreshData} ></Market>}
                {this.state.showSnakBar ? <SnakBar message={this.state.snakBarMessage} variant={this.state.snakBarVarient} className={{
                    "margin": "theme.spacing( 1 )"
                }}></SnakBar> : null}
            </div>
        );
    }
}

export default MarketContainer;