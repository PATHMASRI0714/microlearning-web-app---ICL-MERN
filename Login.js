import React,{useState} from "react";
import axios from "axios";

function Login(){

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const loginUser=async()=>{

const res=await axios.post("http://localhost:5000/api/users/login",{

email,
password

});

alert("Login Success");

};

return(

<div style={{padding:"30px"}}>

<h2>Login</h2>

<input
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<br/><br/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<br/><br/>

<button onClick={loginUser}>
Login
</button>

</div>

);

}

export default Login;