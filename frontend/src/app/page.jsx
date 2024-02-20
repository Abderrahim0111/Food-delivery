import AddLocation from "@/components/addLocation";
import AvailableStores from "@/components/availableStores";
import BecomePartner from "@/components/becomePartner";
import SearchLocation from "@/components/searchLocation";
import StoresSuspense from "@/components/storesSuspense";
import TopRestaurnets from "@/components/topRestaurnets";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default async function Home(props) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/api/fetchAvailableCities`,
    { next: {revalidate: 300} }
  );
  const cities = await res.json();

  const isLocation = props.searchParams.city;
  const showModal = props.searchParams.addLocation === "true";
  const showModal2 = props.searchParams.becomePartner === "true";

  return (
    <div className="">
      <div className="bg-[#FFC144] px-2 min-h-screen sm:min-h-[calc(100vh-250px)] sm:pt-20 flex flex-col sm:flex-row items-center gap-5  sm:gap-10 justify-center">
        <Image
          src="/burger.png"
          alt="burger"
          className=""
          width={400}
          height={400}
          priority={true}
        />
        <div className=" flex flex-col items-center gap-6">
          <h1 className=" text-center text-5xl font-bold">
            Food delivery and more
          </h1>
          <h4 className=" text-center text-lg">
            Groceries, shops, pharmacies, anything!
          </h4>
          <div className=" bg-white rounded-lg flex items-center gap-1 overflow-hidden w-full">
            <SearchLocation {...{ cities }} />
          </div>
        </div>
      </div>

      {isLocation ? (
        <Suspense fallback={<StoresSuspense />}>
          <AvailableStores {...{ props }} />
        </Suspense>
      ) : (
        <Suspense fallback={<StoresSuspense />}>
          <TopRestaurnets />
        </Suspense>
      )}

      <div className="mt-16 px-2 py-10 ">
        <h1 className=" font-bold text-4xl text-center mb-9">
          Cities where we deliver
        </h1>
        <div className=" flex flex-wrap items-center justify-center gap-5">
          {cities.map((city, index) => {
            return (
              <p key={index} className=" px-5 py-2 rounded-3xl bg-[#FFF2DA]">
                {city}
              </p>
            );
          })}
        </div>
      </div>

      <div className=" max-w-[350px] sm:max-w-4xl mt-12 px-2 mx-auto flex flex-col items-center">
        <h1 className=" text-center font-bold text-4xl mb-10">
          Anything delivered
        </h1>
        <div className=" flex flex-col sm:flex-row gap-10 items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <h3 className=" font-bold text-xl text-center">
              Your city's top restaurants
            </h3>
            <p className=" text-center">
              With a great variety of restaurants you can order your favourite
              food or explore new restaurants nearby!
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <h3 className=" font-bold text-xl text-center">Fast delivery</h3>
            <p className=" text-center">
              Like a flash! Order or send anything in your city and receive it
              in minutes
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <h3 className=" font-bold text-xl text-center">
              Groceries delivery & more
            </h3>
            <p className=" text-center">
              Find anything you need! From supermarkets to shops, pharmacies to
              florists — if it's in your city order it and receive it.
            </p>
          </div>
        </div>
      </div>

      <div className=" mt-16 px-2 py-10 bg-[#E9F7F5]">
        <h1 className=" font-bold text-4xl text-center mb-12">
          Let's do it together
        </h1>
        <div className=" flex gap-10 flex-col sm:flex-row justify-center max-w-lg mx-auto">
          <div className="flex flex-col items-center gap-4">
            <h3 className=" font-bold text-xl text-center">Become a partner</h3>
            <p className=" text-center">
              Grow with TastyRush! Our technology and user base can help you
              boost sales and unlock new opportunities!
            </p>
            <Link
              href={
                isLocation
                  ? `?city=${props.searchParams.city}&becomePartner=true`
                  : "?becomePartner=true"
              }
              scroll={false}
              className=" px-4 py-2 rounded-3xl text-white bg-[#00A081] font-semibold"
            >
              Register here
            </Link>
          </div>
        </div>
      </div>

      {showModal && <AddLocation {...{ cities }} />}
      {showModal2 && <BecomePartner {...{ props }} />}
    </div>
  );
}
