import React from "react";
import FoodItem from "./foodItem";

const FetchFoods = async ({ props }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/api/fetchFoodsByCategory/${props.params.storeName}/${props.searchParams.category}`,
    { cache: "no-store" }
  );
  const foods = await res.json();
  return foods.map((food, index) => {
    return <FoodItem key={index} {...{ food, props }} />;
  });
};

export default FetchFoods;
