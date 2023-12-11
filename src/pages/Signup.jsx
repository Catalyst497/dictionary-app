import React, { useState } from "react";
import axios from "axios";
import {useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate()
  const {logged} = useSelector((state) => state.user)
  const [registerErr, setRegisterErr] = useState(null) 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const credentials = {
      email: email,
      password: password,
      username: username,
    };
    try {
      const res = await axios.post("/api/register", credentials);
      if(res.data?.message == "Sign up successful.") {
        console.log('Sign up success.')
        navigate('/login')
      }
      else {
        console.log(res.data?.message)
        setRegisterErr(res.data?.message)
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="Register Page">
      <form method="POST" className="grid text-center gap-4 justify-center">
        <div className="text-[1.5rem] md:text-[3rem]">Sign Up</div>
        {registerErr && <div className="text-red-500 text-[1.5rem]">{registerErr}</div>}
        <input
          type="email"
          // name="email"
          id="email"
          placeholder="Enter your email address"
          onChange={(e) => setEmail(e.target.value)}
          defaultValue={email}
        />
        <input
          type="text"
          id="username"
          placeholder="Enter username"
          onChange={(e) => setUsername(e.target.value)}
          defaultValue={username}
        />
        <input
          type="password"
          id="passsword"
          className=""
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          defaultValue={password}
        />
        <input
          type="submit"
          value="Yeeeeeee!!"
          className="bg-[gray] rounded-md"
          onClick={handleRegisterSubmit}
        />
      </form>
    </div>
  );
}

export default Signup;
