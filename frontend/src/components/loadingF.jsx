import React from "react";

const LoadingF = ({color}) => {
  return (
    <div className=" my-20 flex justify-center">
      <div className={` border-[${color}] h-10 w-10 rounded-full border-t-[3px] border-r-[3px] animate-spin`}></div>
    </div>
  );
};

export default LoadingF;
