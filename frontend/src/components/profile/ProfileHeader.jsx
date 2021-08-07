import React from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  Button,
} from "reactstrap";
import defaultCoverImage from "../../assets/img/cover.png";
// import defaultProfilePic from "../../assets/img/profile.png";

class ProfileHeader extends React.Component {
  state = { dropdownOpen: false };

  toggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };

  render() {
    const { data } = this.props.user;
    const { isSelf, handleFollow, handleUnfollow } = this.props;

    return (
      <Card style={{ paddingBottom: "10px" }}>
        <div className="profile-header mb-2">
          <div className="position-relative">
            <div className="cover-container">
              <img
                src={data.cover_image || defaultCoverImage}
                alt="CoverImg"
                className="img-fluid bg-cover w-100 rounded-0"
              />
            </div>

            {/* <div className="profile-img-container d-flex align-items-center justify-content-between">
              <img
                src={data.profile_image || defaultProfilePic}
                alt="porfileImg"
                className="img-fluid img-border rounded-circle box-shadow-1"
              />
            </div> */}
            <div style={{ float: "left", margin: "30px" }}>
              <b>{data.username}</b>{" "}
            </div>

            <div
              style={{
                float: "right",
                margin: "30px",
              }}
            >
              {!isSelf && (
                <div>
                  {!data.isFollowing && (
                    <Button color="primary" onClick={handleFollow}>
                      Follow
                    </Button>
                  )}
                  {data.isFollowing && (
                    <ButtonDropdown
                      isOpen={this.state.dropdownOpen}
                      toggle={this.toggle}
                    >
                      <DropdownToggle caret color="primary">
                        Following
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem onClick={handleUnfollow}>
                          Unfollow
                        </DropdownItem>
                      </DropdownMenu>
                    </ButtonDropdown>
                  )}
                </div>
              )}
              {/* {isSelf && <Button>Edit</Button>} */}
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default ProfileHeader;
