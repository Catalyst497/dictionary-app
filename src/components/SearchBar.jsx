import { useSelector } from "react-redux";
import useSearchLogic from "/src/hooks/useSearchLogic";
import { XCircle as X } from "react-feather";
import SuggestionsList from "./Suggestions";


function SearchBar() {
  const {theme, darkMode} = useSelector((state) => state.user)
  const mode = darkMode ? theme.dark : theme.light;
  const { searchTerm, handleInputChange, handleFormSubmit, clear } =
    useSearchLogic();
  const purpleBg = "hsl(275, 80%, 56%)";

  return (
    <div className={`search-bar rounded-md my-2 md:my-6 p-4   ${mode.input}`}>
      <form
        className="relative flex items-center gap-4"
        onSubmit={(e) => handleFormSubmit(e)}
      >
        <input
          type="text"
          name="search"
          id="search"
          className={`flex-1 ${mode.input} outline-none focus:outline-none`}
          placeholder="Type to search"
          value={searchTerm}
          onChange={(e) => handleInputChange(e)}
        />
        {searchTerm && (
          <span className="pl-4" onClick={() => clear()}>
            {" "}
            <X size={24} color={purpleBg} />{" "}
          </span>
        )}
        {searchTerm && ( <button aria-label="submit" role="search">
          <img src="./assets/search.svg" alt="Search " />
        </button>)}
       
        <SuggestionsList />
      </form>
    </div>
  );
}

export default SearchBar;
