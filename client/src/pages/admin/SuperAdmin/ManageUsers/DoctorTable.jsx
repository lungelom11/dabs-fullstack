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
    FormLabel,
    Select,
    useToast,
    Img,
  } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import axios from "axios"
import DoctorInfo from './DoctorInfo'


const DoctorTable = () => {
  const { isOpen: isFirstOpen, onOpen: onFirstOpen, onClose: onFirstClose } = useDisclosure();
  const { isOpen: isSecondOpen, onOpen: onSecondOpen, onClose: onSecondClose } = useDisclosure();

    const [isLoading, setIsLoading] = useState(false)
    const [branchNumber, setBranchNumber] = useState(0)
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [branches, setBranches] = useState(['']);
    const url = "http://127.0.0.1:8000/admin";
    const toast = useToast();
    const [doctors, setDoctors] = useState("");
    const [image_url,setImageUrl] = useState("");
    const [selectedDoctor,setSelectedDoctor] = useState()

    const handleBranchNumberChange = (e) => {
        setBranchNumber(e.target.value)
    }

    const handleBranchChange = (e, index) => {
        const updatedBranches = [...branches];
        updatedBranches[index] = e.target.value;
        setBranches(updatedBranches);
      };

    const handleDoctorCreate = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const data = {
            firstname,
            lastname,
            username,
            email,
            password,
            role: 'doctor',
            branches,
            image_url
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
                    title: "Doctor Created Successfully",
                    description: "Share username and password to doctor via email",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  });
                  setIsLoading(false)
                  window.location.href = "/admin/users";
            } else {
              // Handle errors
              console.error('Failed to create doctor');
              setIsLoading(false)
            }
          } catch (error) {
            console.error('Error:', error);
            setIsLoading(false)
          }
      
        };

      useEffect(() => {
          const fetchDoctors = async () =>{
              const response = await axios.get(url + `/?role=doctor`)
              setDoctors(response.data)
          }
          fetchDoctors()
      }, [])
  
      const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImageUrl(reader.result);
          };
          reader.readAsDataURL(file);
        }
      }

      const handleView = (doctor) => {
        setSelectedDoctor(doctor);
        onSecondOpen();
      };

  return (
    <>
         <div className="top-elements">
            <Button colorScheme='blue' variant="outline" onClick={onFirstOpen}>
                Create Doctor
            </Button>
            <InputGroup width="200px">
                <InputLeftElement pointerEvents='none'>
                <i className='fa-solid fa-magnifying-glass'></i>
            </InputLeftElement>
            <Input type='text' placeholder='Search Doctor' />
            </InputGroup>
         </div>
         
         { doctors ?  
         <TableContainer>
       
            <Table variant='simple'>
                <Thead>
                <Tr>
                    <Th><h4>Doctor ID</h4></Th>
                    <Th><h4>Fullname</h4></Th>
                    <Th><h4>Branches</h4></Th>
                    <Th><h4>Action</h4></Th>
                </Tr>
                </Thead>
                <Tbody>
                {
                  doctors.map((doctor) => (
                    <Tr key={doctor._id}>
                    <Td>{doctor._id}</Td>
                    <Td>Dr {doctor.lastname}</Td>
                    <Td >{doctor.branches.join(', ')}</Td>
                    <Td>
                        <Button colorScheme="green" onClick={() => handleView(doctor)}>View</Button>
                    </Td>
                </Tr>
                  ))
                }
                </Tbody>
            </Table>
        </TableContainer>
        : <h4>Loading..</h4>}
        
        <Modal isOpen={isFirstOpen} onClose={onFirstClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create New Doctor</ModalHeader>
            <ModalCloseButton />
            <form className='doctor-form' onSubmit={handleDoctorCreate}>
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
                    <div className="upload-image-container">
                      {/* upload doctors image upon registration */}
                      <FormControl>
                        <FormLabel>Upload Image:</FormLabel>
                        <Input type="file" placeholder="Upload Doctor Image" style={{padding:"5px"}} onChange={handleFileChange} />
                      </FormControl>
                    </div>
                   <div>
                   <FormLabel>Number of braches?</FormLabel>
                   <Select placeholder="Select number of branches" onChange={handleBranchNumberChange}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                   </Select>
                   </div>

                   {
                        Array.from({ length: branchNumber }).map((_, index) => (
                            <InputGroup key={index}>
                            <InputLeftElement pointerEvents='none'>
                                <i className='fa-solid fa-hospital'></i>
                            </InputLeftElement>
                            <Input type='text' placeholder={index == 0 ? `Branch ${index + 1} (Main Branch)`: `Branch ${index + 1} `}
                            value={branches[index] || ''}
                            onChange={(e) => handleBranchChange(e, index)}/>
                            </InputGroup>
                        ))
                    }

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


        <Modal isOpen={isSecondOpen} onClose={onSecondClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Doctor Info</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <DoctorInfo doctor={selectedDoctor} />
    
            </ModalBody>
  
            <ModalFooter style={{display:"flex", gap:"10px"}}>
                
                <Button colorScheme="green">Update</Button>
                <Button colorScheme="yellow">Set New Password</Button>
                <Button colorScheme="red">Delete</Button>
              
            </ModalFooter>
          </ModalContent>
        </Modal>
    </>
  )
}

export default DoctorTable