"use client"
import { located } from "@/redux/userSlice";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const SearchLocation = ({ cities }) => {

  const router = useRouter();
  const dispatch = useDispatch()

  const {userCity} = useSelector((state) => state.user)

  const handleChange = (e) => {
    dispatch(located(e.target.value))
    router.push(`?city=${e.target.value}`);
  };

  return (
    <>
      <div className="bg-[#00A081] h-full p-3 cursor-pointer">
        <FontAwesomeIcon
          icon={faLocationDot}
          className="h-6 w-6 text-white"
        />
      </div>
      <select onChange={handleChange} name="city" className="outline-none flex-1 mr-3 bg-transparent">
        <option value="" hidden>{userCity ? userCity : "Select your city"}</option>
        {cities.map((city, index) => (
          <option key={index} value={city}>{city}</option>
        ))}
      </select>
    </>
  );
};

export default SearchLocation;
