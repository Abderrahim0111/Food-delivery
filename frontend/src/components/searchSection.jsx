import React from "react";
import FoodItem from "./foodItem";

const SearchSection = async ({ props, searchTerm }) => {
  const res4 = await fetch(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/api/fetchSearchFoods/${props.params.storeName}?search=${searchTerm}`,
    { cache: "no-store" }
  );
  const searchResult = await res4.json();

  return (
    <div className="my-6 flex gap-4 justify-center flex-wrap">
      {searchResult.length === 0 ? (
        <p className=" text-lg text-center">0 results for <br /><span className=" font-semibold">"{searchTerm}"</span></p>
      ) : (
        searchResult.map((food, index) => {
          return <FoodItem key={index} {...{ food, props }} />;
        })
      )}
    </div>
  );
};

export default SearchSection;
