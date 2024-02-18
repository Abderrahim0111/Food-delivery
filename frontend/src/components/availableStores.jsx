import Image from "next/image";
import Link from "next/link";
import React from "react";

const AvailableStores = async ({ props }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/api/fetchStoresByCity/${props.searchParams.city}`,
    {
      cache: "no-store",
    }
  );
  const stores = await res.json();
  return (
    <div className=" my-16 px-2 max-w-4xl mx-auto">
      <h1 className=" text-4xl text-center font-bold mb-8">
        Stores in {props.searchParams.city} you might like
      </h1>
      <div className=" flex flex-wrap justify-center gap-8 ">
        {stores.length > 0 ? (
          stores.map((store, index) => {
            return (
              <Link
                href={`/store/${store.storeName}`}
                key={index}
                className=" cursor-pointer flex items-center flex-col relative hover:scale-105 transition-all duration-300"
              >
                <Image
                  src={store.storeImage}
                  alt="burger"
                  height={130}
                  width={130}
                />
                <p className=" bg-[#FFC144] px-2 py-1 absolute bottom-[-10px]  rounded-xl">
                  {store.storeName}
                </p>
              </Link>
            );
          })
        ) : (
          <p>We don't have stores in this city yet!</p>
        )}
      </div>
    </div>
  );
};

export default AvailableStores;
