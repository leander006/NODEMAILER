import Login from "./Components/Pages/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Components/Home";
import Register from "./Components/Pages/Register";
import EmailVerificatiion from "./Components/Pages/EmailVerificatiion";
function App() {

  const user = localStorage.getItem("token");
  
  return (
  <Router>
     <Routes> 
       
     {user && <Route path="/home" exact element={<Home/>}/>}
			<Route path="/" exact element={<Register/>} />
			<Route path="/login" exact element={<Login/>} />
			{/* <Route path="/" element={<Navigate replace to="/login"/>} /> */}
			<Route path="/users/:id/verify/:token" element={<EmailVerificatiion/>} />

     </Routes> 
  </Router>
  );
}

export default App;
