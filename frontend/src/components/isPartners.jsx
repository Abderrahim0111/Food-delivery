import React, { useEffect, useState } from "react";
import LoadingF from "./loadingF";

const IsPartners = () => {
  const [partners, setpartners] = useState([]);
  const [loadingF, setloadingF] = useState(true);
  const [searchTerm, setsearchTerm] = useState("");

  const handleChange = (e) => {
    setsearchTerm(e.target.value);
  };

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await fetch(`/api/fetchPartners?search=${searchTerm}`, {
          cache: "no-store",
        });
        const data = await res.json();

        if (!data.error) {
          setloadingF(false);
          setpartners(data);
        }
        setloadingF(false);
      } catch (error) {
        setloadingF(false);
        console.log(error.message);
      }
    };
    fetchPartners();
  }, [partners]);

  const editRole = async (userId, role) => {
    const confirmation = window.confirm(`Update the role to "${role}" ?`);
    if (!confirmation) return;
    try {
      const res = await fetch(`/api/addPartner/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: role }),
      });
      const data = await res.json();
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loadingF) return <LoadingF />;

  return (
    <div className="mt-16 max-w-max mx-auto">
      <input
        onChange={handleChange}
        value={searchTerm}
        type="text"
        name="search"
        placeholder="Shearch a partner..."
        className=" outline-none p-2 rounded-xl border bg-[#FFF1DA] w-full mb-5"
      />
      <div className=" overflow-x-scroll scrollbar">
        {partners.length > 0 ? (
          <table className=" w-full">
            <thead className="bg-[#E9F7F5]">
              <tr>
                <th className="border  px-4 py-2 text-center">Store</th>
                <th className="border  px-4 py-2 text-center">Partner</th>
                <th className="border  px-4 py-2 text-center">Phone</th>
                <th className="border  px-4 py-2 text-center">Email</th>
                <th className="border  px-4 py-2 text-center">Role</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {partners.map((partner, index) => {
                return (
                  <tr key={index}>
                    <td className="border  px-4 py-2 text-center">
                      {partner.storeName}
                    </td>
                    <td className="border  px-4 py-2 text-center">
                      {partner.username}
                    </td>
                    <td className="border  px-4 py-2 text-center">
                      {partner.phone}
                    </td>
                    <td className="border  px-4 py-2 text-center">
                      {partner.email}
                    </td>
                    <td className="border  px-4 py-2 text-center">
                      <button
                        onClick={() => {
                          editRole(partner._id, "client");
                        }}
                        className="px-2 py-1 rounded-lg text-white bg-red-500"
                      >
                        Remove partner
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className=" text-center">No partners yet!</p>
        )}
      </div>
    </div>
  );
};

export default IsPartners;
