import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isMobile: window.innerWidth <= 500,
    darkMode: window.matchMedia("(prefers-color-scheme:dark)").matches,
    theme: {
      dark: {
        // Dark background
        background: "bg-[#050505]",
        // Dark Main text color
        textMain: "text-[#ffffff]",
        // Dark input background
        input: "bg-[#1f1f1f]",
        // Dark input placeholder text color
        inputPlaceholder: "placeholder:text-[#575757]",
        // Dark accent background color
        elements: "bg-[#3a3a3a]",
        // Dark Main text color
        textSide: "text-[#6a7676]",
      },
      light: {
        // Light background
        background: "bg-[#ffffff]",
        // Light Main text color
        textMain: "text-[#2d2d2d]",
        // Light input background
        input: "bg-[#f4f4f4]",
        // Light input placeholder text color
        inputPlaceholder: "placeholder:text-[#dbd6d6]",
        // Light accent background color
        elements: "bg-[#e9e9e9]",
        // Light Main text color
        textSide: "text-[#84849a]",
      },
    },
    font: {
      name: "sans-serif",
      style: "font-sans",
    },
    logged: "loading",
    user: null,
  },
  reducers: {
    setFont(state, { payload }) {
      state.font = { name: payload.name, style: payload.style };
    },
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
    setIsMobile(state, action) {
      state.isMobile = action.payload;
    },
    setLogged(state, { payload }) {
      state.logged = payload;
    },
    setUser (state, {payload}) {
      state.user = payload
    }
  },
});

export default userSlice.reducer;
export const { toggleTheme, setFont, setIsMobile, setLogged, setUser } =
  userSlice.actions;
