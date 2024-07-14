import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./styles.css";
import Dashboard from "./layout/Dashboard/Dashboard";
import PatientHome from "./pages/patient/PatientHome/PatientHome";
import PatientBook from "./pages/patient/PatientBook/PatientBook";
import PatientView from "./pages/patient/PatientView/PatientView";
import PatientInbox from "./pages/patient/PatientInbox/PatientInbox";
import PatientProfile from "./pages/patient/PatientProfile/PatientProfile";
import ProtectedRoute from "./context/ProtectedRoute";
import Logout from "./Logout";
import Register from "./components/Forms/RegisterForm";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AdminHome from "./pages/admin/AdminHome"
import AdminDashboard from "./layout/AdminDashboard/AdminDashboard"
import SuperAdminHome from "./pages/admin/SuperAdmin/SuperAdminHome/SuperAdminHome";
import ManageUsers from "./pages/admin/SuperAdmin/ManageUsers/ManageUsers";
import SuperAdminInbox from "./pages/admin/SuperAdmin/SuperAdminInbox/SuperAdminInbox";
import AdminProtectedRoutes from "./context/AdminProtectedRoutes"
import AdminLogout from "./AdminLogout"
import ReceptionistDashboard from "./layout/ReceptionistDashboard/ReceptionistDashboard"
import ReceptionistHome from "./pages/admin/receptionist/ReceptionistHome/ReceptionistHome"
import ReceptionistAppointments from "./pages/admin/receptionist/ReceptionistAppointments/ReceptionistAppointments"
import ReceptionistInbox from "./pages/admin/receptionist/ReceptionistInbox/ReceptionistInbox"
import DoctorDashboard from "./layout/DoctorDashboard/DoctorDashboard"
import DoctorHome from "./pages/admin/doctor/DoctorHome/DoctorHome"
import DoctorAppointments from "./pages/admin/doctor/DoctorAppointments/DoctorAppointments"
import DoctorSchedule from "./pages/admin/doctor/DoctorSchedule/DoctorSchedule"


const App = () => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/patient"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            >
              <Route path="/patient/home" element={<PatientHome />} />
              <Route path="/patient/book" element={<PatientBook />} />
              <Route path="/patient/view" element={<PatientView />} />
              <Route path="/patient/inbox" element={<PatientInbox />} />
              <Route path="/patient/profile" element={<PatientProfile />} />
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/admin-area" element={<AdminHome/>}/>
            
            <Route 
              path="/admin" 
              element= {<AdminProtectedRoutes>
              <AdminDashboard /></AdminProtectedRoutes>}>
              <Route path="/admin/home" element={<SuperAdminHome />} />
              <Route path="/admin/users" element={<ManageUsers />} />
              <Route path="/admin/inbox" element={<SuperAdminInbox />} />
              <Route path="/admin/logout" element={<AdminLogout />} />
            </Route>

            <Route path="/receptionist" element={<AdminProtectedRoutes><ReceptionistDashboard /></AdminProtectedRoutes>}>
              <Route path="/receptionist/home" element={<ReceptionistHome />} />
              <Route path="/receptionist/appointments" element={<ReceptionistAppointments />} />
              <Route path="/receptionist/inbox" element={<ReceptionistInbox />} />
              <Route path="/receptionist/logout" element={<AdminLogout />} />
            </Route>

            <Route path="/doctor" element={<AdminProtectedRoutes><DoctorDashboard /></AdminProtectedRoutes>}>
            <Route path="/doctor/home" element={<DoctorHome />} />
              <Route path="/doctor/appointments" element={<DoctorAppointments />} />
              <Route path="/doctor/schedule" element={<DoctorSchedule />} />
              <Route path="/doctor/logout" element={<AdminLogout />} />
            </Route>
    
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </>
  );
};

export default App;
