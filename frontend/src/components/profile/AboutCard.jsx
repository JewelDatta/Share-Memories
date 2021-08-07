import React from "react";
import moment from "moment";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";

class AboutCard extends React.Component {
  render() {
    const { data } = this.props.user;

    return (
      <Card>
        {/* <CardHeader> */}
        {/* <CardTitle>Bio:</CardTitle> */} {/* </CardHeader> */}
        <CardBody>
          {/* <p>{data.bio}</p> */}

          <div className="mt-1">
            <h6 className="mb-0">Email:</h6>
            <p>{data.email}</p>
          </div>
          <div className="mt-1">
            <h6 className="mb-0">Joined:</h6>
            <p>{moment(data.date_joined).format("MMMM-YYYY")}</p>
          </div>
        </CardBody>
      </Card>
    );
  }
}
export default AboutCard;
