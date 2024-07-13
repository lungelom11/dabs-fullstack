import { Tabs, TabList, TabPanels, Tab, TabPanel, useToast } from '@chakra-ui/react'
import PendingTable from "./PendingTable"
import ActiveTable from './ActiveTable'
import CancelTable from './CancelTable'
import axios from "axios"

const ReceptionistAppointments = () => {
  const url = "http://127.0.0.1:8000/appointments";
  const toast = useToast();
  const deleteAppointment = async (id) => {
    try {
        const response = await axios.delete(url + `/${id}`);
        toast({
            title: "Appointment Deleted Successfully",
            // description: "Redirecting to the dashboard",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
    } catch (error) {
        console.log("An erro occured", error)
    }
  }

  return (
    <div className="manage-users-container">
      <div className="tabs-container">
      <Tabs isFitted>
      <TabList mb='1em'>
        <Tab><h3 style={{color: "gold"}}>Pending</h3></Tab>
        <Tab><h3 style={{color: "green"}}>Active</h3></Tab>
        <Tab><h3 style={{color: "red"}}>Cancelled</h3></Tab>
      </TabList>
      <TabPanels>
        <TabPanel className="table-container">
          <PendingTable deleteAppointment={deleteAppointment} />
        </TabPanel>
        <TabPanel className="table-container">
        <ActiveTable />
        </TabPanel>
        <TabPanel className='table-container'>
          <CancelTable />
        </TabPanel>
      </TabPanels>
    </Tabs>
      </div>
    </div>
  )
}

export default ReceptionistAppointments

