
const DoctorSearch = ({doctors, setDoctorId, setBranch,selectedBranch}) => {

  const handleBranchSelect = (id,branch) =>{
    setDoctorId(id)
    setBranch(branch)
  }
  return (
   <>
     { doctors ? doctors.map((doctor) => (
        <div key={doctor._id} className="doctor-result" > 
        <div className="card">
           <div className="doctor-name">
              <h4>{doctor.firstname} {doctor.lastname}</h4>
           </div>
          <div className="profile-img">
            <img src={doctor.image_url} alt="No Image" />
          </div>
            
        </div>

        <div className="list-of-branches">
          <p>Select branch</p>

          <ul className="list">
            {doctor.branches.map((branch) => (
             <li key={branch} onClick={() => handleBranchSelect(doctor._id, branch)} style={{backgroundColor: selectedBranch == branch ? "green" : ""}}>{branch}</li>
            ))}
           
          </ul>
        </div> 
       </div>
     )) : <p>Loading...</p>}
   </>
  )
}

export default DoctorSearch