import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import SearchLocation from "./searchLocation";

const AddLocation = ({ cities }) => {
  return (
    <div className=" bg-[#00000099] fixed inset-0 flex items-center justify-center z-10">
      <div className=" bg-white rounded-lg p-3 w-[370px] sm:w-[500px] flex flex-col h-[400px] overflow-y-scroll scrollbar mx-2">
        <Link
          scroll={false}
          href="/"
          className=" text-right mb-5 text-white sticky top-0 z-10 py-2 "
        >
          <FontAwesomeIcon
            icon={faClose}
            className="bg-[#B2B2B2] rounded-full h-5 w-5 p-1 cursor-pointer"
          />
        </Link>
        <h1 className=" text-3xl font-bold text-center mb-14">Add your city</h1>
        <div className=" bg-white rounded-lg flex items-center border gap-1 mb-5 overflow-hidden w-full">
          <SearchLocation {...{ cities }} />
        </div>
      </div>
    </div>
  );
};

export default AddLocation;
