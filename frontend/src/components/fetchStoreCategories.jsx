import Link from "next/link";
import React from "react";

const FetchStoreCategories = async ({ props }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/api/fetchUserCategories/${props.params.storeName}`,
    { cache: "no-store" }
  );
  const storeCategories = await res.json();
  return storeCategories.map((categorie, index) => {
    return (
      <Link
        href={`/store/${props.params.storeName}/?category=${categorie}`}
        key={index}
        className=" cursor-pointer min-w-[368px] flex-1 shadow-md rounded-lg p-6 border"
      >
        <h1 className=" uppercase text-lg font-semibold">{categorie}</h1>
      </Link>
    );
  });
};

export default FetchStoreCategories;
