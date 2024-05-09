import "./App.css";

import { BrowserRouter as  Router, Routes,Route } from "react-router-dom";
import Patient from "./Components/Patient";
import Header from "./Components/Header";
import Appointment from "./Components/Appointment";
import Doctor from "./Components/Doctor";

function App() {
  return (
    <div className="App"  >
      <div className="img-fluid" style={{position:"absolute"}}>
        <img
        className="img-fluid"
        style={{height:"100vh", backgroundPosition:"cover", width:"1700px"}}
          src="https://img.freepik.com/free-photo/vivid-blurred-colorful-wallpaper-background_58702-3440.jpg"
          alt=""
        />
      </div>
      <div  style={{position:"relative"}}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Patient />}>
            </Route>
            <Route path="/patient" element={<Patient/>}>
            </Route>
            <Route path="/appointment" element={<Appointment />}>
            </Route>
            <Route path="/doctor" element={<Doctor />}>
            </Route>
  
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
