import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { TweenMax, TimelineMax } from "gsap";

function History() {
  const { history } = useSelector((st) => st.app);
  const { darkMode, theme } = useSelector((st) => st.user);
  const historyDropdown = useRef();
  const dropDownIcon = useRef();
  const mode = darkMode ? theme.dark : theme.light;
  const purple = "hsl(275, 80%, 56%)";
  const purpleBg = "rgba(164,69,237,.25)";
  const [dropOpen, setDropOpen] = useState(false);

  const dropDownAnimate = () => {
    const icon = dropDownIcon.current;
    const menu = historyDropdown.current;

    if (dropOpen) {
      const timeline = new TimelineMax();
      timeline.to(menu, { display: "block" });
      timeline.to(icon, {
        rotate: 180,
        duration: 0.5
      }, 0.1);
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
      timeline.to(
        menu,
        {
          x: -50,
          opacity: 0,
          pointerEvents: "none",
          duration: 0.3,
        },
      );
      timeline.to(icon, 0.5, {
        rotate: 0,
      }, 0.1);
      timeline.to(menu, { display: "none" });

      timeline.play();
    }

  };
  useEffect(() => {
    dropDownAnimate();
  }, [dropOpen]);
  return (
    <>
      <div className="relative">
        <div
          className="flex gap-1 items-center cursor-default"
          onClick={() => setDropOpen(!dropOpen)}
        >
          History
          <img
            className="w-8"
            src="./assets/expand_more.png"
            alt="Expand More"
            ref={dropDownIcon}
          />
        </div>
        <div
          ref={historyDropdown}
          className={`absolute top-full opacity-5 border-[hsl(275,80%,56%)] border-solid border-[1px] z-10 px-4 py-2 ${mode.background} transition-all duration-500 `}
        >
          <ul>
            {history && history.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
        {/* )} */}
      </div>
    </>
  );
}

export default History;
