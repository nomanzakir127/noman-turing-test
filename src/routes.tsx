import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/LoginPage";



export default function NavigationRoutes() {

    const location = useLocation()
    const authState = location && localStorage.getItem("authorization") ? true:false 
    
    return (
      <div>
          {!authState && (
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/*" element={<Navigate to="/"/> }/>
          </Routes>
          )}
          {authState && (
              <Routes>
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/*" element={<Navigate to="/dashboard"/> }/>
              </Routes>
          )}
      </div>
    );
  }