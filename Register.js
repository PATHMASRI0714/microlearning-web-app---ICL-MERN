import React,{useState} from "react";
import axios from "axios";

function Register(){

const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const registerUser=async()=>{

await axios.post("http://localhost:5000/api/users/register",{

name,
email,
password

});

alert("User Registered Successfully");

};

return(

<div style={{padding:"30px"}}>

<h2>Register</h2>

<input
placeholder="Name"
onChange={(e)=>setName(e.target.value)}
/>

<br/><br/>

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

<button onClick={registerUser}>
Register
</button>

</div>

);

}

export default Register;