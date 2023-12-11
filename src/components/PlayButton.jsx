import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import usePlay from "/src/hooks/usePlay";
import useConstants from "/src/hooks/useConstants";
import { TweenMax, Power3 } from "gsap";
import { Pause, Play } from "react-feather";
import Tooltip from "./Tooltip";
export default function PlayButton() {
  const { isMobile } = useSelector((st) => st.user);
  const playButton = useRef();
  const playRing = useRef();
  const [playHovered, setPlayHovered] = useState(false);
  const audio = useRef();
  const { isPlaying, handlePlay, src, handleAudioEnded} =
    usePlay(audio);
    const {purple, purpleBg } = useConstants();
  

  function gsapFunc(fill, background) {
    TweenMax.to(playRing.current, 0.3, { background: background });
    TweenMax.to(playButton.current, 0.3, {
      background: "transparent",
      fill: fill,
    });
  }
  useEffect(() => {
    if (playHovered) gsapFunc("white", purple);
    else gsapFunc(purple, purpleBg);
  }, [playHovered]);

  return (
  
      <div
        ref={playRing}
        onMouseEnter={(el) => setPlayHovered(true)}
        onMouseLeave={(el) => setPlayHovered(false)}
        onClick={() => handlePlay(src)}
        className="play-ring rounded-[100%] h-[3rem] md:h-[4rem] w-[3rem] md:w-[4rem]  bg-purpleBg grid place-items-center z-20 "
      >
        <audio ref={audio} src={src} onEnded={handleAudioEnded}>
          {" "}
        </audio>
        {!isPlaying ? (
          <Play
            onMouseEnter={(el) => setPlayHovered(true)}
            color="transparent"
            fill={"white"}
            size={isMobile ? 16 : 32}
            ref={playButton}
          />
        ) : (
          <Pause
            onMouseEnter={(el) => setPlayHovered(true)}
            color="transparent"
            fill={"white"}
            size={isMobile ? 16 : 32}
            ref={playButton}
          />
        )}
        
         <Tooltip src = "" />
      </div>
          
  );
}
