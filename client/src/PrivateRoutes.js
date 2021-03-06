import React, { Fragment } from "react";
import {Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./Api/AuthAPI";




const PrivateRoute = ({component : Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated() ? (
            <Component {...props} />
          ) : (
            <Fragment >
           {window.alert("You need to signin first")}
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: props.location }
              }}
            />
            </Fragment>
          )
        }
      />
    );
  }

  export default PrivateRoute;