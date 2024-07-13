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
  Spinner,
  Stack,
  Textarea,useToast
} from "@chakra-ui/react";
import useAppointmentData from "../../../hooks/useAppointmentData";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const ModalInformation = ({ onClose }) => {

  const {bookedAppointment} = useAppointmentData();
  const [appointment_date, setAppointmentDate] = useState("");
  const [appointment_time, setAppointmentTime] = useState("");
  const [branch, setBranch] = useState("");
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading,setIsLoading] = useState(false);
  const url = "http://127.0.0.1:8000/appointments/";
  const navigate = useNavigate();
  const toast = useToast();



  useEffect(() => {
    if (bookedAppointment) {
      setAppointmentDate(bookedAppointment.appointment_date)
      setAppointmentTime(bookedAppointment.appointment_time)
      setBranch(bookedAppointment.branch)
      setReason(bookedAppointment.reason)
      setNotes(bookedAppointment.notes)
    }
  }, [bookedAppointment])

  const handleUpdate = async () => {
    setIsLoading(true);

    const updateData = {
      appointment_date,
      appointment_time,
      branch,
      reason,
      notes,
    };

    try {
      await axios.put(`${url}${bookedAppointment._id}`, updateData);
      toast({
        title: "Updated Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setIsLoading(false);
      window.location.href = "/patient/view"
    } catch (error) {
      toast({
        title: "Failed to Update",
        description: error.response ? error.response.data.message : error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setIsLoading(false)
    }};
  return (
    <ModalContent>
      <ModalHeader>Edit Appointment</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Stack spacing={3}>
         { bookedAppointment ? <>
          <FormControl>
            <FormLabel>Update Date and Time</FormLabel>
          <div style={{display:"flex", gap:"10px"}}>
            <Input value={appointment_date}  onChange={(e) => setAppointmentDate(e.target.value)} />
            <Input value={appointment_time} onChange={(e) => setAppointmentTime(e.target.value)} />
          </div>
          </FormControl>

          <FormControl>
            <FormLabel>Branch:</FormLabel>
            <Input value={branch} onChange ={(e) => setBranch(e.target.value)}/>
          </FormControl>
          <FormControl>
            <FormLabel>Reason:</FormLabel>
            <Textarea placeholder="Reason" value={reason} onChange={(e) => setReason(e.target.value)}/>
          </FormControl>
          <FormControl>
            <FormLabel>Note:</FormLabel>
            <Textarea placeholder="Note" value={notes}  onChange ={(e) => setNotes(e.target.value)}/>
          </FormControl></> : <Spinner />}
        </Stack>
      </ModalBody>

      <ModalFooter>
        <Button isLoading={isLoading} colorScheme="yellow" onClick={handleUpdate}>
          Update
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};

export default ModalInformation;
