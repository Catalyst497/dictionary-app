import React from "react";
import Nav from "../components/Nav";
import SearchBar from "../components/SearchBar";
import Body from "../components/Body";
import { useSelector } from "react-redux";
import useConstants from "/src/hooks/useConstants";

function Home() {
  const { font } = useSelector((st) => st.user);
  const { background, textMain } = useConstants();

  return (
    <div
      className={`App flex justify-center ${font.style} ${background} ${textMain} min-h-screen overflow-hidden`}
    >
      <div className="w-[95%] md:w-[60%]">
        <Nav />
        <SearchBar />
        <Body />
      </div>
    </div>
  );
}

export default Home;
