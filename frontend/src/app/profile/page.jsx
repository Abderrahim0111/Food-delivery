"use client";
import AdminHeader from "@/components/adminHeader";
import IsAddFood from "@/components/isAddFood";
import IsAddPartner from "@/components/isAddPartner";
import IsFoods from "@/components/isFoods";
import IsOrders from "@/components/isOrders";
import IsPartners from "@/components/isPartners";
import IsProfile from "@/components/isPorfile";
import LoadingF from "@/components/loadingF";
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
  const [loadingF, setloadingF] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/fetchUser", { cache: "no-store" });
        const data = await res.json();

        if (!data.error) {
          setuserData(data);
          setloadingF(false)
        }
        setloadingF(false)
      } catch (error) {
        setloadingF(false)
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

  if(loadingF) return <LoadingF />
  return (
    <div className="px-2">
      {userData.role === "admin" && (
        <AdminHeader
          {...{ setisAddPartner, setisProfile, setisPartners, isProfile, isPartners, isAddPartner }}
        />
      )}
      {userData.role === "partner" && (
        <PartnerHeader
          {...{ setisFoods, setisOrders, setisProfile, setisAddFood, isAddFood, isFoods, isOrders, isProfile }}
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
