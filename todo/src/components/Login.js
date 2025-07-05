import React, { useState } from "react";
import { useNavigate } from "react-router-dom"

const Login = ()=>{
        const navigate = useNavigate();
        const [email,setEmail] = useState("");
        const [password,setPassword] = useState("");
        const [error,setError] = useState("")
        const formLogin = (e)=>{
            e.preventDefault(); 
            const user = JSON.parse(localStorage.getItem("user")) || [];
            const matchedUser = user.find(
                (u) => u.email === email && u.password === password
            );

            if (!matchedUser){
                setError("Invalid");
                return
            }
            localStorage.setItem("ActiveUser", JSON.stringify(matchedUser));
            navigate("/Dashboard");


        }
    return(
        <div className="container">
            <h2>Login</h2>

            <form onSubmit={formLogin} className="form">
                <input type="text" placeholder="Email" required value={email}
                onChange={(e)=> setEmail(e.target.value)} 
                />
                 <input type="Password" placeholder="Password" required value={password}
                 onChange={(e)=> setPassword(e.target.value)} 
                 />

                 {error && <p>{error}</p>}

                 <button type="submit" className="btn">Login</button>

                 
            </form>

            <p className="link">
                New user <a href="/Signup">SignUp Here</a>
            </p>

        </div>
    )
};

export default Login;  