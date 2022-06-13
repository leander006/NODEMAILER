import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Register() {

      const [password, setPassword] = useState("");
      const [username, setUsername] = useState("");
      const [email, setEmail] = useState("");
      const [error, setError] = useState("");
      const [msg, setMsg] = useState("");
      const navigate = useNavigate();


      const handleSubmit =async(e) =>{
            e.preventDefault();
            try {
              const {data} = await axios.post("http://localhost:8080/api/auth",{
                username,
                email,
                password
              })
              setMsg(data.message);
              // console.log("res inside frontend",data);
            } catch (error) {
              // console.log("Error inside register ",error);
              setError(error.response.data.message);
            }
        }

  return (
      <div className="container my-3">
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label forhtml="exampleInputText1" className="form-label">Username</label>
          <input type="text" className="form-control" value={username} onChange={e=>setUsername(e.target.value)} id="exampleInputText1" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label forhtml="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label forhtml="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" value={password} className="form-control" onChange={e=>setPassword(e.target.value)} id="exampleInputPassword1"/>
        </div>
            {error && <div className="text-danger my-3">{error}</div>}
						{msg && <div className="text-success my-3">{msg}</div>}
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      
      </div>
  )
}

export default Register