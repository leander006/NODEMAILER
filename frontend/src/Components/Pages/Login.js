import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom';
import axios from "axios";
function Login() {

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

const handleSubmit =async(e) =>{
    e.preventDefault();
    try {
      const {data} = await axios.post("http://localhost:8080/api/auth/login",{
        email:email,
        password:password
      })
      console.log(data);
      navigate("/home")
    } catch (error) {
      console.log(error);
    }
}

  return (
    <div className="container my-3">
<form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label forhtml="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label forhtml="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" value={password} className="form-control" onChange={e=>setPassword(e.target.value)} id="exampleInputPassword1"/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
  )
}

export default Login