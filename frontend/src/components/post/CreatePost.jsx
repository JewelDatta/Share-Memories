import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  FormFeedback,
} from "reactstrap";
import Joi from "joi-browser";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../store/reducers/post";
import ValidateForm from "../common/ValidateForm";
import PostPreview from "./PostPreview";

export class CreatePost extends ValidateForm {
  state = {
    data: {
      caption: "",
    },
    picture: null,
    pictureURL: "",
    error: {},
    isModalOpen: false,
  };

  baseState = this.state;

  static propTypes = {
    addPost: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    if (this.props.error.msg !== prevProps.error.msg) {
      this.setState({ error: this.props.error.msg });
    }
  }

  schema = {
    caption: Joi.string().max(255).required().label("Caption"),
  };

  onImageChange = (e) => {
    // image validation
    const picture = e.currentTarget.files[0];
    const error = { ...this.state.error };
    const types = ["image/png", "image/jpeg", "image/gif"];

    if (!picture) return;

    if (!types.includes(picture.type)) {
      error[e.currentTarget.name] = "Doesn't support the format.";
      this.setState({ error });
      return;
    } else if (picture.size > 5000000) {
      error[e.currentTarget.name] = "Image size can't be more than 5MB.";
      this.setState({ error });
      return;
    }

    delete error[e.currentTarget.name];
    this.setState({ error });

    this.setState({ picture });

    this.setState({
      pictureURL: URL.createObjectURL(picture),
    });
  };

  doSubmit = () => {
    const { picture } = this.state;
    const error = { ...this.state.error };
    if (!picture) {
      error["picture"] = "Image can't be empty";
      this.setState({ error });
      return;
    }

    const data = new FormData();
    data.append("caption", this.state.data.caption);
    data.append("post_image", this.state.picture);

    this.props.addPost(data);

    // Clear the state
    this.setState(this.baseState);
  };

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  render() {
    const { error, data, pictureURL, picture } = this.state;

    return (
      <Container>
        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            <Card>
              <CardHeader>
                <h3>Create Post</h3>
              </CardHeader>
              <CardBody>
                <Form>
                  <FormGroup>
                    <Input
                      type="textarea"
                      name="caption"
                      placeholder="Caption"
                      onChange={this.handleChange}
                      invalid={error.caption ? true : false}
                      value={data.caption}
                    />
                    <FormFeedback>{error.caption}</FormFeedback>
                  </FormGroup>

                  <FormGroup>
                    <Input
                      type="file"
                      name="picture"
                      style={{ display: "none" }}
                      onChange={this.onImageChange}
                      innerRef={(fileInput) => (this.fileInput = fileInput)}
                      invalid={error.picture ? true : false}
                    />
                    <FormFeedback>{error.picture}</FormFeedback>
                  </FormGroup>

                  {pictureURL ? (
                    <Button outline color="success" onClick={this.toggleModal}>
                      Post Preview
                    </Button>
                  ) : (
                    <Button
                      outline
                      color="primary"
                      onClick={() => this.fileInput.click()}
                    >
                      Pick Image
                    </Button>
                  )}

                  <Button
                    className="mt-4"
                    color="primary"
                    type="submit"
                    className="float-right"
                    onClick={this.handleSubmit}
                  >
                    <span style={{ fontWeight: "bold" }}> Post</span>
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {this.state.isModalOpen ? (
          <PostPreview
            toggle={this.toggleModal}
            isModalOpen={this.state.isModalOpen}
            caption={data.caption}
            pictureURL={pictureURL}
          ></PostPreview>
        ) : (
          ""
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.errors,
  post: state.post,
});

export default connect(mapStateToProps, { addPost })(CreatePost);
