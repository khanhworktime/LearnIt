import "./App.css";
import Landing from "./components/layout/Landing";
import Auth from "./components/views/Auth";
import Dashboard from "./components/views/Dashboard";
import { Route, Routes } from "react-router-dom";
import AuthContextProvider from "./components/contexts/authContext";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Auth authRoute="login" />} />
        <Route path="/register" element={<Auth authRoute="register" />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
