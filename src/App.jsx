import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setIsMobile, setLogged, setUser } from "./store/userSlice";
import { setFavourites, setHistory } from "./store/appSlice";
import Home from "./pages/Home";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import PrivatePage from "./pages/PrivatePage";
import axios from "axios";
import LoadingPage from "./pages/LoadingPage";

const App = () => {
  const { logged, user } = useSelector((state) => state.user);
  const { favourites } = useSelector((state) => state.app);
  const [routeIntended, setRouteIntended] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleWindowResize = () => {
    if (window.innerWidth <= 500) dispatch(setIsMobile(true));
    else dispatch(setIsMobile(false));
  };
  useEffect(() => {
    window.addEventListener("resize", () => handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  useEffect(() => {
    const checkAuthenticated = async () => {
      try {
        const res = await axios.get("/api/protectedroute", {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        });
        if (!res.data.auth) {
          dispatch(setLogged(false));
          localStorage.removeItem("token");
        } else {
          dispatch(setLogged(true));
          dispatch(setUser(res.data?.user))
        }
      } catch (err) {
        console.log(err);
      }
    };
    checkAuthenticated();
  }, []);
  useEffect(() => {
    console.log(user)
    if(user) {
      console.log(user?.history)
      dispatch(setFavourites(user?.favorites))
      dispatch(setHistory(user?.history))
    } else {
      dispatch(setFavourites([]))
      dispatch(setHistory([]))
    }
  }, [user])
  const CheckLoggedIn = ({ children }) => {
    if (logged == "loading") {
      <LoadingPage />;
    } else {
      if (!logged) return <Navigate to="/login" replace />;
      return children;
    }
  };
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route
        path="/privatepage"
        element={
          <CheckLoggedIn>
            <PrivatePage />
          </CheckLoggedIn>
        }
      />
    </Routes>
  );
};

export default App;
