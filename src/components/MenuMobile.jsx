// Problem at clickout mobile menu.
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { TimelineMax } from "gsap/gsap-core";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Moon } from "react-feather";
import useMobileMenuLogic from "./useMobileMenuLogic";
import useFontLogic from "../hooks/useFontLogic";

function MenuMobile({
  menuDropdown,
  menuOpen,
  setMenuOpen,
  logout,
  toggleIcon,
  togglePill,
  handleThemeChange,
}) {
  const navigate = useNavigate();
  const { darkMode, theme, logged } = useSelector((st) => st.user);
  const mode = darkMode ? theme.dark : theme.light;
  const purple = "hsl(275, 80%, 56%)";

 

  const dropDownAnimate = () => {
    const menu = menuDropdown.current;
    if (menuOpen) {
      const timeline = new TimelineMax();
      timeline.to(menu, { display: "block" });
      timeline.to(
        menu,
        {
          x: 0,
          opacity: 1,
          pointerEvents: "auto",
          duration: 0.3,
        },
        0.2
      );
      timeline.play();
    } else {
      const timeline = new TimelineMax();
      timeline.to(menu, {
        x: -50,
        opacity: 0,
        pointerEvents: "none",
        duration: 0.3,
      });
      timeline.to(menu, { display: "none" });
      timeline.play();
    }
  };
  const login = () => {
    navigate("/login");
  };
  useEffect(() => {
    dropDownAnimate();
  }, [menuOpen]);

  // Fonts dropdown component
  function ChangeFonts() {
    const { chevron, menu, menuOpen, setMenuOpen } = useMobileMenuLogic();
    const { changeFont } = useFontLogic();
    const fontAction = (i) => {
      changeFont(i);
      setMenuOpen(false);
    };
    return (
      <li className="py-1 relative" onClick={() => setMenuOpen(!menuOpen)}>
        <div className="trigger flex items-start gap-2">
          <div>Change Fonts</div>
          <ChevronDown ref={chevron} className="inline-block" />
        </div>
        <ul className="w-full overflow-y-hidden py-1" ref={menu}>
          <li className="py-1" onClick={() => fontAction(0)}>
            Serif
          </li>
          <li className="py-1" onClick={() => fontAction(1)}>
            San-serif
          </li>
          <li className="py-1" onClick={() => fontAction(2)}>
            Mono
          </li>
        </ul>
      </li>
    );
  }
  // History dropdown component
  function HistoryMenu() {
    const { history } = useSelector((st) => st.app);
    const { chevron, menu, menuOpen, setMenuOpen } = useMobileMenuLogic();
    return (
      <li className="py-1 relative" onClick={() => setMenuOpen(!menuOpen)}>
        <div className="trigger flex items-start gap-2">
          <div>History</div>
          <ChevronDown ref={chevron} className="inline-block" />
        </div>
        <ul className="w-full overflow-y-hidden" ref={menu}>
          {history.map((item, i) => (
            <li key={i} className="py-1">
              {item}
            </li>
          ))}
        </ul>
      </li>
    );
  }

  return (
    <div
      ref={menuDropdown}
      className={`absolute top-[100%] right-0 p-3 ${mode.background} z-[10] border-[hsl(275,80%,56%)] border-solid border-[1px] rounded-md max-h-[400px] overflow-y-scroll`}
    >
      <ul>
        <li
          className={`bg-none border-solid border-[1px] px-4 py-1 mb-2 rounded-[.5rem] ${
            darkMode ? "border-white" : "border-[black]"
          }`}
          onClick={logged ? logout : login}
        >
          {logged ? "Logout" : "Login"}
        </li>
        <ChangeFonts />
        <li className="py-1 flex gap-2">
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
        </li>
        <HistoryMenu />
      </ul>
    </div>
  );
}

export default MenuMobile;
