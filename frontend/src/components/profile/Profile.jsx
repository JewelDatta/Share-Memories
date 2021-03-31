import React, { useEffect } from "react";
import { Row, Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
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

export default function Profile(props) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.post.profilePost);

  useEffect(() => {
    dispatch(loadPostsByUsername(props.match.params.username));
    dispatch(getUserInfoByUsername(props.match.params.username));
  }, [props.match.params.username]);

  const handleFollow = () => {
    dispatch(followUser(props.match.params.username));
    window.location.reload();
  };

  const handleUnfollow = () => {
    dispatch(unfollowUser(props.match.params.username));
    window.location.reload();
  };

  return (
    <React.Fragment>
      <NavigationBar></NavigationBar>
      <div className="content">
        <div id="user-profile">
          {/* user profile header section */}
          <Row>
            <Col sm="12">
              {!user.isLoading && user.data && auth.user && (
                <ProfileHeader
                  user={user}
                  isSelf={auth.user.username === props.match.params.username}
                  handleFollow={handleFollow}
                  handleUnfollow={handleUnfollow}
                ></ProfileHeader>
              )}
            </Col>
          </Row>

          {/* user about section */}
          <div id="profile-info">
            <Row>
              {!user.isLoading && user.data && (
                <Col lg="3" md="12">
                  <AboutCard user={user}></AboutCard>
                </Col>
              )}

              {/* render all posts */}
              {!user.isLoading && user.data && !posts.isLoading && posts.list && (
                <Col md="12" lg={{ size: 6 }}>
                  <InfiniteScroll
                    pageStart={0}
                    loadMore={() => loadMorePostsByUsername(posts.next)}
                    hasMore={posts.next !== null}
                    loader={
                      <div
                        key={0}
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
                        authorImage={user.data.profile_image}
                      ></PostView>
                    ))}
                  </InfiniteScroll>
                </Col>
              )}
            </Row>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
