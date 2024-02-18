import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const FoodItem = ({ food, props }) => {
  return (
    <Link
      href={
        props.searchParams.search
          ? `/store/${props.params.storeName}?search=${props.searchParams.search}&modal=true&foodid=${food._id}`
          : `/store/${props.params.storeName}?category=${food.category}&modal=true&foodid=${food._id}`
      }
      scroll={false}
      className=" cursor-pointer min-w-[368px] flex-1 shadow-md rounded-lg p-4 border"
    >
      <div className=" flex gap-4 mb-4">
        <div className=" h-20 w-20 overflow-hidden flex items-center justify-center rounded-lg">
          <Image
            src={food.images[0]}
            height={200}
            width={200}
            alt="image"
            className=" rounded-lg"
          />
        </div>
        <div className="  w-[237px]">
          <h1 className=" text-lg mb-2 line-clamp-1">{food.title}</h1>
          <p className=" opacity-60 text-sm line-clamp-2">{food.description}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className=" uppercase">{food.price.toLocaleString("en-US")} mad</p>
        <FontAwesomeIcon
          icon={faPlus}
          className="bg-[#E9F7F5] text-[#00A081] h-5 w-5 rounded-full p-2"
        />
      </div>
    </Link>
  );
};

export default FoodItem;
