import { useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";

import useData from "/src/hooks/useData";
import Word from "./Word";
import Meanings from "./Meanings";
import Error from "./Error";

export default function Body() {
  const { url } = useData();
  const { isLoading, isError } = useSelector((st) => st.app);

  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center h-[80vh] w-full">
          <BeatLoader color="hsl(275, 80%, 56%)" size={32} />
        </div>
      )}
      {!isLoading && isError && <Error />}
      {!isLoading && !isError && (
        <>
          <Word />
          <Meanings />
          <div className="hl flex-1 border-t-[1px] border-t-[#f4f4f4] mb-8"></div>
          <div className="source mb-16">
            <div className="text-[#84849a]">Source:</div>
            <a href={url} className="underline">
              {url}
            </a>
          </div>
        </>
      )}
    </>
  );
}
