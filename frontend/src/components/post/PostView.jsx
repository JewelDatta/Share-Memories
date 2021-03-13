import React from "react";
import {
  Card,
  CardBody,
  // UncontrolledTooltip,
  // Input,
  // Label,
  // Button,
} from "reactstrap";
import moment from "moment";
import { Heart, MessageSquare } from "react-feather";
import defaultProfilePic from "../../assets/img/profile.png";

class PostView extends React.Component {
  render() {
    const { post } = this.props;

    return (
      <React.Fragment>
        <Card>
          <CardBody>
            <div className="d-flex justify-content-start align-items-center mb-1">
              <div className="avatar mr-1">
                <img
                  src={post.author_image || defaultProfilePic}
                  alt="profile pic"
                  height="45"
                  width="45"
                />
              </div>
              <div className="user-page-info">
                <p className="mb-0">{post.author}</p>
                <span className="font-small-2">
                  {moment(post.created_at).fromNow()}
                </span>
              </div>
              <div className="ml-auto user-like">
                <Heart fill="#EA5455" stroke="#EA5455" />
              </div>
            </div>
            <p>{post.caption}</p>
            <img
              src={post.post_image}
              alt="postImg1"
              className="img-fluid rounded-sm mb-2"
            />

            {/* <div className="d-flex justify-content-start align-items-center mb-1">
              <div className="d-flex align-items-center">
                <Heart fill="#EA5455" stroke="#EA5455" />
                100
              </div>
              <p className="ml-auto">
                <MessageSquare size={16} color={"red"} className="mr-50" />
                50
              </p>
            </div>

            <div className="d-flex justify-content-start align-items-center mb-1">
              <div className="avatar mr-50">
                <img
                  src={defaultProfilePic}
                  alt="Avatar"
                  height="30"
                  width="30"
                />
              </div>
              <div className="user-page-info">
                <h6 className="mb-0">Test User 1</h6>
                <span className="font-small-2">Test Comment 1</span>
              </div>
            </div>

            <div className="d-flex justify-content-start align-items-center mb-2">
              <div className="avatar mr-50">
                <img
                  src={defaultProfilePic}
                  alt="Avatar"
                  height="30"
                  width="30"
                />
              </div>
              <div className="user-page-info">
                <h6 className="mb-0">Test User 2</h6>
                <span className="font-small-2">Test Comment 2</span>
              </div>
            </div>

            <fieldset className="form-label-group">
              <Input
                type="textarea"
                rows="3"
                placeholder="Add Comment"
                id="add-comment"
              />
            </fieldset>
            <Button size="sm" color="primary" className="mt-1">
              Post Comment
            </Button> */}
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}
export default PostView;
