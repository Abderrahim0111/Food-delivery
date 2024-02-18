import React from 'react';

const AdminHeader = ({setisAddPartner, setisProfile, setisPartners}) => {
    return (
        <div className=' bg-[#00A081] p-2 text-white mx-[-8px] flex items-center justify-center gap-10 text-lg'>
            <button onClick={() => {
                setisProfile(true)
                setisPartners(false)
                setisAddPartner(false)
            }}>Profile</button>
            <button onClick={() => {
                setisProfile(false)
                setisPartners(true)
                setisAddPartner(false)
            }}>Partners</button>
            <button onClick={() => {
                setisProfile(false)
                setisPartners(false)
                setisAddPartner(true)
            }}>Add partner</button>
        </div>
    );
}

export default AdminHeader;
