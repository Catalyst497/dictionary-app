import usePlay from "/src/hooks/usePlay";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import gsap from "gsap";

export default function Tooltip({ src }) {
  const tipRef = useRef();
  const { showTooltip } = useSelector((state) => state.app);

  const animateTooltip = () => {
    const tooltip = tipRef.current;
    if (src === "") {
      gsap.to(tooltip, {
        x: showTooltip ? 0 : 100,
        duration: 0.5,
        ease: "power2.inout",
      });

      gsap.to(tooltip, {
        opacity: showTooltip ? 1 : 0,
        duration: showTooltip ? 0.2 : 0.1,
      });
    }
  };

  useEffect(() => {
    animateTooltip();
  }, [showTooltip]);

  return (
    <div
      ref={tipRef}
      className="absolute bg-red-500 text-white w-[content-width] py-1 px-2 rounded-md right-0 top-full opacity-0 flex items-center transition-opacity duration-300 z-[1]"
      
    >
      <p> No audio available </p>
    </div>
  );
}
