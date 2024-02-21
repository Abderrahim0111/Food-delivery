import React, { useEffect, useState } from "react";
import LoadingF from "./loadingF";

const IsAddPartner = () => {
  const [users, setusers] = useState([]);
  const [loadingF, setloadingF] = useState(true);
  const [searchTerm, setsearchTerm] = useState("");

  const handleChange = (e) => {
    setsearchTerm(e.target.value);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/fetchUsers?search=${searchTerm}`, { cache: "no-store" });
        const data = await res.json();

        if (!data.error) {
          setusers(data);
          setloadingF(false);
        }
        setloadingF(false);
      } catch (error) {
        setloadingF(false);
        console.log(error.message);
      }
    };
    fetchUsers();
  }, [users]);

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
        placeholder="Shearch a user..."
        className=" outline-none p-2 rounded-xl border bg-[#FFF1DA] w-full mb-5"
      />
      <div className=" overflow-x-scroll scrollbar">
      {users.length>0? <table className=" w-full ">
        <thead className="bg-[#E9F7F5]">
          <tr>
            <th className="border  px-4 py-2 text-center">Username</th>
            <th className="border  px-4 py-2 text-center">Phone</th>
            <th className="border  px-4 py-2 text-center">Email</th>
            <th className="border  px-4 py-2 text-center">Role</th>
            <th className="border  px-4 py-2 text-center">Edit role</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {users.map((user, index) => {
            return (
              <tr key={index}>
                <td className="border  px-4 py-2 text-center">
                  {user.username}
                </td>
                <td className="border  px-4 py-2 text-center">{user.phone}</td>
                <td className="border  px-4 py-2 text-center">{user.email}</td>
                <td className="border  px-4 py-2 text-center">{user.role}</td>
                <td className="border  px-4 py-2 text-center">
                  {user.role === "client" && (
                    <button
                      onClick={() => {
                        editRole(user._id, "partner");
                      }}
                      className=" px-2 py-1 rounded-lg text-white bg-[#00A081]"
                    >
                      Add partner
                    </button>
                  )}
                  {user.role === "partner" && (
                    <button
                      onClick={() => {
                        editRole(user._id, "client");
                      }}
                      className=" px-2 py-1 rounded-lg text-white bg-red-500"
                    >
                      Remove partner
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>:<p className=" text-center">No users yet!</p>}
      </div>
    </div>
  );
};

export default IsAddPartner;
