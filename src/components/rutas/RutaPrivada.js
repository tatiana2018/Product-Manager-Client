import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/productContext';

const RutaPrivada = ({ component: Component, ...props }) => {

    const authContext = useContext(AuthContext);
    const {usuario } = authContext;

    useEffect(() => {

        // eslint-disable-next-line
    },[usuario]);

    return (
        <Route {...props} render={props => !usuario ?  (
            <Redirect to="/"/>
        ) : (
                <Component {...props} />
            )} />

    );
}

export default RutaPrivada;