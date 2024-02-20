import React from 'react';

const AdminHeader = ({setisAddPartner, setisProfile, setisPartners, isProfile, isPartners, isAddPartner}) => {
    return (
        <div className=' bg-[#00A081] text-white mx-[-8px] flex items-center justify-center gap-3 sm:gap-10 text-lg'>
            <button onClick={() => {
                setisProfile(true)
                setisPartners(false)
                setisAddPartner(false)
            }} className={`${isProfile && 'bg-[#FFC045] text-[#00A081]'} py-1 px-2`}>Profile</button>
            <button onClick={() => {
                setisProfile(false)
                setisPartners(true)
                setisAddPartner(false)
            }} className={`${isPartners && 'bg-[#FFC045] text-[#00A081]'} py-1 px-2`}>Partners</button>
            <button onClick={() => {
                setisProfile(false)
                setisPartners(false)
                setisAddPartner(true)
            }} className={`${isAddPartner && 'bg-[#FFC045] text-[#00A081]'} py-1 px-2`}>Add partner</button>
        </div>
    );
}

export default AdminHeader;
