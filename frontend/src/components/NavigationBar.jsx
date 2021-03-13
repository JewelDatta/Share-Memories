import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import { NavLink as RRNavLink, Link } from "react-router-dom";
import { User, Home, Users } from "react-feather";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../store/reducers/auth";
import { withRouter } from "react-router-dom";

export class NavigationBar extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

  state = {
    keyword: "",
    isOpen: false,
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  handleSearchTextChange = (event) => {
    this.setState({ keyword: event.target.value });
  };

  handleSearchKeyPress = (event) => {
    const { keyword } = this.state;
    if (event.key === "Enter") {
      event.preventDefault();
      if (keyword !== "") {
        this.props.history.push(`/search?username=${keyword}`);
      }
    }
  };

  onSearchClick = () => {
    const { keyword } = this.state;
    if (keyword !== "") {
      this.props.history.push(`/search?username=${keyword}`);
    }
  };

  handleLogOut = async () => {
    const { history, logout } = this.props;
    await logout();
    history.push("/login");
  };

  render() {
    if (!this.props.auth.user) {
      return <React.Fragment></React.Fragment>;
    }
    const { username } = this.props.auth.user;
    const { keyword } = this.state;

    return (
      <Navbar color="faded" light expand="md" fixed="top">
        <NavbarBrand href="/">Share Memory</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <div>
          <InputGroup>
            <Input
              placeholder="Search User"
              value={keyword}
              onChange={this.handleSearchTextChange}
              onKeyPress={this.handleSearchKeyPress}
            />
            <InputGroupAddon addonType="append">
              <InputGroupText
                style={{ cursor: "pointer" }}
                onClick={this.onSearchClick}
              >
                Search
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </div>

        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={RRNavLink} exact to="/">
                <Home size={23} />
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink tag={RRNavLink} exact to="/friends">
                <Users size={23} />
              </NavLink>
            </NavItem>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <User size={23} />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag={Link} to={`/profile/${username}`}>
                  Profile
                </DropdownItem>

                <DropdownItem divider />
                <DropdownItem onClick={this.handleLogOut}>Logout</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default withRouter(connect(mapStateToProps, { logout })(NavigationBar));
