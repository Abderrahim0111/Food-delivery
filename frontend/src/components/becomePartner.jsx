import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

const BecomePartner = ({ props }) => {
  const myEmail = "abderrahim.defaoui@gmail.com";
  const subject = "Interest in Becoming a Partner";
  return (
    <div className=" bg-[#00000099] fixed inset-0 flex items-center justify-center z-10">
      <div className=" bg-white rounded-lg p-3 sm:min-w-[500px] max-w-[600px] flex flex-col max-h-[800px] overflow-y-scroll scrollbar mx-2">
        <Link
          scroll={false}
          href={
            props.searchParams.city ? `?city=${props.searchParams.city}` : "/"
          }
          className=" text-right mb-5 text-white sticky top-0 z-10 py-2 "
        >
          <FontAwesomeIcon
            icon={faClose}
            className="bg-[#B2B2B2] rounded-full h-5 w-5 p-1 cursor-pointer"
          />
        </Link>
        <h1 className=" text-3xl font-bold text-center mb-14">Work with us</h1>
        <div className="">
          <p>
            To become a partner and showcase your store on our website, allowing
            customers to purchase your food, as well as access their order data
            and manage deliveries, follow these simple steps:
          </p>
          <br />
          <ol>
            <li>
              1. Send us an email detailing your store and the quality of food you
              offer.
            </li>
            <li>
              2. Our team will review your request, and if everything meets our
              criteria, we'll add you as a partner.
            </li>
          </ol>
          <br />
          <p>
            As a partner, you'll have the ability to post, delete, and edit your
            food listings on our website at your convenience. To add a food item
            for the first time, follow these steps:
          </p>
          <br />
          <ol>
            <li>1. Provide your store name, logo, and city information.</li>
          </ol>
          <br />
          <p>
            Becoming a partner opens up new opportunities for your business and
            makes it easier for customers to discover and enjoy your offerings.
          </p>
        </div>
        <Link href={`mailto:${myEmail}?subject=${encodeURIComponent(subject)}`} className=" rounded-3xl my-10 w-full text-center p-2 bg-[#00A081] text-white font-bold">Join now!</Link>
      </div>
    </div>
  );
};

export default BecomePartner;
