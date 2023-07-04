import { BrowserRouter, Routes, Route } from "react-router-dom";
import BMIHome from "./components/BMIHome";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import MyAccountPage from "./components/MyAccount";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BMIHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/myaccount" element={<MyAccountPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
