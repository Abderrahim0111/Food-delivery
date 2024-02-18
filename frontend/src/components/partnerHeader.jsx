import React from 'react';

const PartnerHeader = ({setisFoods, setisOrders, setisProfile, setisAddFood}) => {
    return (
        <div className=' bg-[#00A081] p-2 mx-[-8px] text-white flex items-center justify-center gap-10 text-lg'>
            <button onClick={() => {
                setisProfile(true)
                setisAddFood(false)
                setisFoods(false)
                setisOrders(false)
            }}>Profile</button>
            <button onClick={() => {
                setisProfile(false)
                setisAddFood(true)
                setisFoods(false)
                setisOrders(false)
            }}>Add food</button>
            <button onClick={() => {
                setisProfile(false)
                setisAddFood(false)
                setisFoods(true)
                setisOrders(false)
            }}>Foods</button>
            <button onClick={() => {
                setisProfile(false)
                setisAddFood(false)
                setisFoods(false)
                setisOrders(true)
            }}>Orders</button>
        </div>
    );
}

export default PartnerHeader;
