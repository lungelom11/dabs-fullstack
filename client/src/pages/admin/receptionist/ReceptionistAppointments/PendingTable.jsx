import "../receptionist.css"

import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    InputGroup,
    InputLeftElement,
    Input,
    Button,
    Modal,
    ModalOverlay,
    useDisclosure,
  } from '@chakra-ui/react'

import { useEffect, useState } from 'react'
import axios from "axios"
import AppointmentModal from "./AppointmentModal"

const PendingTable = ({deleteAppointment}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
    const [pendingAppoingments, setPendingAppoingments] = useState("")
    const url = "http://127.0.0.1:8000/appointments";
    const [selectedAppointment,setSelectedAppointment] = useState("")

    useEffect(() => {
        const fetchPendingAppointments = async () =>{
        const response = await axios.get(url + `/?status=Pending`)
        setPendingAppoingments(response.data)
        }
        fetchPendingAppointments()
      }, [])
      
      const handleEditClick = (appointment) => {
        setSelectedAppointment(appointment);
        onOpen();
      };

  return (
    <>
         <div className="top-elements">
            <InputGroup width="200px">
                <InputLeftElement pointerEvents='none'>
                <i className='fa-solid fa-magnifying-glass'></i>
            </InputLeftElement>
            <Input type='text' placeholder='Search Appointment' />
            </InputGroup>
         </div>
         
         { pendingAppoingments.length >= 1 ?  
         <TableContainer>
       
            <Table variant='simple'>
                <Thead>
                <Tr>
                    <Th><h4>Appointment ID</h4></Th>
                    <Th><h4>Patient</h4></Th>
                    <Th><h4>Date and Time</h4></Th>
                    <Th><h4>Branch</h4></Th>
                </Tr>
                </Thead>
                <Tbody>
                {
                  pendingAppoingments.map((appointment) => (
                    <Tr key={appointment._id}>
                        <Td>{appointment._id}</Td>
                    <Td>{appointment.patient_id}</Td>
                    <Td>{appointment.appointment_date} , {appointment.appointment_time}</Td>
                    <Td >{appointment.branch}</Td>
                    <Td>
                        <span className="delete-icon" title='Delete Patient' onClick={() => {
                          if (confirm("Are you sure you want to delete?")) {
                            deleteAppointment(appointment._id)
                          }
                        }} >
                            <i className="fa-solid fa-trash-can"></i>
                        </span>
                        <Button colorScheme="green" onClick={()=> handleEditClick(appointment)}>Edit</Button>
                    </Td>
                    
                </Tr>
                  ))
                }
                </Tbody>
            </Table>
        </TableContainer>


        : <div className='spinner-container'>
              <h3>No pending appointments</h3>
          </div>
        }

    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
        <AppointmentModal selectedAppointment={selectedAppointment} />
    </Modal>            
       
    </>
  )
}

export default PendingTable


