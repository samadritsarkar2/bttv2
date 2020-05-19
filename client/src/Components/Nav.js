import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signin, signout } from "../Api/AuthAPI";
import { Navbar, Nav } from "react-bootstrap";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2C3335" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const NavMenu = ({ history }) => {
  const navBar = () => {
    return (
      <div>
        <Navbar sticky="top" bg="info" expand="lg" className="pb-0.5">
          <Navbar.Brand href="/">
            <h3>BTT</h3>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link className="font-weight-bold" href="/all" style={currentTab(history, "/all")}>
                All Posts
              </Nav.Link>
              <Nav.Link className="font-weight-bold" href="/new" style={currentTab(history, "/new")}>
                Add New Post
              </Nav.Link>
            </Nav>
            {!isAuthenticated() && (
              <Nav.Link className="font-weight-bold" style={currentTab(history, "/signin")} href="/signin">
                Signin
              </Nav.Link>
            )}
            {!isAuthenticated() && (
              <Nav.Link className="font-weight-bold" style={currentTab(history, "/signup")} href="/signup">
                SignUp
              </Nav.Link>
            )}
            {isAuthenticated() && (
              <Nav.Link
                className="text-warning font-weight-bold"
                onClick={() => {
                  signout(() => {
                    history.push("/");
                  });
                }}
              >
                Signout
              </Nav.Link>
            )}
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  };

  return <div>{navBar()}</div>;
};

export default withRouter(NavMenu);
