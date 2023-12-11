import useFontLogic from "/src/hooks/useFontLogic";
import useConstants from "/src/hooks/useConstants";
export default function Fonts() {
  const {
    font,
    fontsList,
    handleDropdown,
    toggleAccordion,
    changeFont,
    fontMenuRef,
    expandRef,
  } = useFontLogic();
  const { background } = useConstants();
  return (
    <div className="relative flex justify-center items-center  gap-4 min-w-[8rem]">
      <span> {font.name} </span>

      <div onClick={handleDropdown} ref={expandRef} className="w-8">
        <img src="./assets/expand_more.png" alt="Expand More" />
      </div>

      <ul
        ref={fontMenuRef}
        className={`w-full absolute top-[100%] z-10 flex flex-col py-3 px-5 ${background} border-[#9e35e9] border-2 opacity-0 pointer-events-none transform translate-x-[-50%]`}
      >
        {fontsList.map((x, index) => (
          <li
            key={index}
            onClick={() => changeFont(index)}
            className={` w-full flex align-self-center cursor-pointer`}
          >
            <p
              className={`font-bold text-md ${x.style} ${
                x.name === font.name ? "text-[#9e35e9]" : ""
              }`}
            >
              {x.name}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
