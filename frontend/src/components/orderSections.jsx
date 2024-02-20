import Link from "next/link";
import React from "react";

const OrderSections = async ({ props }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/api/fetchUserCategories/${props.params.storeName}`,
    { next: {revalidate: 300} }
  );
  const storeCategories = await res.json();
  return (
    <div className="hidden sm:block">
      <h3 className=" font-bold text-[#00A081] mb-8">Sections</h3>
      {storeCategories.map((category, index) => {
        return (
          <div key={index} className="border-b py-4 ">
            <Link
              href={`/store/${props.params.storeName}/?category=${category}`}
              className={` capitalize ${
                category == props.searchParams.category && "font-semibold"
              }`}
            >
              {category}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default OrderSections;
