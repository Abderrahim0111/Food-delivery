"use client";
import AdminHeader from "@/components/adminHeader";
import IsAddFood from "@/components/isAddFood";
import IsAddPartner from "@/components/isAddPartner";
import IsFoods from "@/components/isFoods";
import IsOrders from "@/components/isOrders";
import IsPartners from "@/components/isPartners";
import IsProfile from "@/components/isPorfile";
import PartnerHeader from "@/components/partnerHeader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const [isProfile, setisProfile] = useState(true);
  const [isPartners, setisPartners] = useState(false);
  const [isAddPartner, setisAddPartner] = useState(false);
  const [isOrders, setisOrders] = useState(false);
  const [isFoods, setisFoods] = useState(false);
  const [isAddFood, setisAddFood] = useState(false);
  const [userData, setuserData] = useState({});

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/fetchUser", { cache: "no-store" });
        const data = await res.json();

        if (!data.error) {
          setuserData(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const requireAuth = async () => {
      const res = await fetch("/api/requireAuth", {
        cache: "no-store",
      });
      const data = await res.json();
      if (data.error) {
        return router.push("/");
      }
      fetchUser();
    };
    requireAuth();
  }, [userData]);

  return (
    <div className="min-h-[calc(100vh-60px)] bg-[#FFC144] px-2">
      {userData.role === "admin" && (
        <AdminHeader
          {...{ setisAddPartner, setisProfile, setisPartners }}
        />
      )}
      {userData.role === "partner" && (
        <PartnerHeader
          {...{ setisFoods, setisOrders, setisProfile, setisAddFood }}
        />
      )}
      {isProfile && <IsProfile {...{ userData }} />}

      {userData.role === "admin" && isPartners && <IsPartners />}
      {userData.role === "admin" && isAddPartner && <IsAddPartner />}

      {userData.role === "partner" && isFoods && <IsFoods />}
      {userData.role === "partner" && isAddFood && <IsAddFood />}
      {userData.role === "partner" && isOrders && <IsOrders />}
    </div>
  );
};

export default Page;
