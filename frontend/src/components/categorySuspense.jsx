import React from "react";

const CategorySuspense = () => {
  return [1, 1].map((item, index) => {
    return (
      <div
        key={index}
        className=" cursor-pointer min-w-[368px] flex-1 shadow-md rounded-lg p-6 border"
      >
        <h1 className=" uppercase text-lg font-semibold p-3 bg-gray-300 animate-pulse"></h1>
      </div>
    );
  });
};

export default CategorySuspense;
