import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import "./manageusers.css"
import PatientsTable from './PatientsTable'
import DoctorTable from './DoctorTable'
import ReceptionistTable from './ReceptionistTable'
const ManageUsers = () => {
  return (
    <div className="manage-users-container">
      <div className="tabs-container">
      <Tabs isFitted>
      <TabList mb='1em'>
        <Tab><h3>Patients</h3></Tab>
        <Tab><h3>Doctors</h3></Tab>
        <Tab><h3>Receptionists</h3></Tab>
      </TabList>
      <TabPanels>
        <TabPanel className="table-container">
          <PatientsTable />
        </TabPanel>
        <TabPanel className="table-container">
          <DoctorTable />
        </TabPanel>
        <TabPanel>
          <ReceptionistTable />
        </TabPanel>
      </TabPanels>
    </Tabs>
      </div>
    </div>
  )
}

export default ManageUsers

