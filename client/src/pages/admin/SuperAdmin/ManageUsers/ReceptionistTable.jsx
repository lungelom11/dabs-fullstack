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
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    Stack,
    useToast,
  } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import axios from "axios"


const ReceptionistTable = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLoading, setIsLoading] = useState(false)
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [branches, setBranches] = useState(['']);
    const url = "http://127.0.0.1:8000/admin";
    const toast = useToast();
    const [receptionists, setReceptionists] = useState("")

    const handleReceptionistCreate = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const data = {
            firstname,
            lastname,
            username,
            email,
            password,
            role: 'receptionist',
            branches: [branches]
          };
      
          console.log(data)
          try {
            const response = await axios.post(url, data, {
              headers: {
                'Content-Type': 'application/json'
              }
            });
      
            if (response.status === 200 || response.status === 201) {
                toast({
                    title: "Receptionist Created Successfully",
                    message: "Share username and password to doctor via email",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  });
                  setIsLoading(false)
                  window.location.href = "/admin/users";
            } else {
              // Handle errors
              console.error('Failed to create Receptionist');
              setIsLoading(false)
            }
          } catch (error) {
            console.error('Error:', error);
            setIsLoading(false)
          }
        
    };

        useEffect(() => {
            const fetchReceptionists = async () =>{
                const response = await axios.get(url + `/?role=receptionist`)
                setReceptionists(response.data)
            }
            fetchReceptionists()
        }, [])


  return (
    <>
         <div className="top-elements">
            <Button colorScheme='blue' variant="outline" onClick={onOpen}>
                Create Receptionist
            </Button>
            <InputGroup width="200px">
                <InputLeftElement pointerEvents='none'>
                <i className='fa-solid fa-magnifying-glass'></i>
            </InputLeftElement>
            <Input type='text' placeholder='Search Receptionist' />
            </InputGroup>
         </div>
         { receptionists ?  
         <TableContainer>
       
            <Table variant='simple'>
                <Thead>
                <Tr>
                    <Th><h4>Receptionist ID</h4></Th>
                    <Th><h4>Fullname</h4></Th>
                    <Th><h4>Branches</h4></Th>
                    <Th><h4>Action</h4></Th>
                </Tr>
                </Thead>
                <Tbody>
                {
                  receptionists.map((receptionist) => (
                    <Tr key={receptionist._id}>
                    <Td>{receptionist._id}</Td>
                    <Td>{receptionist.firstname} {receptionist.lastname}</Td>
                    <Td >{receptionist.branches}</Td>
                    <Td>
                        <span className="delete-icon" title='Delete Patient'>
                            <i className="fa-solid fa-trash-can"></i>
                        </span>
                        <span className="view-icon" title='View Patient'>
                        <i className="fa-solid fa-eye"></i>
                        </span>
                    </Td>
                </Tr>
                  ))
                }
                </Tbody>
            </Table>
        </TableContainer>
        : <h4>Loading..</h4>}

<Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create New Doctor</ModalHeader>
            <ModalCloseButton />
            <form className='doctor-form' onSubmit={handleReceptionistCreate}>
            <ModalBody>
              
                <FormControl>
                   <Stack spacing={5}>
                   <div style={{display: "flex", gap:"15px"}}>
                        <Input placeholder="Firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)}/>
                        <Input placeholder="Lastname"  value={lastname} onChange={(e) => setLastname(e.target.value)}/>
                   </div>
                   <div style={{display: "flex", gap:"15px"}}>
                        <Input placeholder="Username"  value={username} onChange={(e) => setUsername(e.target.value)} />
                        <Input type="email" placeholder="Email"  value={email} onChange={(e) => setEmail(e.target.value)} />
                   </div>

                   <div>
                   </div>

                   <InputGroup>
                        <InputLeftElement pointerEvents='none'>
                            <i className='fa-solid fa-hospital'></i>
                        </InputLeftElement>
                        <Input type='text' placeholder="Branch" 
                        value={branches}
                        onChange={(e) => setBranches(e.target.value)}/>
                        </InputGroup>
                   
                            


                    <Input placeholder="Create Password"  value={password} onChange={(e) => setPassword(e.target.value)} />
                   </Stack>
                </FormControl>
              
            </ModalBody>
  
            <ModalFooter>
              <Button type='submit' colorScheme='blue' isLoading={isLoading}>Register</Button>
            </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
    </>
  )
}

export default ReceptionistTable