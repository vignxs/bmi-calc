import { BrowserRouter, Routes, Route } from "react-router-dom";
import BMIHome from "./components/BMIHome";
import { Login } from "./components/Login";
import { Register } from "./components/SignUp";
import MyAccountPage from "./components/MyAccount";
import { RequireAuth } from "react-auth-kit";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth loginPath={"/login"}>
                <BMIHome />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/myaccount"
            element={
              <RequireAuth loginPath={"/login"}>
                <MyAccountPage />
              </RequireAuth>
            }
          />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
