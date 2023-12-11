import axios from "axios";
import React, { useEffect, useState } from "react";
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setLogged, setUser } from "../store/userSlice";
import Cookies from "js-cookie";

function Login() {
  const dispatch = useDispatch()
  const {logged} = useSelector((state) => state.user)
  const navigate = useNavigate();
  const [loginErr, setLoginErr] = useState(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    setLoginErr(null)
  },[])
  
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/login", { username, password });
      if (res.data?.message == "Successful Login") {
        localStorage.setItem("token", res.data?.token);
        setLoginErr(null)

        // On Successful login, clear email and password fields.
        setEmail("");
        setPassword("");
        

        dispatch(setLogged(true))
        dispatch(setUser(res.data?.user))
        console.log(res.data?.user)
        navigate("/");
      } else {
        console.log(res.data?.message)
        setLoginErr(res.data?.message)
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="Login Page">
      <form method="POST" className="grid text-center gap-4 justify-center">
        {loginErr && <div className="text-red-500 text-[1.5rem]">{loginErr}</div>}
        <div className="text-[1.5rem] md:text-[3rem]">Login</div>
        {/* <input
          type="email"
          // name="email"
          id="email"
          placeholder="Enter your email address"
          onChange={(e) => setEmail(e.target.value)}
          defaultValue={email}
        /> */}
        <input
          type="username"
          // name="email"
          id="username"
          placeholder="Enter your username"
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
          onClick={handleLoginSubmit}
        />
      </form>
    </div>
  );
}

export default Login;
