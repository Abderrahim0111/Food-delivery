"use client";
import { add, decrease, increase } from "@/redux/userSlice";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const AddToCardBtn = ({ food }) => {
  const { foods } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const seletedFood = foods.find((item) => {
    return item._id === food._id;
  });

  return (
    <>
      {seletedFood?.quantity > 0 ? (
        <div className="flex items-center justify-center gap-5 my-6">
          <FontAwesomeIcon
            onClick={() => {
              dispatch(decrease(food));
            }}
            icon={faMinus}
            className="bg-[#E9F7F5] text-[#00A081] h-5 w-5 rounded-full p-2 cursor-pointer"
          />
          <p>{seletedFood.quantity}</p>
          <FontAwesomeIcon
            onClick={() => {
              dispatch(increase(food));
            }}
            icon={faPlus}
            className="bg-[#E9F7F5] text-[#00A081] h-5 w-5 rounded-full p-2 cursor-pointer"
          />
        </div>
      ) : (
        <button
          onClick={() => {
            dispatch(add(food));
          }}
          className=" w-full text-center rounded-3xl bg-[#00A081] font-bold text-white p-2 mb-3"
        >
          Add 1 for {food.price.toLocaleString("en-US")} MAD
        </button>
      )}
    </>
  );
};

export default AddToCardBtn;
