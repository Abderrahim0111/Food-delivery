
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';

const ProductLoader = ({props}) => {
    return (
    <div className=" bg-[#00000099] flex items-center justify-center fixed top-0 bottom-0 left-0 right-0 z-10">
      <div className=" bg-white rounded-lg px-3 sm:min-w-[450px] max-w-[500px] h-[700px] overflow-y-scroll scrollbar mx-2 flex flex-col">
        <Link scroll={false} href={`/store/${props.params.storeName}?category=${props.searchParams.category}`} className=" text-right mb-5 text-white sticky top-0 bg-white z-10 py-2 ">
          <FontAwesomeIcon
            icon={faClose}
            className="bg-[#B2B2B2] rounded-full h-5 w-5 p-1 cursor-pointer"
          />
        </Link>
        <div className=" flex-1">
          <div className=" flex justify-center mb-8 ">
            <div className="h-[17rem] w-[17rem] animate-pulse bg-gray-300 rounded-lg p-3"></div>
          </div>
          <h2 className=" capitalize text-xl font-bold animate-pulse bg-gray-300 rounded-lg p-3"></h2>
          <p className=" my-2 animate-pulse bg-gray-300 rounded-lg p-3"></p>
          <p className=" opacity-80 text-sm animate-pulse bg-gray-300 rounded-lg p-3"></p>
        </div>
        <button className='w-full text-center bg-gray-300 rounded-3xl  font-bold text-white p-4 mb-3 animate-pulse'></button>
      </div>
    </div>
    );
}

export default ProductLoader;
