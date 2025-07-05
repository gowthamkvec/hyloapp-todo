import React, {useState} from "react";
import { useNavigate } from "react-router-dom"

import "./Signup.css";

const Signup=()=>{
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [error,setError] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

   const Signup = (e)=>{
    e.preventDefault(); 

    const user = JSON.parse(localStorage.getItem("user")) || [];

    const userExists = user.find((u) => u.email === email);  

    // const userExists = user.find((u)=>u.name === name);

    if (userExists){
        setError("user name is already registered");
        return;
    }

      const newUser = { name,email,password };
      user.push(newUser);
      localStorage.setItem("user", JSON.stringify(user)); 
      alert("Done");
      navigate("/Login");
   }

return (
    <div className="container">
        <h2>SignUp</h2>
        <form onSubmit={Signup} className="form">

            <input type="text" placeholder="Name" required value={name} 
       onChange={(e) => setName(e.target.value)} 
        />

        <input type="text" placeholder="Email" required value={email} 
       onChange={(e) => setEmail(e.target.value)} 
        />

         <input type="password" placeholder="Password" required value={password} 
       onChange={(e) => setPassword(e.target.value)} 
        />

        {error && <p >{error}</p>}


            <button type="submit" className="btn">SignUp</button>
        </form>

        <p className="link">
                Exist user <a href="/Login">Login Here</a>
            </p>

    </div>
);

};



export default Signup;

