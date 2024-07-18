import axios from "axios"
import { useEffect, useState } from "react"
import "../doctor.css"
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Button,
  } from '@chakra-ui/react'


const BranchAppointments = ({branch, id}) => {
    const url = `http://127.0.0.1:8000/appointments/doctor/${id}?status=Scheduled&branch=${branch}`
    const [appointments, setAppointments] = useState("")

    useEffect(() => {
        const fetchAppointments = async () => {
           try {
            const res = await axios.get(url)
            if (res.status == 200){
                setAppointments(res.data)
                console.log(res.data)
            } else {
                console.log("Error fetching data", res.status)
            }

           } catch (error) {
            console.log(error.response.data)
           }
        }

        fetchAppointments()
    }, [])

  return (
    
        <div className="appointment-branch-container" >
            <TableContainer>
                <Table variant='simple'>
                    <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th><h4>Patient Name <span style={{marginLeft:"10px"}}><i className="fa-solid fa-user"></i></span> </h4></Th>
                        <Th><h4>Reason <span style={{marginLeft:"10px"}}><i className="fa-solid fa-comment"></i></span></h4></Th>
                        <Th><h4>Date <span style={{marginLeft:"10px"}}><i className="fa-solid fa-calendar"></i></span></h4></Th>
                        <Th><h4>Time <span style={{marginLeft:"10px"}}><i className="fa-solid fa-clock"></i></span></h4></Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    { appointments ? appointments.map((appointment) => (
                    <Tr className="table-row" key={appointment._id} >
                        <Td>{appointment._id}</Td>
                        <Td>{appointment.patient_id}</Td>
                        <Td>{appointment.reason}</Td>
                        <Td >{appointment.appointment_date}</Td>
                        <Td>{appointment.appointment_time}</Td>
                        <Td><Button colorScheme="green" variant="outline">View</Button></Td>
                    </Tr>
                        ))  : <Tr>
                                <Td>Loading..</Td>
                            </Tr>}
                    </Tbody>
            
                </Table>
            </TableContainer>

        </div>
  )
}

export default BranchAppointments