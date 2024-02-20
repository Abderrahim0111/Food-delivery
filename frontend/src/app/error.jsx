"use client";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

const Error = () => {
  const { userCity } = useSelector((state) => state.user);
  userCity ? redirect(`/?city=${userCity}`) : redirect("/");
};

export default Error;
