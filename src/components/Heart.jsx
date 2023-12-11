import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useConstants from "/src/hooks/useConstants";
import useData from "/src/hooks/useData";
import { setFavourites } from "/src/store/appSlice";
import appReducer from "../store/appSlice";
import { Heart } from "react-feather";

export default function HeartIcon() {
  const dispatch = useDispatch();
  const { word } = useData();
  const { isMobile, darkMode, logged, user } = useSelector((st) => st.user);
  const { favourites } = useSelector((st) => st.app);
  const { purple, purpleBg } = useConstants();
  const [heartColor, setHeartColor] = useState("");

  useEffect(() => {
    if (favourites.includes(word)) {
      setHeartColor(purple);
    } else {
      setHeartColor("transparent");
    }
  }, [favourites, word]);

  const addWordToFav = async (e) => {
    try {
      if (!favourites.includes(word)) {
        if (logged) {
          const res = await axios.put("/api/addtofavorites", {
            word,
            userId: user._id,
          });
          console.log(res.data.favorites);
          if (res.data?.status == "success") {
            dispatch(setFavourites(res.data?.favorites));
            setHeartColor(purple);
          } else console.log(res.data?.message);
        }
      } else {
        const res = await axios.put("/api/removefromfavorites", {
          word,
          userId: user._id,
        });
        if (res.data?.status == "success")
          dispatch(setFavourites(res.data?.favorites));
        else console.log(res.data?.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Heart
      size={32}
      fill={heartColor}
      color={purple}
      onClick={() => {
        addWordToFav();
      }}
    />
  );
}
