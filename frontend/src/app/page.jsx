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
      <div className="bg-[#FFC144] mb-[-5px] px-2 min-h-[calc(100vh-100px)] sm:min-h-[calc(100vh-450px)] mt-[-50px] sm:mt-0 sm:pt-20 flex flex-col sm:flex-row items-center  sm:gap-10 justify-center">
        <video loop muted autoPlay>
          <source src="https://glovoapp.com/images/landing/address-container-animation.webm"/>
        </video>
        <div className=" flex flex-col mt-5 items-center gap-6">
          <h1 className=" text-center text-4xl sm:text-5xl font-bold">
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
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 50 1440 230"><path fill="#FFC045" fillOpacity="1" d="M0,96L60,90.7C120,85,240,75,360,90.7C480,107,600,149,720,181.3C840,213,960,235,1080,213.3C1200,192,1320,128,1380,96L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
    

      {isLocation ? (
        <Suspense fallback={<StoresSuspense />}>
          <AvailableStores {...{ props }} />
        </Suspense>
      ) : (
        <Suspense fallback={<StoresSuspense />}>
          <TopRestaurnets />
        </Suspense>
      )}

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 135"><path fill="#FFC045" fillOpacity="1" d="M0,0L120,32C240,64,480,128,720,133.3C960,139,1200,85,1320,58.7L1440,32L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path></svg>
      <div className=" bg-[#FFC045] py-10 md:pb-0">
        <div className=" flex justify-center">
        <Image src="https://glovoapp.com/images/landing/cities.svg" alt="image" height={200} width={200}/>
        </div>
        <h1 className=" font-bold text-4xl text-center mb-8 px-2">
          Cities where we deliver
        </h1>
        <div className=" flex flex-wrap items-center justify-center gap-5 px-2">
          {cities.map((city, index) => {
            return (
              <p key={index} className=" px-5 py-2 rounded-3xl bg-[#FFF2DA]">
                {city}
              </p>
            );
          })}
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 65 1440 225"><path fill="#FFC045" fillOpacity="1" d="M0,224L80,202.7C160,181,320,139,480,122.7C640,107,800,117,960,133.3C1120,149,1280,171,1360,181.3L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>

      <div className=" max-w-[350px] sm:max-w-4xl  md:mb-[-90px] md:mt-[-40px] px-2 mx-auto flex flex-col items-center">
        <h1 className=" text-center font-bold text-4xl mb-10">
          Anything delivered
        </h1>
        <div className=" flex flex-col sm:flex-row gap-10 items-center justify-center">
          <div className="flex flex-col items-center gap-4">
          <Image src="https://glovoapp.com/images/why-glovo/restaurants-opt.svg" alt="image" height={200} width={200} />
            <h3 className=" font-bold text-xl text-center">
              Your city's top restaurants
            </h3>
            <p className=" text-center">
              With a great variety of restaurants you can order your favourite
              food or explore new restaurants nearby!
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
          <Image src="https://glovoapp.com/images/why-glovo/delivery-opt.svg" alt="image" height={200} width={200}/>
            <h3 className=" font-bold text-xl text-center">Fast delivery</h3>
            <p className=" text-center">
              Like a flash! Order or send anything in your city and receive it
              in minutes
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <Image src="https://glovoapp.com/images/why-glovo/groceries-opt.svg" alt="image" height={200} width={200}/>
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

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#E9F7F5" fillOpacity="1" d="M0,224L80,218.7C160,213,320,203,480,213.3C640,224,800,256,960,256C1120,256,1280,224,1360,208L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>

      <div className=" mt-[-2px] px-2 py-10 bg-[#E9F7F5]">
        <h1 className=" mt-[-25px] font-bold text-4xl text-center mb-12">
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
