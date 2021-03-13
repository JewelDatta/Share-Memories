import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroller";
import PostView from "../post/PostView";
import { loadFeedPosts, loadMoreFeedPosts } from "../../store/reducers/post";

export class FeedPosts extends Component {
  componentDidMount() {
    const { loadFeedPosts } = this.props;
    loadFeedPosts();
  }

  render() {
    const { posts } = this.props;

    return (
      <div>
        <Container>
          <Row>
            <Col sm={{ size: 6, offset: 3 }}>
              {/* render all posts */}
              {!posts.isLoading && posts.list && (
                <InfiniteScroll
                  pageStart={0}
                  loadMore={() => this.props.loadMoreFeedPosts(posts.next)}
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
                    <PostView key={post.id} post={post}></PostView>
                  ))}
                </InfiniteScroll>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.post.feedPost,
});

export default connect(mapStateToProps, {
  loadFeedPosts,
  loadMoreFeedPosts,
})(FeedPosts);
