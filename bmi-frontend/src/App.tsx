import { BrowserRouter, Routes, Route } from "react-router-dom";
import BMIHome from "./components/BMIHome";
import ResponsiveAppBar from "./utils/ResponsiveAppBar";

function App() {
  return (
    <BrowserRouter>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<BMIHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
