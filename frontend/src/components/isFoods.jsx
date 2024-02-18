"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import LoadingF from "./loadingF";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const IsFoods = () => {
  const [foods, setfoods] = useState([]);
  const [loadingF, setloadingF] = useState(true);
  const [loadingD, setloadingD] = useState(false);

  useEffect(() => {
    const fetchPartnerFoods = async () => {
      try {
        const res = await fetch("/api/fetchPartnerFoods", {
          cache: "no-store",
        });
        const data = await res.json();

        if (data.error) return setloadingF(false);
        setfoods(data);
        setloadingF(false);
      } catch (error) {
        setloadingF(false);
        console.log(error.message);
      }
    };
    fetchPartnerFoods();
  }, [foods]);

  const deleteFood = async (foodId) => {
    const confirm = window.confirm("Delete this Food?")
    if(!confirm) return
    setloadingD(true);
    try {
      const res = await fetch(`/api/deleteFood/${foodId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      setloadingD(false);
      console.log(data);
    } catch (error) {
      setloadingD(false);
      console.log(error.message);
    }
  };

  if (loadingF) return <LoadingF />;
  return (
    <div className=" mt-16 max-w-2xl mx-auto">
      {foods.map((food, index) => {
        return (
          <div
            key={index}
            className=" flex items-center justify-between bg-[#E9F7F5] mb-3 p-2 overflow-hidden rounded-lg"
          >
            <div className=" flex items-center gap-1 sm:gap-4">
              <div className=" h-16 w-16">
                <Image
                  src={food.images[0]}
                  height={200}
                  width={200}
                  alt="food"
                />
              </div>
              <p>{food.title}</p>
              <p>{food.price.toLocaleString('en-US')} MAD</p>
              <p>{food.freeDelivery ? "Free shipping" : "Paid shipping"}</p>
            </div>
            <div className=" flex items-center gap-3">
              <Link
                href={`/edit/${food._id}`}
                className=" uppercase hidden sm:block  p-2 border rounded-lg text-blue-500 border-blue-500"
              >
                Edit
              </Link>
              <button
                onClick={() => {
                  deleteFood(food._id);
                }}
                className=" uppercase p-2 hidden sm:block border rounded-lg text-red-500 border-red-500"
              >
                {loadingD ? "Loading..." : "Delete"}
              </button>
              <Link href={`/edit/${food._id}`} className="sm:hidden">
                <FontAwesomeIcon
                  icon={faEdit}
                  className=" cursor-pointer text-lg text-blue-500 sm:hidden"
                />
              </Link>
              <FontAwesomeIcon
                onClick={() => {
                  deleteFood(food._id);
                }}
                icon={faTrash}
                className=" text-lg text-red-500 sm:hidden "
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default IsFoods;
