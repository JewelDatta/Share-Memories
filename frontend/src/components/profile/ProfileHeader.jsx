import React from "react";
import defaultCoverImage from "../../assets/img/cover.jpg";
import defaultProfilePic from "../../assets/img/profile.png";

class ProfileHeader extends React.Component {
  render() {
    const { data } = this.props.user;

    return (
      <div className="profile-header mb-2">
        <div className="position-relative">
          <div className="cover-container">
            <img
              src={data.cover_image || defaultCoverImage}
              alt="CoverImg"
              className="img-fluid bg-cover w-100 rounded-0"
            />
          </div>

          <div className="profile-img-container d-flex align-items-center justify-content-between">
            <img
              src={data.profile_image || defaultProfilePic}
              alt="porfileImg"
              className="img-fluid img-border rounded-circle box-shadow-1"
            />
          </div>
        </div>
      </div>
    );
  }
}
export default ProfileHeader;
