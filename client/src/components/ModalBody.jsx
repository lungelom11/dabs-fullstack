/* eslint-disable react/prop-types */
import { ModalContent, ModalHeader, ModalCloseButton } from "@chakra-ui/react";
import LoginForm from "./Forms/LoginForm";

const ModalBody = ({ initialRef }) => {
  return (
    <ModalContent>
      <ModalHeader>Login to your account</ModalHeader>
      <ModalCloseButton />

      <LoginForm initialRef={initialRef} />
    </ModalContent>
  );
};

export default ModalBody;
