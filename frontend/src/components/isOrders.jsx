import Image from "next/image";
import React, { useEffect, useState } from "react";
import LoadingF from "./loadingF";

const IsOrders = () => {
  const [orders, setorders] = useState([]);
  const [loading, setloading] = useState(false);
  const [loadingF, setloadingF] = useState(true);
  useEffect(() => {
    const fetchPartnerOrders = async () => {
      try {
        const res = await fetch("/api/fetchPartnerOrders", {
          cache: "no-store",
        });
        const data = await res.json();

        if (!data.error) {
          setorders(data);
          setloadingF(false);
        }
        setloadingF(false);
      } catch (error) {
        setloadingF(false);
        console.log(error.message);
      }
    };
    fetchPartnerOrders();
  }, [orders]);
  const deleteOrder = async (orderId) => {
    const confirm = window.confirm("Delete this order?")
    if(!confirm) return
    try {
      setloading(true);
      const res = await fetch(`/api/deleteOrder/${orderId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      setloading(false);
    } catch (error) {
      setloading(false);
      console.log(error.message);
    }
  };

  if (loadingF) return <LoadingF />;
  return (
    <div className=" mx-auto mt-20 max-w-xl flex flex-col items-center">
      {orders.length > 0 ? (
        <>
          <h1 className=" text-3xl mb-10 font-bold text-center">Orders</h1>
          <div className=" w-screen lg:w-fit px-2 overflow-x-scroll">
          <table className="border-collapse border shadow-md  ">
            <thead>
              <tr className="bg-[#E9F7F5]">
                <th className="border  px-4 py-2">Food</th>
                <th className="border  px-4 py-2">Quantity</th>
                <th className="border  px-4 py-2">Price</th>
                <th className="border  px-4 py-2">Address</th>
                <th className="border  px-4 py-2">Username</th>
                <th className="border  px-4 py-2">Email</th>
                <th className="border  px-4 py-2">Phone</th>
                <th className="border  px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, orderIndex) => (
                <tr
                  key={orderIndex}
                  
                >
                  <td className="border  px-4 py-2">
                    {order.foods.map((food, foodIndex) => (
                      <div key={foodIndex} className="flex items-center gap-2">
                        <div className="h-14 w-14 flex items-center justify-center">
                          <Image
                            src={food.image}
                            alt="image"
                            height={200}
                            width={200}
                          />
                        </div>
                        <p>{food.title}</p>
                      </div>
                    ))}
                  </td>
                  <td className="text-center border  px-4 py-2">
                    {order.foods.map((food) => food.quantity).join(", ")}
                  </td>
                  <td className="text-center border  px-4 py-2">
                    {order.foods
                      .reduce((acc, food) => acc + food.price, 0)
                      .toLocaleString("en-US")}{" "}
                    MAD
                  </td>
                  <td className="text-center border  px-4 py-2">
                    {order.address}
                  </td>
                  <td className="text-center border  px-4 py-2">
                    {order.username}
                  </td>
                  <td className="text-center border  px-4 py-2">
                    {order.email}
                  </td>
                  <td className="text-center border  px-4 py-2">
                    {order.phone}
                  </td>
                  <td className="text-center border  px-4 py-2">
                    <button
                      onClick={() => {
                        deleteOrder(order.id);
                      }}
                      className="uppercase text-red-500"
                    >
                      {loading ? "Loading" : "delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </>
      ) : (
        <p className=" text-center">No orders yet!</p>
      )}
    </div>
  );
};

export default IsOrders;
