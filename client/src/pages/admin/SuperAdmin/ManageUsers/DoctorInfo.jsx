
import "./manageusers.css"

const DoctorInfo = ({doctor}) => {
  return (
    <div className="doctor-modal-container">

        <div className="doctor-modal-top">
            <h3>{doctor.firstname} {doctor.lastname}</h3>
            <div className="doctor-modal-img">
                <img src={doctor.image_url} />
            </div>
        </div>

        <div className="doctor-modal-contant">
            <p><span style={{fontWeight:"700"}}>ID: </span> {doctor._id}</p>
            <p><span style={{fontWeight:"700"}}>Email: </span> {doctor.email}</p>
            <p><span style={{fontWeight:"700"}}>Branches: </span> {doctor.branches.join(', ')}</p>
            <p><span style={{fontWeight:"700"}}>Username: </span> {doctor.username}</p>
        </div>

    </div>
  )
}

export default DoctorInfo