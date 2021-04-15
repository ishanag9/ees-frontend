import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AdminRoute = ({component: Component, ...rest}) => {
    
    return (

        
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
           localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).roles[0]==='ROLE_ADMIN' ?
                <Component {...props} />
            : <Redirect to="/signin" />
        )} />
    );
};

export default AdminRoute;