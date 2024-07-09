import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from '@chakra-ui/react'
import "../receptionist.css"

const ReceptionistHome = () => {
  return (
    <div>
      <StatGroup>
        <div className="stat-container">
        <Stat className="stat">
          <StatLabel className='header'>Pending Appointments</StatLabel>
           <StatNumber className="numbers">8</StatNumber>
          <StatHelpText className='change'>
            <StatArrow  type='increase' />
            23.36%
          </StatHelpText>
        </Stat>
        <Stat className="stat">
          <StatLabel className='header'>Active Appointments</StatLabel>
           <StatNumber className="numbers">21</StatNumber>
          <StatHelpText className='change'>
            <StatArrow type='increase' />
            23.36%
          </StatHelpText>
        </Stat>
        <Stat className="stat">
          <StatLabel className='header'>Cancellation Requests</StatLabel>
           <StatNumber className="numbers">3</StatNumber>
          <StatHelpText className='change'>
            <StatArrow type='decrease' />
            9.05%
          </StatHelpText>
        </Stat>
        </div>
    </StatGroup>
    </div>
  )
}

export default ReceptionistHome