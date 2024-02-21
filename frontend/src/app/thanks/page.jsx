import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className=" bg-[#FFC045]">
      <div className=" py-10 px-5">
        <ul className=" flex gap-4 items-center justify-center">
          <li className=" cursor-default  flex gap-2 items-center">
            <i className="fa-solid fa-cart-shopping" />
            <span>Cart</span>
          </li>

          <li className=" border border-black w-20 h-[2px]" />

          <li className=" cursor-default flex gap-2 items-center ">
            <i className="fa-solid fa-money-check-dollar" />
            <span>Checkout</span>
          </li>

          <li className=" border w-20 h-[2px] border-black" />
          <li className=" cursor-default text-[#00A081] font-semibold flex gap-2 items-center">
            <i className="fa-regular fa-circle-check" />
            <span>THANKS</span>
          </li>
        </ul>
      </div>
      <div className=" flex mb-20 sm:mb-0  flex-col items-center mx-auto gap-2 px-4 max-w-3xl">
        <h1 className=" text-3xl font-semibold">Thank you</h1>
        <p className=" text-center text-green-600 text-lg">
          Your order was completed successfully!
        </p>
        <p className=" text-center">
          Congratulations! 🎉 Your order has been successfully placed. Thank you
          for choosing <span className=" font-semibold">TastyRush</span>! Our
          team is now hard at work to ensure that your orders are shipped to
          you. If you have any questions or need further assistance, feel free
          to reach out to our customer support team at{" "}
          <span className=" italic font-semibold">
            abderrahim.defaoui@gmail.com
          </span>
          . Thank you for being a part of{" "}
          <span className=" font-semibold">TastyRush</span> family!
        </p>
        <Link href="/myorders">
          <button className=" text-[#00A081] mt-3 hover:scale-110 duration-300 transition-all">
            View orders
          </button>
        </Link>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#fff" fill-opacity="1" d="M0,224L48,229.3C96,235,192,245,288,245.3C384,245,480,235,576,202.7C672,171,768,117,864,128C960,139,1056,213,1152,245.3C1248,277,1344,267,1392,261.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
    </div>
  );
};

export default Page;
