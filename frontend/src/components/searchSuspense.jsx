import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const SearchSuspense = () => {
  return (
    <div className="my-6 flex gap-4 justify-center flex-wrap">
      {[1, 1].map((item, index) => {
        return (
          <div key={index} className=" cursor-pointer min-w-[368px] flex-1 shadow-md rounded-lg p-4 border">
            <div className=" flex gap-4 mb-4">
              <div className=" h-20 w-20 rounded-lg bg-gray-300 animate-pulse"></div>
              <div className="  w-[237px]">
                <h1 className=" text-lg mb-2 line-clamp-1 bg-gray-300 animate-pulse p-3"></h1>
                <p className=" opacity-60 text-sm line-clamp-2 bg-gray-300 animate-pulse p-3"></p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className=" uppercase bg-gray-300 animate-pulse p-3 px-12"></p>
              <FontAwesomeIcon
                icon={faPlus}
                className="bg-[#E9F7F5] text-[#00A081] h-5 w-5 rounded-full p-2"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SearchSuspense;
