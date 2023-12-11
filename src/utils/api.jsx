import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setSuggestions, setIsLoading, setHistory } from "/src/store/appSlice";

const sugApiUrl = "https://api.datamuse.com/sug";
const dictionaryApiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";

//Method 1.
//function currying" or "function composition
//The outer function is called with the term parameter when you dispatch fetchWordSuggestionsAsync(term).
//The inner function (dispatch) => { ... } is returned from the outer function and receives the dispatch function. It's the actual thunk function that contains the asynchronous logic,
function alphabetically(a, b) {
  if (a.word > b.word) return 1;
  if (a.word < b.word) return -1;
  return 0;
}

export const fetchWordSuggestions = (term) => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const response = await axios.get(`${sugApiUrl}?s=${term}`);

    const sortedSuggestions = response.data.sort(alphabetically);

    dispatch(setSuggestions(sortedSuggestions));
  } catch (error) {
    console.error("Error fetching word suggestions:", error);
    dispatch(setSuggestions([]));
  } finally {
    dispatch(setIsLoading(false));
  }
};

//Method 2:
//Import your Redux store where it's created.
//Modify your fetch functions to accept an additional dispatch argument.
//When you call these utility functions, pass the dispatch function from your Redux store as an argument using store.dispatch or useDispatch for react components.

//Method 3
//use createAsyncThunk(sliceName/thunkName,req callback).
//use extraReducer: (builder) => {}
//addCase(condition, reducer_callback)

export const fetchMeaning = createAsyncThunk(
  "app/fetchMeaning",
  async (term) => {
    const response = await axios.get(`${dictionaryApiUrl}${term}`);
    return response.data;
  }
);
export const passHistory = (word, user) => {
  const sendCall = async (word, user) => {
    try {
      const response = await axios.post("/api/user/set-history", {
        userId: user._id,
        word,
      });
      return response.data?.history;
    } catch (err) {
      console.log(err);
    }
  };
  return sendCall(word, user);
};
