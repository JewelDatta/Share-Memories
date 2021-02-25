import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";
import { connect } from "react-redux";
import ProfileHeader from "./ProfileHeader";
import AboutCard from "./AboutCard";
import NavigationBar from "../NavigationBar";
import InfiniteScroll from "react-infinite-scroller";
import {
  loadPostsByUsername,
  loadMorePostsByUsername,
} from "../../store/reducers/post";
import {
  getUserInfoByUsername,
  followUser,
  unfollowUser,
} from "../../store/reducers/user";
import PostView from "../post/PostView";

export class Profile extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const {
      auth,
      match,
      loadPostsByUsername,
      getUserInfoByUsername,
    } = this.props;

    loadPostsByUsername(match.params.username);
    getUserInfoByUsername(match.params.username);
  }

  componentWillUpdate(prevProps) {
    if (this.props.match.params.username !== prevProps.match.params.username) {
      window.location.reload();
    }
  }

  handleFollow = () => {
    const { followUser, match } = this.props;
    followUser(match.params.username);
    window.location.reload();
  };

  handleUnfollow = () => {
    const { unfollowUser, match } = this.props;
    unfollowUser(match.params.username);
    window.location.reload();
  };

  loadMorePosts = () => {
    console.log("load more");
  };

  render() {
    const { user, posts, auth, match } = this.props;

    return (
      <React.Fragment>
        <NavigationBar></NavigationBar>
        <div className="content">
          <div id="user-profile">
            {/* user profile header section */}
            <Row>
              <Col sm="12">
                {!user.isLoading && user.data && (
                  <ProfileHeader
                    user={this.props.user}
                    isSelf={auth.user.username === match.params.username}
                    handleFollow={this.handleFollow}
                    handleUnfollow={this.handleUnfollow}
                  ></ProfileHeader>
                )}
              </Col>
            </Row>

            {/* user about section */}
            <div id="profile-info">
              <Row>
                {!user.isLoading && user.data && (
                  <Col lg="3" md="12">
                    <AboutCard user={this.props.user}></AboutCard>
                  </Col>
                )}

                {/* render all posts */}
                {!user.isLoading &&
                  user.data &&
                  !posts.isLoading &&
                  posts.list && (
                    <Col md="12" lg={{ size: 6 }}>
                      <InfiniteScroll
                        pageStart={0}
                        loadMore={() =>
                          this.props.loadMorePostsByUsername(posts.next)
                        }
                        hasMore={posts.next !== null}
                        loader={
                          <div
                            key={user.data.username}
                            className="spinner-border text-primary m-5"
                            role="status"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        }
                      >
                        {posts.list.map((post) => (
                          <PostView
                            key={post.id}
                            post={post}
                            authorImage={this.props.user.data.profile_image}
                          ></PostView>
                        ))}
                      </InfiniteScroll>
                    </Col>
                  )}

                {/* <Col md="12" lg={{ size: 6 }}>
                  {!user.isLoading &&
                    user.data &&
                    posts &&
                    posts.map((post) => (
                      <PostView
                        key={post.id}
                        post={post}
                        authorImage={this.props.user.data.profile_image}
                      ></PostView>
                    ))}
                </Col> */}
              </Row>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.post.profilePost,
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps, {
  loadPostsByUsername,
  getUserInfoByUsername,
  followUser,
  unfollowUser,
  loadMorePostsByUsername,
})(Profile);
