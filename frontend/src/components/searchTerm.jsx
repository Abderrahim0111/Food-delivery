"use client"
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SearchTerm = ({props}) => {
    const [searchTerm, setsearchTerm] = useState('');
    const router = useRouter()
    const handleChange = (e) => {
        setsearchTerm(e.target.value)
    }
    const handlSubmit = (e) => {
        e.preventDefault()
        router.push(`?search=${searchTerm}`)
        setsearchTerm("")
    }
  return (
    <form onSubmit={handlSubmit} className=" p-3 rounded-3xl mb-6 bg-[#F5F5F5]">
      <input
        onChange={handleChange}
        type="text"
        value={searchTerm}
        className=" outline-none bg-transparent w-full"
        name="search"
        placeholder={`Search in ${props.params.storeName}`}
      />
    </form>
  );
};

export default SearchTerm;
