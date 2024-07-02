import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./styles.css";
import Dashboard from "./layout/Dashboard/Dashboard";
import PatientBook from "./pages/patient/PatientBook/PatientBook";
import PatientView from "./pages/patient/PatientView/PatientView";
import PatientInbox from "./pages/patient/PatientInbox/PatientInbox";
import PatientProfile from "./pages/patient/PatientProfile/PatientProfile";
import ProtectedRoute from "./context/ProtectedRoute";
import Logout from "./Logout";
import Register from "./components/Forms/RegisterForm";

const App = () => {
  return (
    <>
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
            <Route path="/patient/book" element={<PatientBook />} />
            <Route path="/patient/view" element={<PatientView />} />
            <Route path="/patient/inbox" element={<PatientInbox />} />
            <Route path="/patient/profile" element={<PatientProfile />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
