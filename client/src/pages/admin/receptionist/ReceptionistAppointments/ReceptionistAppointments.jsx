import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import PendingTable from "./PendingTable"
import ActiveTable from './ActiveTable'
import CancelTable from './CancelTable'
const ReceptionistAppointments = () => {
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
          <PendingTable />
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

