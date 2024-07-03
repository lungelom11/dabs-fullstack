/* eslint-disable react/prop-types */
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Stack,
  Textarea,
} from "@chakra-ui/react";

const ModalInformation = ({ onClose }) => {
  return (
    <ModalContent>
      <ModalHeader>Edit Appointment</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Stack spacing={3}>
          <FormControl>
            <FormLabel>Update Date and Time</FormLabel>
            <Input
              placeholder="Select Date and Time"
              size="md"
              type="datetime-local"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Reason:</FormLabel>
            <Textarea placeholder="Reason" />
          </FormControl>
          <FormControl>
            <FormLabel>Note:</FormLabel>
            <Textarea placeholder="Note" />
          </FormControl>
        </Stack>
      </ModalBody>

      <ModalFooter>
        <Button colorScheme="yellow" onClick={onClose}>
          Update
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};

export default ModalInformation;
