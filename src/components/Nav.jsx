import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Moon } from "react-feather";
import { toggleTheme, setLogged } from "../store/userSlice";
import History from "./History";
import { TweenMax, Tween, TimelineMax } from "gsap/gsap-core";
import { FaAngleDown } from "react-icons/fa";
import { CgMenuRight } from "react-icons/cg";
import { MdClose } from "react-icons/md";

import Fonts from "./Fonts";
import MenuMobile from "./MenuMobile";
function Nav() {
  const dispatch = useDispatch();
  const purple = "hsl(275, 80%, 56%)";
  const purpleBg = "rgba(164,69,237,.25)";
  const { darkMode, logged, isMobile } = useSelector((state) => state.user);
  const [backtext, setBackText] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const togglePill = useRef();
  const toggleIcon = useRef();
  const menuOpenIcon = useRef();
  const menuCloseIcon = useRef();
  const menuDropdown = useRef();

  function handleThemeChange(e) {
    let el = e.target;
    dispatch(toggleTheme());
  }

  useEffect(() => {
    if (!darkMode) {
      TweenMax.to(toggleIcon.current, 0.3, { background: "gray" });
      TweenMax.to(togglePill.current, 0.3, { left: "5%" });
    } else {
      TweenMax.to(toggleIcon.current, 0.3, { background: purple });
      TweenMax.to(togglePill.current, 0.3, { left: "60%" });
    }
  }, [darkMode]);
  useEffect(() => {
    axios
      .get("/api")
      .then((res) => setBackText(res.data))
      .catch((err) => console.log(err));
  });
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    dispatch(setLogged(false));
  };
  const onHamburgerClick = () => {
    setMenuOpen(!menuOpen);
  };
  useEffect(() => {
    if (!menuOpen) {
      const timeline = new TimelineMax();
      timeline.to(menuOpenIcon.current, { display: "block" });
      timeline.to(menuCloseIcon.current, { display: "none" }, 0);
      timeline.fromTo(
        menuOpenIcon.current,
        { rotate: 180, opacity: 0 },
        { rotate: 0, opacity: 1, duration: 0.3 }
      );
      timeline.play();
    } else {
      const timeline = new TimelineMax();
      timeline.to(menuCloseIcon.current, { display: "block" });
      timeline.to(menuOpenIcon.current, { display: "none" }, 0);
      timeline.fromTo(
        menuCloseIcon.current,
        { rotate: -180, opacity: 0 },
        { rotate: 0, opacity: 1 }
      );
    }
  }, [menuOpen]);

  // Clickout for mobile menu.
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     console.log("Clickout is actually called.");
  //     if (
  //       menuDropdown.current &&
  //       !menuDropdown.current.contains(event.target)
  //     ) {
  //       setMenuOpen(false);
  //     }
  //   };
  //   document.addEventListener("çlick", () => console.log());
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, []);

  useEffect(() => {
    const handleClickout = (event) => {
      if (menuOpen) {
        if (
          menuDropdown.current &&
          !menuDropdown.current.contains(event.target) &&
          !menuOpenIcon.current.contains(event.target)
        ) {
          setMenuOpen(false);
        }
      }
    };
    document.addEventListener("click", handleClickout);
    return () => {
      document.removeEventListener('çlick', handleClickout)
    }
  }, [menuOpen]);

  return (
    <>
      <nav className="relative flex items-center justify-between py-8 md:py-[3rem]">
        {isMobile && (
          <MenuMobile
            menuDropdown={menuDropdown}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            logout={logout}
            toggleIcon={toggleIcon}
            togglePill={togglePill}
            handleThemeChange={handleThemeChange}
          />
        )}
        <img src="./assets/dictionary-logo.svg" alt="Book" />
        {isMobile ? (
          <div className="menu relative w-[5rem]">
            <div
              className="menuOpen absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
              ref={menuOpenIcon}
            >
              <CgMenuRight size={28} onClick={onHamburgerClick} />
            </div>
            <div
              className="menuClose absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
              ref={menuCloseIcon}
            >
              <MdClose size={28} onClick={onHamburgerClick} />
            </div>
          </div>
        ) : (
          <div className="options flex gap-4 items-center">
            {logged ? (
              <button
                className={`bg-none border-solid border-[1px] px-4 py-2 rounded-[.5rem] ${
                  darkMode ? "border-white" : "border-[black]"
                }`}
                onClick={logout}
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className={`bg-none border-solid border-[1px] text-white px-4 py-2 rounded-[.5rem] ${
                  darkMode ? "border-white" : "border-[black]"
                }`}
              >
                Login
              </Link>
            )}
            {logged && <History />}
            <Fonts />

            <div className="flex gap-4 items-center">
              <div
                ref={toggleIcon}
                onClick={handleThemeChange}
                htmlFor="love"
                className="relative w-[3rem] h-[1.5rem] bg-[gray] rounded-[2rem]"
              >
                <span
                  ref={togglePill}
                  className="absolute top-[50%] translate-y-[-50%] left-0 inline-block w-[1rem] h-[1rem] rounded-full bg-[white]"
                ></span>
              </div>
              <div>
                <Moon color={darkMode ? purple : "gray"} />
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Nav;
