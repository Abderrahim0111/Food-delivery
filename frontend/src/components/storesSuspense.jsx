import React from 'react';

const StoresSuspense = () => {
    return (
        <div className=" mb-16 px-2 max-w-4xl mx-auto">
            <h1 className=" text-4xl text-center font-bold mb-8 bg-gray-300 animate-pulse p-3"></h1>
            <div className=" flex flex-wrap justify-center gap-8 ">
            {[1,1,1,1].map((item, index) => {
                return(
                <div key={index} className=" cursor-pointer hover:scale-105 transition-all duration-300 flex items-center flex-col relative">
                    <div className=" bg-gray-300 rounded-full animate-pulse h-24 w-24"></div>
                    <p className=" bg-gray-300 p-3 px-6 py-1 absolute bottom-[-10px]  rounded-xl"></p>
                </div>
                )
            })}
            </div>
        </div>
    );
}

export default StoresSuspense;
