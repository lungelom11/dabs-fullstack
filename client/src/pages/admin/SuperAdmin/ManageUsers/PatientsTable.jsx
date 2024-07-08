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
    useToast
  } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import axios from "axios"


const PatientsTable = () => {
    const [patients, setPatients] = useState(null)
    const url = "http://127.0.0.1:8000/patients"
    const toast = useToast()

    useEffect(() => {
        const fetchPatients = async () =>{
            const response = await axios.get(url)
            setPatients(response.data.patients)
        }
        fetchPatients()
    }, [])

   
    const handleDelete = (id) => {
        const response = axios.delete(url + `/${id}`)
            toast({
              title: "Patient Deleted Successfully",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            window.location.href = "/admin/users";   
}

  return (
    <>
        <InputGroup width="200px" style={{marginLeft:"auto"}}>
            <InputLeftElement pointerEvents='none'>
            <i className='fa-solid fa-magnifying-glass'></i>
        </InputLeftElement>
         <Input type='text' placeholder='Search Patient' />
        </InputGroup>
        <TableContainer>
       
       <Table variant='simple'>
           <Thead>
           <Tr>
               <Th><h4>Patient ID</h4></Th>
               <Th><h4>Fullname</h4></Th>
               <Th><h4>Address</h4></Th>
               <Th><h4>Action</h4></Th>
           </Tr>
           </Thead>
           <Tbody>
           {patients ? 
           patients.map((patient) => (<Tr key={patient._id}>
            <Td>{patient._id}</Td>
            <Td>{patient.firstname} {patient.lastname}</Td>
            <Td >{patient.address.street}, {patient.address.suburb}, {patient.address.city}</Td>
            <Td>
                <span onClick={() => handleDelete(patient._id)} className="delete-icon" title='Delete Patient'>
                    <i className="fa-solid fa-trash-can"></i>
                </span>
                <span className="view-icon" title='View Patient'>
                <i className="fa-solid fa-eye"></i>
                </span>
            </Td>
        </Tr>)) : <Tr>
                <Td>Loading..</Td>
            </Tr>}
           </Tbody>
       </Table>
        </TableContainer>
    </>
   
  )
}

export default PatientsTable