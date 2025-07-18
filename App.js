
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Layout from "./Components/Layouts/Layout";
function App() {
  return (
    <div id="dashboard">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="Dashboard" element={<Dashboard />}></Route>
           
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
