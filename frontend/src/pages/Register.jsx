import axios from "axios";
import { useState } from "react";

export default function Register() {
  const [data, setData] = useState({});

  const register = async () => {
    await axios.post("/auth/register", data);
    alert("Registered");
  };

  return (
    <>
      <h2>Register</h2>
      <input placeholder="Name" onChange={(e) => setData({...data, name: e.target.value})}/>
      <input placeholder="Email" onChange={(e) => setData({...data, email: e.target.value})}/>
      <input placeholder="Password" onChange={(e) => setData({...data, password: e.target.value})}/>
      
      <select onChange={(e) => setData({...data, role: e.target.value})}>
        <option value="EDITOR">Editor</option>
        <option value="VIEWER">Viewer</option>
      </select>

      <button onClick={register}>Register</button>
    </>
  );
}