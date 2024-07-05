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

            <Route path="/admin" element= {<AdminHome />} />
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </>
  );
};

export default App;
