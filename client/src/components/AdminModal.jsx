/* eslint-disable react/prop-types */
import { ModalContent, ModalHeader, ModalCloseButton } from "@chakra-ui/react";
import AdminForm from "./Forms/AdminForm";

const ModalBody = ({ initialRef }) => {
  return (
    <ModalContent>
      <ModalHeader>Admin Login</ModalHeader>
      <ModalCloseButton />

      <AdminForm initialRef={initialRef} />
    </ModalContent>
  );
};

export default ModalBody;
