import { BrowserRouter, Routes, Route } from "react-router-dom";
import BMIHome from "./components/BMIHome";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import MyAccountPage from "./components/MyAccount";
import { RequireAuth } from "react-auth-kit";
import { AuthProvider } from "react-auth-kit";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider
        authType="cookie"
        authName="_auth"
        cookieDomain={window.location.hostname}
        cookieSecure={false}
      >
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
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/myaccount"
            element={
              <RequireAuth loginPath={"/login"}>
                <MyAccountPage />
              </RequireAuth>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
