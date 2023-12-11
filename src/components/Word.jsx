import useData from "/src/hooks/useData";
import useConstants from "/src/hooks/useConstants";
import PlayButton from "./PlayButton";
import { useSelector } from "react-redux";
import Heart from "./Heart";

function Word() {
  const { data, word, sound, meaningsArr, url } = useData();

  const { font, isMobile } = useSelector((st) => st.user);

  return (
    <main className="relative flex justify-between items-center z-[3] ">
      <div>
        <h1 className={`${font.style} font-bold text-[3.5rem]`}>{word}</h1>
        <div className="pronunciation text-[#9e35e9] text-[1.2rem]">
          {sound}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Heart />
        <PlayButton />
      </div>
    </main>
  );
}

export default Word;
