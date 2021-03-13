import NavigationBar from "./NavigationBar";
import CreatePost from "./post/CreatePost";
import FeedPosts from "./post/FeedPosts";
import React, { Component } from "react";

export class HomePage extends Component {
  render() {
    return (
      <React.Fragment>
        <NavigationBar></NavigationBar>

        <div className="content">
          <CreatePost></CreatePost>
          <FeedPosts></FeedPosts>
        </div>
      </React.Fragment>
    );
  }
}

export default HomePage;
