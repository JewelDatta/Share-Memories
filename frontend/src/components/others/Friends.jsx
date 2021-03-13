import React, { Component } from "react";
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
import { getFriends } from "../../store/reducers/user";

export class Friends extends Component {
  componentDidMount() {
    this.props.getFriends();
  }

  render() {
    const { followers, followings } = this.props.user;

    return (
      <React.Fragment>
        <NavigationBar></NavigationBar>

        <div className="content">
          <Row>
            <Col sm="12" md={{ size: 6 }}>
              <Card>
                <CardHeader>
                  <CardTitle>
                    <h2>Followings({followings.length})</h2>
                  </CardTitle>
                </CardHeader>

                <CardBody>
                  {followings &&
                    followings.map((user) => (
                      <ListGroup key={user}>
                        <ListGroupItem>
                          <Row>
                            <Col sm="6">
                              <p style={{ fontWeight: "bold" }}>{user}</p>
                            </Col>

                            <Col sm="6">
                              <Link
                                className="view-profile-button"
                                to={{
                                  pathname: `/profile/${user}`,
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

            <Col sm="12" md={{ size: 5, offset: 1 }}>
              <Card>
                <CardHeader>
                  <CardTitle>
                    <h2>Followers({followers.length})</h2>
                  </CardTitle>
                </CardHeader>

                <CardBody>
                  {followers &&
                    followers.map((user) => (
                      <ListGroup key={user}>
                        <ListGroupItem>
                          <Row>
                            <Col sm="6">
                              <p style={{ fontWeight: "bold" }}>{user}</p>
                            </Col>

                            <Col sm="6">
                              <Link
                                className="view-profile-button"
                                to={{
                                  pathname: `/profile/${user}`,
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

export default connect(mapStateToProps, { getFriends })(Friends);
