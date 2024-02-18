"use client"
import { decrease, deletee, increase } from "@/redux/userSlice";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const OrderModel = () => {
  const { user, foods } = useSelector((state) => state.user);

  const dispatch = useDispatch()

  let totalPrice = 0
  let totalQuantity = 0


  return (
    <div className=" rounded-xl shadow-lg p-5 border max-w-[420px] h-fit sticky top-20">
          <h1 className=" text-2xl font-semibold text-center mb-6">
            Your order
          </h1>
      {foods.length === 0 ? (
        
          <p className=" text-center">
            You've not added any products yet. When you do, you'll see them
            here!
          </p>
        
      ) : (
        <div className="">
            {
                foods.map((food, index) => {
                    totalPrice += food.price*food.quantity
                    totalQuantity += food.quantity
                    return(
                        <div key={index} className=" flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <FontAwesomeIcon onClick={() => {
                                    dispatch(deletee(food))
                                }} icon={faMinus} className=" text-red-500 h-3 w-3 rounded-full bg-red-100 p-2 cursor-pointer" />
                                <div className=" rounded-lg h-14 w-14"><Image src={food.images[0]} height={200} width={200} alt="image" className=" rounded-lg"/></div>
                                <p className="max-w-[100px] line-clamp-1 whitespace-nowrap overflow-ellipsis">{food.title}</p>
                                <p>{food.price*food.quantity} MAD</p>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <FontAwesomeIcon
                                onClick={() => {
                                    dispatch(decrease(food));
                                }}
                                icon={faMinus}
                                className="bg-[#E9F7F5] text-[#00A081] h-3 w-3 rounded-full p-2 cursor-pointer"
                                />
                                <p>{food.quantity}</p>
                                <FontAwesomeIcon
                                onClick={() => {
                                    dispatch(increase(food));
                                }}
                                icon={faPlus}
                                className="bg-[#E9F7F5] text-[#00A081] h-3 w-3 rounded-full p-2 cursor-pointer"
                                />
                            </div>
                        </div>
                    )
                })
            }
            <Link href={`${user ? '/checkout' : '/login'}`}>
                <button className=" w-full text-center p-2 rounded-3xl bg-[#00A081] text-white font-bold mt-10">Order {totalQuantity} for {totalPrice.toLocaleString('en-US')} MAD</button>
            </Link>
        </div>
      )}
    </div>
  );
};

export default OrderModel;
