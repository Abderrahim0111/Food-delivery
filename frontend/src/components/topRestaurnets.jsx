import Image from "next/image";
import Link from "next/link";
import React from "react";

const TopRestaurnets = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/api/fetchStores`,
    { next: { revalidate: 300 } }
  );
  const stores = await res.json();

  return (
    <div className="px-2 mb-10 max-w-4xl mx-auto">
      <h1 className=" text-4xl text-center font-bold mb-8 mt-5 sm:mt-0">
        Top restaurants and more in TastyRush
      </h1>
      <div className=" flex flex-wrap justify-center gap-8 ">
        {stores.map((store, index) => {
          return (
            <Link
              href="?addLocation=true"
              scroll={false}
              key={index}
              className=" cursor-pointer hover:scale-105 transition-all duration-300 flex items-center flex-col relative"
            >
              <div className="borderraduis w-[128px] h-[121px] overflow-hidden">
                <Image
                  src={store.storeImage}
                  alt="burger"
                  height={130}
                  width={130}
                  className=" h-full w-full object-cover"
                />
              </div>
              <p className=" bg-[#FFC144] px-2 py-1 absolute bottom-[-10px] font-bold rounded-xl">
                {store.storeName}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TopRestaurnets;
