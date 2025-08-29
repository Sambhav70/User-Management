import React from "react";
import ModalDialog, {
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
} from "@atlaskit/modal-dialog";
import Button from "@atlaskit/button/new";

export default function  SampleModal({ user, onClose }) {
  return (
    <>
    <ModalDialog onClose={onClose} width="medium">
      <ModalHeader>
        <ModalTitle>Test Modal</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <p>This is a sample modal body. The modal opens and closes!</p>
      </ModalBody>
      <ModalFooter>
        <Button appearance="subtle" onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </ModalDialog>
    </>
  );
}
