import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Button,
} from '@chakra-ui/react'
import "../../receptionist/receptionist.css"
import "../doctor.css"
import useAdminData from '../../../../hooks/useAdminData'

const DoctorHome = () => {
  const {doctorData} = useAdminData()

  return (
    <div>
      <StatGroup>
        <div className="stat-container">
        <Stat className="stat">
          <StatLabel className='header'>Today's Appointments</StatLabel>
           <StatNumber className="numbers">8</StatNumber>
          <StatHelpText className='change'>
            <StatArrow  type='increase' />
            23.36%
          </StatHelpText>
        </Stat>
        <Stat className="stat">
          <StatLabel className='header'>Pending Appointments</StatLabel>
           <StatNumber className="numbers">21</StatNumber>
          <StatHelpText className='change'>
            <StatArrow type='increase' />
            23.36%
          </StatHelpText>
        </Stat>
        <Stat className="stat">
          <StatLabel className='header'>Completed</StatLabel>
           <StatNumber className="numbers">3</StatNumber>
          <StatHelpText className='change'>
            <StatArrow type='increase' />
            9.05%
          </StatHelpText>
        </Stat>
        </div>
      </StatGroup>

      <div className="doctor-summary-container">
        <div className="doctor-summary">
        <h4>Appointments to attend today: </h4>
      <StatGroup>
        <div className="braches-stat">
        <Stat className='branch-stat'>
        <StatLabel > <i className='fa-solid fa-hospital'></i> Pretoria Branch</StatLabel>
            <StatNumber className='numbers' >3</StatNumber>
        </Stat>
        <Stat className='branch-stat'>
        <StatLabel> <i className='fa-solid fa-hospital' style={{marginRight: "5px"}}></i>Johannesburg Branch</StatLabel>
            <StatNumber className='numbers'>5</StatNumber>
        </Stat>
        </div>
      </StatGroup>
        </div>
        <div className="doctor-inbox">
          <h4>Notes from receptionists:</h4>
          <div className="chat-container"></div>
        </div>
      </div>
      <Button colorScheme='green' style={{margin: "1rem 2rem"}}>Generate Report</Button>
    </div>
  )
}

export default DoctorHome