import { useSelector, useDispatch } from "react-redux";
import { setIsPlaying, setShowTooltip } from "/src/store/appSlice";
import { useRef } from "react";
import useData from "/src/hooks/useData";

export default function usePlay(audioRef) {
  const { audio: src } = useData();
  const { isPlaying, showTooltip } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const timeoutId = useRef(null);

  function handlePlay(src) {
    if (audioRef) {
      if (src === "") {
        if (showTooltip) {
          clearTimeout(timeoutId.current);
          
        } else {
          dispatch(setShowTooltip(true));
          
        }
        timeoutId.current = setTimeout(() => {
          dispatch(setShowTooltip(false));
          
        }, 3000);
      }

      const el = audioRef.current;
      el.paused ? el.play() : el.pause();
      dispatch(setIsPlaying(!isPlaying));
    }
  }

  function handleAudioEnded() {
    dispatch(setIsPlaying(false));
  }

  return {
    isPlaying,
    handlePlay,
    src,
    handleAudioEnded,
  };
}
