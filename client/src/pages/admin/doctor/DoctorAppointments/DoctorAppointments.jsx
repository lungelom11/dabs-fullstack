import { Tabs, TabList, TabPanels, Tab, TabPanel, Spinner } from '@chakra-ui/react'
import "../doctor.css"
import { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import BranchAppointments from './BranchAppointments';

const DoctorAppointments = () => {
  const [doctor, setDoctor] = useState("");
  const token = localStorage.getItem("adminToken");
  const {admin_id, role} = jwtDecode(token)
  
  useEffect(() => {
    const fetchDoctor = async () => {
      const response = await axios.get(`http://127.0.0.1:8000/admin/${admin_id}/${role}`);
      try {
        if (response.status == 200){
          setDoctor(response.data)
        }
        else {
          console.log("Error fetch doctor data", response.status)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchDoctor()
  }, [])


  return (
    <div className="doctor-appointments-container">

      <h2>Scheduled Appointments</h2>

      <p>Detailed information about scheduled appointments.</p>

      <div className="tabs-container">
        { doctor ? <Tabs isFitted variant='enclosed'>
            <TabList mb='1em' gap={2} >
              {doctor.branches.map((branch) => (
                <Tab style={{borderBottom:"1px solid gray"}} _selected={{ color: 'white', bg: 'blue.500' }} key={branch}> <span style={{marginRight: "10px"}}><i className='fa-solid fa-hospital'></i></span>{branch}</Tab>
              ))}
            </TabList>
          <TabPanels>
          {doctor.branches.map((branch) => (
              <TabPanel key={branch}><BranchAppointments branch={branch} id={admin_id} /></TabPanel>
            ))}
          </TabPanels>
        </Tabs> : <div style={{height:"200px", textAlign:"center"}}>
        <Spinner size="lg" />
          </div>}
      </div>
    </div>
  )
}

export default DoctorAppointments