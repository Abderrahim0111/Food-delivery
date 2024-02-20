"use client";
import { decrease, deletee, increase, ordered } from "@/redux/userSlice";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const { user, foods, userCity } = useSelector((state) => state.user);

  const [address, setaddress] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  let totalPrice = 0;
  let totalQuantity = 0;

  foods.map((food) => {
    totalPrice += food.price * food.quantity;
    totalQuantity += food.quantity;
  });

  const handleChange = (e) => {
    setaddress(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    const foodsByOwner = {};
    for (let i = 0; i < foods.length; i++) {
      const ownerId = foods[i].partner;
      if (!foodsByOwner[ownerId]) {
        foodsByOwner[ownerId] = [];
      }
      foodsByOwner[ownerId].push(foods[i]);
    }

    const orders = [];
    for (const ownerId in foodsByOwner) {
      const orderItems = foodsByOwner[ownerId].map((food) => ({
        foodId: food._id,
        quantity: food.quantity,
        price: food.quantity * food.price,
      }));
      orders.push({
        client: user._id,
        city: userCity,
        address: address,
        ownerId: ownerId,
        orders: orderItems,
      });
    }

    try {
      const res = await fetch("/api/createOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orders),
      });
      const data = await res.json();
      if (data.error) {
        setloading(false);
        return seterror(data.error);
      }
      dispatch(ordered());
      router.push("/thanks");
      setloading(false);
      seterror("");
    } catch (error) {
      setloading(false);
      console.log(error.message);
    }
  };

  return (
    <div className="px-6 md:px-5 lg:px-10 xl:px-12 ">
      <div className=" mt-10">
        <ul className=" flex gap-4 items-center justify-center">
          <Link href={"/cart"}>
            <li className=" transition-all duration-300 hover:text-[#00A081] flex gap-2 items-center">
              <i className="fa-solid fa-cart-shopping" />
              <span>Cart</span>
            </li>
          </Link>
          <li className=" border w-20 h-[2px]" />
          <li className=" flex gap-2 items-center text-[#00A081]">
            <i className="fa-solid fa-money-check-dollar" />
            <span>Checkout</span>
          </li>
          <li className=" border w-20 h-[2px]" />
          <li className=" opacity-50 cursor-default flex gap-2 items-center">
            <i className="fa-regular fa-circle-check" />
            <span>THANKS</span>
          </li>
        </ul>
      </div>
      <div className=" flex-col md:flex-row-reverse flex gap-8 mt-10">
        <div className=" flex-1 lg:flex-[0.6]">
          <div className=" rounded-xl shadow-lg py-5 px-2 md:px-5 border h-fit sticky top-20">
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
                {foods.map((food, index) => {
                  return (
                    <div
                      key={index}
                      className=" flex items-center justify-between mb-3 "
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <FontAwesomeIcon
                          onClick={() => {
                            dispatch(deletee(food));
                          }}
                          icon={faMinus}
                          className=" text-red-500 h-3 w-3 rounded-full bg-red-100 p-2 cursor-pointer"
                        />
                        <div className=" rounded-lg h-14 w-14">
                          <Image
                            src={food.images[0]}
                            height={200}
                            width={200}
                            alt="image"
                            className=" rounded-lg"
                          />
                        </div>
                        <p className="max-w-[75px] sm:max-w-[100px] line-clamp-1 whitespace-nowrap overflow-ellipsis">
                          {food.title}
                        </p>
                        <p>{food.price * food.quantity} MAD</p>
                      </div>
                      <div className="flex items-center justify-center gap-1 sm:gap-2">
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
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <form onSubmit={handleSubmit} className=" flex-1 flex flex-col gap-4">
          <div className=" flex flex-col gap-2">
            <label className=" font-semibold text-lg">
              Customer information
            </label>
            <input
              className="  outline-none p-3 rounded-lg border"
              disabled
              type="text"
              name="email"
              placeholder="Email address"
              value={user.email}
            />
            <input
              className=" outline-none p-3 rounded-lg border"
              disabled
              type="text"
              name="phone"
              placeholder="Phone number"
              value={user.phone}
            />
          </div>
          <div className=" flex flex-col gap-2">
            <label className=" font-semibold text-lg">
              Billing Information
            </label>
            <input
              className="  outline-none p-3 rounded-lg border"
              disabled
              type="text"
              name="username"
              placeholder="username"
              value={user.username}
            />
            <div className=" flex flex-col sm:flex-row gap-3 ">
              <input
                className=" p-3 flex-1 outline-none rounded-lg border"
                type="text"
                name="address"
                placeholder="Address"
                required
                onChange={handleChange}
              />
              <input
                className=" p-3 flex-1 outline-none rounded-lg border"
                type="text"
                name="city"
                disabled
                placeholder="City"
                value={userCity}
              />
            </div>
          </div>
          <div className=" flex flex-col gap-2">
            <label className=" font-semibold text-lg">Payment</label>
            <div className=" flex gap-3">
              <input
                type="radio"
                name="cashondelivery"
                id="cashondelivery"
                checked
              />
              <label htmlFor="cashondelivery">Cash on delivery</label>
            </div>
            <p className=" italic">Pay in cash on delivery.</p>
          </div>
          <p className=" opacity-50">
            Your personal data will be used to process your order, accompany you
            during your visit to the website
          </p>
          <button
            disabled={foods.length === 0}
            className={`${
              !error && "mb-20"
            } disabled:opacity-70 disabled:cursor-not-allowed text-white uppercase p-2 font-bold rounded-3xl bg-[#00A081]`}
          >
            <p className=" flex items-center gap-2 justify-center">
              <i className="fa-solid fa-lock" />
              <span>
                {loading
                  ? "Loading..."
                  : `place order ${totalPrice.toLocaleString("en-US")} DH`}
              </span>
            </p>
          </button>
          {error && <p className=" text-red-500 mb-20">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Page;
