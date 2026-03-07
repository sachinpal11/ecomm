import { createSlice } from "@reduxjs/toolkit";
import { signup, login } from "./authThunk";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },

    verifyUser: (state) => {
      if (state.user) {
        state.user.verified = true;
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
  },

  extraReducers: (builder) => {
    builder

      // signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload?.user) {
          state.user = action.payload.user;

          localStorage.setItem(
            "user",
            JSON.stringify(action.payload.user)
          );
        }
      })

      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // login
      .addCase(login.pending, (state) => {
        state.loading = true;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload?.user) {
          state.user = action.payload.user;

          localStorage.setItem(
            "user",
            JSON.stringify(action.payload.user)
          );
        }
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, verifyUser } = authSlice.actions;

export default authSlice.reducer;