import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: false,
  error: null,

  uid: null,
  email: null,
  name: null,
  referralId: null,
  totalDonations: 0,
  createdAt: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      
      state.isAuthenticated = true;
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.referralId = action.payload.referralId;
      state.totalDonations = action.payload.totalDonations;
      state.createdAt = action.payload.createdAt;
      state.loading = false; 
      state.error = null; 
    },

    clearUser: (state) => {
      
      state.isAuthenticated = false;
      state.uid = null;
      state.email = null
      state.name = null
     
      state.referralId = null;
      state.totalDonations = 0;
      state.createdAt = null;
      state.error = null;
      state.loading = false
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, clearUser, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
