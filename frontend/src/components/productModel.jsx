import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import AddToCardBtn from "./addToCardBtn";
import Link from "next/link";

const ProductModel = async ({ foodid, props }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/api/fetchFood/${foodid}`,
    { next: {revalidate: 180} }
  );
  const food = await res.json();

  return (
    <div className=" bg-[#00000099] flex items-center justify-center fixed top-0 bottom-0 left-0 right-0 z-10">
      <div className=" bg-white rounded-lg px-3 w-[370px] sm:w-[500px] h-[640px] sm:h-[700px] overflow-y-scroll scrollbar mx-2 flex flex-col">
        <Link
          scroll={false}
          href={
            props.searchParams.search
              ? `/store/${props.params.storeName}?search=${props.searchParams.search}`
              : `/store/${props.params.storeName}?category=${props.searchParams.category}`
          }
          className=" text-right mb-5 text-white sticky top-0 bg-white z-10 py-2 "
        >
          <FontAwesomeIcon
            icon={faClose}
            className="bg-[#B2B2B2] rounded-full h-5 w-5 p-1 cursor-pointer"
          />
        </Link>
        <div className=" flex-1">
          <div className=" mx-auto w-[240px] h-[240px] overflow-hidden flex justify-center items-center mb-8 ">
            <Image src={food.images[0]} height={300} width={300} alt="image" />
          </div>
          <h2 className=" capitalize text-xl font-bold">{food.title}</h2>
          <p className=" my-2">{food.price.toLocaleString("en-US")} MAD</p>
          <p className=" opacity-80 text-sm">{food.description}</p>
        </div>
        <AddToCardBtn {...{ food }} />
      </div>
    </div>
  );
};

export default ProductModel;
