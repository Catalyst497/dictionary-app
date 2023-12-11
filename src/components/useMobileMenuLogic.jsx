import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import useFontLogic from "../hooks/useFontLogic";

const useMobileMenuLogic = () => {
  const { changeFonts } = useFontLogic();
  const [menuOpen, setMenuOpen] = useState(false);
  const chevron = useRef();
  const menu = useRef();

  const openDropdownMenu = () => {
    const chevronIcon = chevron.current;
    const menuIcon = menu.current;
    if (menuOpen) {
      const timeline = gsap.timeline();
      timeline.to(chevronIcon, {
        rotate: 180,
        duration: 0.3,
      });
      timeline.to(
        menuIcon,
        {
          maxHeight: "12rem",
          duration: 0.3,
        },
        0
      );
      timeline.play();
    } else {
      const timeline = gsap.timeline();
      timeline.to(chevronIcon, 0.3, { rotate: 0 });
      timeline.to(
        menuIcon,
        {
          maxHeight: 0,
          duration: 0.3,
        },
        0
      );
      timeline.play();
    }
  };

  useEffect(() => {
    openDropdownMenu()
  }, [menuOpen])
  return {
    chevron, menu, menuOpen, setMenuOpen, 
  };
};

export default useMobileMenuLogic;
