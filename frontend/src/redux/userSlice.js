"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  foods: [],
  userCity: null
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logged: (state, action) => {
      state.user = action.payload;
    },
    located: (state, action) => {
      state.userCity = action.payload
    },
    ordered: (state) => {
      state.foods = [];
    },
    loggedOut: (state) => {
      state.foods = [];
      state.userCity = null
    },
    add: (state, action) => {
      const food = {...action.payload, quantity: 1}
      state.foods.push(food)
    },
    deletee: (state, action) => {
      const filtredFoods = state.foods.filter((food) => {
        return food._id !== action.payload._id
      })
      state.foods = filtredFoods
    },
    increase: (state, action) => {
      const selectedFood = state.foods.find((food) => {
        return food._id === action.payload._id
      })

      selectedFood.quantity += 1
    },
    decrease: (state, action) => {
      const selectedFood = state.foods.find((food) => {
        return food._id === action.payload._id
      })

      selectedFood.quantity -= 1
      if(selectedFood.quantity === 0){
        const filtredFoods = state.foods.filter((food) => {
          return food._id !== action.payload._id
        })
        state.foods = filtredFoods
      }
    },
  },
});

export const { logged, increase, decrease, deletee, add, loggedOut, located, ordered } = userSlice.actions;

export default userSlice.reducer;
