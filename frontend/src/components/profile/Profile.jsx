import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";
import { connect } from "react-redux";
import ProfileHeader from "./ProfileHeader";
import AboutCard from "./AboutCard";
import NavigationBar from "../NavigationBar";
import { loadPosts, loadPostsByUsername } from "../../store/reducers/post";
import {
  getCurrentUserInfo,
  getUserInfoByUsername,
} from "../../store/reducers/user";
import PostView from "../post/PostView";

export class Profile extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const {
      auth,
      loadPosts,
      match,
      getCurrentUserInfo,
      loadPostsByUsername,
      getUserInfoByUsername,
    } = this.props;

    if (auth.user.username === match.params.username) {
      loadPosts();
      getCurrentUserInfo();
    } else {
      loadPostsByUsername(match.params.username);
      getUserInfoByUsername(match.params.username);
    }
  }

  render() {
    const { user, posts } = this.props;
    return (
      <React.Fragment>
        <NavigationBar></NavigationBar>
        <div className="content">
          <div id="user-profile">
            <Row>
              <Col sm="12">
                {!user.isLoading && user.data && (
                  <ProfileHeader user={this.props.user}></ProfileHeader>
                )}
              </Col>
            </Row>

            <div id="profile-info">
              <Row>
                {!user.isLoading && user.data && (
                  <Col lg="3" md="12">
                    <AboutCard user={this.props.user}></AboutCard>
                  </Col>
                )}

                <Col md="12" lg={{ size: 6 }}>
                  {!user.isLoading &&
                    user.data &&
                    this.props.posts.map((post) => (
                      <PostView
                        key={post.id}
                        post={post}
                        authorImage={this.props.user.data.profile_image}
                      ></PostView>
                    ))}
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.post.list,
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps, {
  loadPosts,
  loadPostsByUsername,
  getCurrentUserInfo,
  getUserInfoByUsername,
})(Profile);
