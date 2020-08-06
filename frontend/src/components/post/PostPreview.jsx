import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const PostPreview = (props) => {
  const { toggle, isModalOpen, caption, pictureURL } = props;

  return (
    <div>
      <Modal isOpen={isModalOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Post Preview</ModalHeader>
        <ModalBody>
          <p>{caption}</p>
          <img src={pictureURL} alt="" className="img-thumbnail"></img>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default PostPreview;
