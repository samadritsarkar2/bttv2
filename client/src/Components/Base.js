import React from 'react';
import "../index.css"
import Nav from './Nav';
import { API } from '../backend';
import {  } from 'react-bootstrap'


const Base = (
    {
        title = "My Title",
        description = "",
        className="container rounded bg-light text-dark p-4",
        homePage = "container bg-light justify-content-end",
        children
      }
) => {
    return (
      <div>
        <Nav />
        <div className="container bg-light">
          <div className="container bg-light text-center p-2 mb-2">
            <h2 className="display-4"> {title} </h2>
            <p className="lead"> {description} </p> 
          </div>
        </div>
        <p className={className}> {children} </p>
      </div>
    );
}
 
export default Base;