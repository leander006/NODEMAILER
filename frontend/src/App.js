import Login from "./Components/Pages/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./Components/Home";
function App() {
  return (
  <Router>
     <Routes> 
     <Route exact path="/" element={<Login/>}/>
     <Route exact path="/home" element={<Home/>}/>
     </Routes> 
  </Router>
  );
}

export default App;
