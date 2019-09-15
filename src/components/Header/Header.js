import React from 'react';
import Logo from '../../assets/img/Logo/actchain_logo.png'

const headerStyle = {
    color:{backgroundColor:'rgb(25,123,189)'}
}

const Header = (props) => {
    return ( 
        <div>
           <nav style={headerStyle.color} className="navbar sticky-top navbar-light  justify-content-center">
               <a className="navbar-brand" href="/"><img style={{ height: 46 }} src={Logo} alt="activa" /></a>
            </nav>
        </div>  
     );
}
 
export default Header;