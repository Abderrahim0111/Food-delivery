"use client";

import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useSelector } from "react-redux";

const Header = () => {
  const { user, foods, userCity } = useSelector((state) => state.user);

  return (
    <header className="bg-[#FFC144] z-10 sticky top-0 flex items-center  justify-around py-3 px-2">
      <Link href={userCity ? `/?city=${userCity}` : "/"}>
        <h1 className=" text-xl sm:text-3xl text-[#00A081] font-bold">TastyRush</h1>
      </Link>
      {user ? (
        <div className=" flex items-center gap-4">
          <Link href="/profile">
            <FontAwesomeIcon
              icon={faUser}
              className=" h-5 w-5 sm:h-7 sm:w-7 text-[#00A081]"
            />
          </Link>
          <Link href="/cart" className=" relative">
            <FontAwesomeIcon
              icon={faCartShopping}
              className=" h-5 w-5 sm:h-7 sm:w-7 text-[#00A081]"
            />
            {foods.length > 0 && (
              <div className=" bg-red-500 h-5 w-5 flex items-center justify-center p-2 rounded-full absolute top-[-5px] text-sm left-5 text-white">
                {foods.length}
              </div>
            )}
          </Link>
          <Link
            href="/myorders"
            className=" text-[#00a081] font-semibold text-lg"
          >
            My orders
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link
            href={"/login"}
            className=" h-fit text-white bg-[#00A081] px-4 py-1 sm:px-5 sm:py-2 rounded-3xl "
          >
            Get started
          </Link>
          {
            <Link href="/cart" className=" relative">
              {foods.length > 0 && (
                <FontAwesomeIcon
                  icon={faCartShopping}
                  className=" h-5 w-5 sm:h-7 sm:w-7 text-[#00A081]"
                />
              )}
              {foods.length > 0 && (
                <div className=" bg-red-500 h-5 w-5 flex items-center justify-center p-2 rounded-full absolute top-[-5px] text-sm left-5 text-white">
                  {foods.length}
                </div>
              )}
            </Link>
          }
        </div>
      )}
    </header>
  );
};

export default Header;
