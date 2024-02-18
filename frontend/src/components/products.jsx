"use client"

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useState } from "react";
import ProductModel from "./productModel";

const Products = async ({props, foods}) => {

    const [isFood, setisFood] = useState(false);
    const [food, setfood] = useState({});

  return (
    <div>
        <h1 className=" font-bold text-lg mb-5 capitalize">{props.searchParams.category}</h1>
        <div className="flex gap-4 justify-center flex-wrap mb-10">
            {foods.map((food, index) => {
                return(
                    <div
                    onClick={() => {
                        setisFood(true)
                        setfood(food)
                    }}
                    key={index}
                    className=" cursor-pointer min-w-[368px] flex-1 shadow-md rounded-lg p-4 border"
                    >
                        <div className=" flex gap-4 mb-4">
                            <div className=" h-20 w-20 rounded-lg">
                                <Image src={food.images[0]} height={200} width={200} alt="image" className=" rounded-lg" />
                            </div>
                            <div className="  w-[237px]">
                                <h1 className=" text-lg mb-2 line-clamp-1">{food.title}</h1>
                                <p className=" opacity-60 text-sm line-clamp-2">{food.description}</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className=" uppercase">{food.price.toLocaleString('en-US')} mad</p>
                            <FontAwesomeIcon icon={faPlus} className="bg-[#E9F7F5] text-[#00A081] h-5 w-5 rounded-full p-2" />
                        </div>
                    </div>
                )
            })}
            { isFood && <ProductModel {...{food, setisFood}}/>}
        </div>

    </div>
  );
};

export default Products;
