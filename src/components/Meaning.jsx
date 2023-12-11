import { useEffect } from "react";
import Extra from "./Extra";
import {useSelector} from 'react-redux'
export default function Meaning({
  partOfSpeech,
  definitions,
  antonyms,
  synonyms,
}) {
  const {darkMode} = useSelector((st) => st.user)


  return (
    <div className="noun py-6">
      <div className="title flex gap-4 items-center">
        <div className="font-bold text-[1.5rem] italic">{partOfSpeech}</div>
        <div className="hl flex-1 border-t-[1px] border-t-[#f4f4f4]"></div>
      </div>

      <div className="text-[#84849a] py-6">Meaning</div>
      <ul className={`list-disc list-dark-mode pl-5`}>
        {definitions.map((x, index) => (
          <li key={index} className="pb-4">
            <div className="pb-1">{x.definition}</div>
            <div className="text-[#84849a] pl-2 italic">{x.example}</div>
          </li>
        ))}
      </ul>

      <div className="extras py-3">
        <Extra title="Synonyms" arr={synonyms} />
        <Extra title="Antonyms" arr={antonyms} />
      </div>
    </div>
  );
}
