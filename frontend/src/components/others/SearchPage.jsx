import React, { Component } from "react";
import queryString from "query-string";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Button,
} from "reactstrap";
import NavigationBar from "../NavigationBar";
import { searchUser } from "../../store/reducers/user";

class SearchPage extends Component {
  componentDidMount() {
    const keyword = queryString.parse(this.props.location.search).username;
    this.props.searchUser(keyword);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      const keyword = queryString.parse(this.props.location.search).username;
      this.props.searchUser(keyword);
    }
  }
  render() {
    return (
      <React.Fragment>
        <NavigationBar></NavigationBar>

        <div className="content">
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <Card>
                <CardHeader>
                  <CardTitle>
                    <h2>
                      Showing result for "
                      {queryString.parse(this.props.location.search).username}"
                    </h2>
                  </CardTitle>
                </CardHeader>

                <CardBody>
                  {this.props.user.list &&
                    this.props.user.list.map((user) => (
                      <ListGroup key={user.username}>
                        <ListGroupItem>
                          <Row>
                            <Col sm="6">
                              <p style={{ fontWeight: "bold" }}>
                                {user.username}
                              </p>
                            </Col>

                            <Col sm="6">
                              <Link
                                className="view-profile-button"
                                to={{
                                  pathname: `/profile/${user.username}`,
                                }}
                              >
                                <Button
                                  className="float-right"
                                  size="sm"
                                  color="primary"
                                >
                                  View Profile
                                </Button>
                              </Link>
                            </Col>
                          </Row>
                        </ListGroupItem>
                      </ListGroup>
                    ))}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { searchUser })(SearchPage);
