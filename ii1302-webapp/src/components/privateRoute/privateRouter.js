import React, {useContext} from 'react';
import {Route} from "react-router-dom";
import { AuthenticatorContext } from "./../../util/Auth";
import PageNotFoundView from "./../views/pagenotfoundview/PageNotFoundView";

const PrivateRoute = ({component: RouteComponent, routeProps, ...rest}) => {
    const {currentUser} = useContext(AuthenticatorContext);
    return (
        <Route {...rest}
            render={routeProps => {
                    if (currentUser)
                        return <RouteComponent {...routeProps} />;
                    else
                        return <PageNotFoundView/>
                }
            }
        />
    );
};

export default PrivateRoute;