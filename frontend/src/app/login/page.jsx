"use client";
import { logged } from "@/redux/userSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const [userData, setuserData] = useState({});
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false);

  const { userCity } = useSelector((state) => state.user);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleChnage = (e) => {
    setuserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (data.error) {
        setloading(false);
        return seterror(data.error);
      }
      router.push(`${userCity ? `/?city=${userCity}` : "/"}`);
      dispatch(logged(data));
      setloading(false);
      seterror("");
    } catch (error) {
      setloading(false);
      console.log(error.message);
    }
  };

  useEffect(() => {
    const requireAuth = async () => {
      const res = await fetch("/api/requireAuth", {
        cache: "no-store",
      });
      const data = await res.json();
      if (!data.error) {
        return router.push("/");
      }
    };
    requireAuth();
  }, []);

  return (
    <div className=" bg-[#FFC144]">
      <h1 className=" font-bold text-3xl sm:text-5xl text-center py-10">
        Login with your account
      </h1>
      <form
        onSubmit={handleSubmit}
        className=" flex flex-col gap-3 max-w-lg mx-auto mb-10 px-2"
      >
        <input
          onChange={handleChnage}
          type="email"
          name="email"
          placeholder="Email"
          className=" p-2 rounded-lg w-full outline-none"
        />
        <input
          onChange={handleChnage}
          type="password"
          name="password"
          placeholder="Password"
          className=" p-2 rounded-lg w-full outline-none"
        />
        <button className=" bg-[#00A081] text-white px-4 py-2 rounded-lg mt-5">
          {loading ? "Loading..." : "Login now"}
        </button>
        <div className="flex items-center gap-3">
          <p>Don't have an account?</p>
          <Link href="/register" className=" text-[#00A081]">
            Create one
          </Link>
        </div>
        {error && <p className=" text-red-500">{error}</p>}
      </form>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#fff" fillOpacity="1" d="M0,32L80,58.7C160,85,320,139,480,160C640,181,800,171,960,149.3C1120,128,1280,96,1360,80L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
    </div>
  );
};

export default Page;
