import OrderModel from "@/components/orderModel";
import React from "react";

const Loading = () => {
  return (
    <div className=" mt-10 px-2 flex gap-4 justify-center">
      <div className=" max-w-[60rem]">
        <div className=" shadow-lg p-7 rounded-xl rounded-tr-[60px] mb-5 border relative">
          <div className=" bg-gray-300 animate-pulse h-16 w-16 rounded-lg absolute top-[-15px] left-7 shadow-xl"></div>
          <h1 className=" mt-14 text-3xl font-bold capitalize p-3 bg-gray-300 animate-pulse"></h1>
        </div>
        <div className=" flex gap-5">
          <div className="hidden sm:block">
            <h3 className=" font-bold text-[#00A081] mb-8">Sections</h3>
            {[1, 1, 1, 1].map((item, index) => {
              return (
                <div key={index} className="border-b py-4 ">
                  <p className="p-3 bg-gray-300 animate-pulse"></p>
                </div>
              );
            })}
          </div>
          <div>
            <div className=" p-3 rounded-3xl mb-10 bg-[#F5F5F5] ">
              <input
                type="text"
                className=" outline-none bg-transparent w-full"
                name="search"
                placeholder="Search in McDonald's"
              />
            </div>
            <div className=" flex gap-4 justify-center flex-wrap mb-10">
              {[1, 1, 1, 1].map((item, index) => {
                return (
                  <div
                    key={index}
                    className=" cursor-pointer min-w-[368px] flex-1 shadow-md rounded-lg p-6 border"
                  >
                    <h1 className=" uppercase text-lg font-semibold p-3 bg-gray-300 animate-pulse"></h1>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className=" hidden sm:block">
        <OrderModel />
      </div>
    </div>
  );
};

export default Loading;
