import { useDispatch, useSelector } from "react-redux";
import { setFont } from "/src/store/userSlice";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

const fontsList = [
  {
    name: "serif",
    style: "font-serif",
  },
  {
    name: "sans-serif",
    style: "font-sans",
  },
  {
    name: "mono",
    style: "font-mono",
  },
];

export default function useFontLogic() {
  const [isOpen, setIsOpen] = useState(false);
  const font = useSelector((state) => state.user.font);
  const dispatch = useDispatch();

  const expandRef = useRef();
  const fontMenuRef = useRef();
  

  function changeFont(i) {
    const item = fontsList[i];
    dispatch(setFont(item));
    setIsOpen(false);
    toggleAccordion();
  }

  const toggleAccordion = () => {
    const icon = expandRef.current;
    const menu = fontMenuRef.current;
    

    let tl = gsap.timeline();

    tl.to(icon, {
      rotation: isOpen ? 0 : 180,
      duration: 0.5,
    });
    tl.to(
      menu,
      {
        x: isOpen ? 0 : 50,
        opacity: isOpen ? 0 : 1,
        duration: 0.3,
        pointerEvents: isOpen ? "none": "auto"
      },
      "-=0.4"
    );
    tl.play();
  };

  function handleDropdown() {
    toggleAccordion();
    setIsOpen((prev) => !prev);
  }

  return {
    font,
    expandRef,
    fontsList,
    handleDropdown,
    toggleAccordion,
    changeFont,

    fontMenuRef,
    isOpen,
  };
}
