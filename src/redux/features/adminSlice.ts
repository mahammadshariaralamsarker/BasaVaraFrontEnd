import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  admin: any[];
}

const initialState: initialStateType = {
  admin: [],
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
});

export default adminSlice.reducer;
