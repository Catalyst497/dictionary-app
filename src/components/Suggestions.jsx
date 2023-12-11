import React, { useState, useEffect } from "react";
import useSearchLogic from "/src/hooks/useSearchLogic";
import { useSelector, useDispatch } from "react-redux";
import { setSuggestionOpen } from "../store/appSlice";

const SuggestionsList = () => {
  const dispatch = useDispatch();
  const { darkMode, theme } = useSelector((state) => state.user);
  const { suggestionOpen } = useSelector((state) => state.app);
  const mode = darkMode ? theme.dark : theme.light;
  const { handleSuggestionClick, suggestions } = useSearchLogic();
  const handleOutsideClick = (e) => {
    if (
      suggestionOpen &&
      !e.target.closest(".suggestions-container") &&
      !e.target.closest(".search-bar")
    ) {
      dispatch(setSuggestionOpen(false));
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [suggestionOpen]);

  if (suggestions.length === 0) return;
  if (suggestionOpen)
    return (
      <ul
        className={`suggestions-container absolute top-[200%] -left-[5%] md:-left-[1.5%] -right-[5%] md:-right-[1.5%] ${mode.background} rounded-md shadow-lg z-10 p-4 max-h-[50vh] overflow-auto`}
      >
        {suggestions?.map((suggestion, index, arr) => (
          <React.Fragment key={index}>
            <li className="cursor-default" onClick={() => handleSuggestionClick(suggestion.word)}>
              {suggestion.word}
            </li>
            {index != arr.length - 1 && (
              <div
                className={`hl flex-1 border-t-[1px] ${
                  darkMode ? "border-t-[#1f1f1f]" : "border-t-[#f4f4f4]"
                } my-4 mx-2`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </ul>
    );
};

export default SuggestionsList;
