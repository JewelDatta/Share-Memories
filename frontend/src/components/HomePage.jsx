import React from "react";
import NavigationBar from "./NavigationBar";
import CreatePost from "./post/CreatePost";

export default function Dashboard() {
  return (
    <React.Fragment>
      <NavigationBar></NavigationBar>
      <div className="content">
        <CreatePost></CreatePost>
      </div>
    </React.Fragment>
  );
}
