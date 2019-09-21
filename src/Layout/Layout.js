import React from 'react';
import ReactAux from '../hoc/ReactAux'
import Navbar from '../components/Header/Header'

const Layout = (props) => {
    return ( 
        <ReactAux>
            <div>
                <Navbar />
            </div>
            <main className="container mt-5">
                    { props.children}
            </main>
        </ReactAux>
     );
}
 
export default Layout;