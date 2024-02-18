import CategorySuspense from "@/components/categorySuspense";
import FetchFoods from "@/components/fetchFoods";
import FetchStoreCategories from "@/components/fetchStoreCategories";
import OrderModel from "@/components/orderModel";
import OrderSections from "@/components/orderSections";
import ProductLoader from "@/components/productLoader";
import ProductModel from "@/components/productModel";
import SearchSection from "@/components/searchSection";
import SearchSuspense from "@/components/searchSuspense";
import SearchTerm from "@/components/searchTerm";
import Image from "next/image";
import React, { Suspense } from "react";

const Page = async (props) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/api/fetchStoreImage/${props.params.storeName}`,
    { next: { revalidate: 60 * 60 } }
  );
  const data = await res.json();

  const showModal = props.searchParams.modal === "true";
  const foodid = props.searchParams.foodid;
  const searchTerm = props.searchParams.search;

  return (
    <div className=" mt-10 px-2 flex gap-4 justify-center">
      <div className=" w-[55rem]">
        <div className=" shadow-lg p-7 rounded-xl rounded-tr-[60px] mb-5 border relative">
          <div className="  h-16 w-16 p-2 border bg-white rounded-lg absolute top-[-15px] left-7 shadow-xl">
            <Image src={data.storeImage} alt="image" height={200} width={200} />
          </div>
          <h1 className=" mt-14 text-3xl font-bold capitalize">
            {props.params.storeName}
          </h1>
        </div>
        <div className=" flex gap-5">
          <OrderSections {...{ props }} />
          <div className=" flex-1">
            <SearchTerm {...{ props }} />
            {searchTerm ? (
              <div className="">
                <h1 className=" text-2xl font-bold">Search results</h1>
                <Suspense fallback={<SearchSuspense />}>
                  <SearchSection {...{ props, searchTerm }} />
                </Suspense>
              </div>
            ) : (
              <div className=" flex gap-4 justify-center flex-wrap mb-10">
                {props.searchParams.category ? (
                  <Suspense fallback={<SearchSuspense />}>
                    <FetchFoods {...{ props }} />
                  </Suspense>
                ) : (
                  <Suspense fallback={<CategorySuspense />}>
                    <FetchStoreCategories {...{ props }} />
                  </Suspense>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <OrderModel />
      </div>
      {showModal && (
        <Suspense fallback={<ProductLoader {...{ props }} />}>
          <ProductModel {...{ foodid, props }} />
        </Suspense>
      )}
    </div>
  );
};

export default Page;
