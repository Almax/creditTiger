import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { Navbar, NavItem, Nav } from 'react-bootstrap/lib';
import { toggleFilterMenu, setScreenSize } from 'redux/modules/view';
import Helmet from 'react-helmet';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { push } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!isInfoLoaded(getState())) {
      promises.push(dispatch(loadInfo()));
    }
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }

    return Promise.all(promises);
  }
}])

@connect(
  state => (
    {
      user: state.auth.user,
      view: state.view
    }
  ),
  dispatch => bindActionCreators(
    {
      toggleFilterMenu,
      setScreenSize,
      logout,
      pushState: push
    },
    dispatch
  )
)

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    toggleFilterMenu: PropTypes.func,
    setScreenSize: PropTypes.func,
    view: PropTypes.object
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState('/loginSuccess');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  handleSelect = () => {
    const { toggleFilterMenu, view } = this.props; // eslint-disable-line no-shadow

    const showFilterMenu = view.showFilterMenu;
    toggleFilterMenu(!showFilterMenu);
  };

  render() {
    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>
        <Navbar fixedTop className={styles.navBar}>
          <Navbar.Header>
            <Navbar.Brand>
              <IndexLink to="/">
                <span className={styles.brand}>{config.app.name}</span>
              </IndexLink>
            </Navbar.Brand>
            <Nav pullRight className={styles.navRight}>
              <NavItem eventKey={11} className={styles.filterButton} onSelect={this.handleSelect}>FILTER</NavItem>
            </Nav>
          </Navbar.Header>
        </Navbar>

        <div className={styles.appContent}>
          {this.props.children}
        </div>
        <div className={styles.footer}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8 col-md-offset-2">
                <div className={styles.title}>
                  {config.app.name}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8 col-md-offset-2">
                <div className={styles.main_text}>
                  © 2016 {config.app.name}, All Rights Reserved
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8 col-md-offset-2">
                <div className={styles.main_text}>
                  Designed & Developed by {config.app.name}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// <div className="fb-like" data-href="https://www.facebook.com/freetravelguy/" data-layout="button_count" data-action="recommend" data-size="large" data-show-faces="true" data-share="true"></div>

// <Navbar.Collapse eventKey={0}>
//   <Nav navbar>
//     {user && <LinkContainer to="/chat">
//       <NavItem eventKey={1}>Chat</NavItem>
//     </LinkContainer>}

//     <LinkContainer to="/widgets">
//       <NavItem eventKey={2}>Widgets</NavItem>
//     </LinkContainer>
//     <LinkContainer to="/survey">
//       <NavItem eventKey={3}>Survey</NavItem>
//     </LinkContainer>
//     <LinkContainer to="/about">
//       <NavItem eventKey={4}>About Us</NavItem>
//     </LinkContainer>
//     <LinkContainer to="/credit">
//       <NavItem eventKey={7}>Hello</NavItem>
//     </LinkContainer>

//     {!user &&
//     <LinkContainer to="/login">
//       <NavItem eventKey={5}>Login</NavItem>
//     </LinkContainer>}
//     {user &&
//     <LinkContainer to="/logout">
//       <NavItem eventKey={6} className="logout-link" onClick={this.handleLogout}>
//         Logout
//       </NavItem>
//     </LinkContainer>}
//   </Nav>
//   {user &&
//   <p className={styles.loggedInMessage + ' navbar-text'}>Logged in as <strong>{user.name}</strong>.</p>}
//   <Nav navbar pullRight>
//     <NavItem eventKey={1} target="_blank" title="View on Github" href="https://github.com/erikras/react-redux-universal-hot-example">
//       <i className="fa fa-github"/>
//     </NavItem>
//   </Nav>
// </Navbar.Collapse>
