import React from 'react';

const PartnerHeader = ({setisFoods, setisOrders, setisProfile, setisAddFood, isAddFood, isFoods, isOrders, isProfile}) => {
    return (
        <div className=' bg-[#00A081] px-2 mx-[-8px] text-white flex items-center justify-center gap-4 sm:gap-10 text-lg'>
            <button onClick={() => {
                setisProfile(true)
                setisAddFood(false)
                setisFoods(false)
                setisOrders(false)
            }} className={`${isProfile && 'bg-[#FFC045] text-[#00A081]'} py-1 px-2`}>Profile</button>
            <button onClick={() => {
                setisProfile(false)
                setisAddFood(true)
                setisFoods(false)
                setisOrders(false)
            }} className={`${isAddFood && 'bg-[#FFC045] text-[#00A081]'} py-1 px-2`}>Add food</button>
            <button onClick={() => {
                setisProfile(false)
                setisAddFood(false)
                setisFoods(true)
                setisOrders(false)
            }} className={`${isFoods && 'bg-[#FFC045] text-[#00A081]'} py-1 px-2`}>Foods</button>
            <button onClick={() => {
                setisProfile(false)
                setisAddFood(false)
                setisFoods(false)
                setisOrders(true)
            }} className={`${isOrders && 'bg-[#FFC045] text-[#00A081]'} py-1 px-2`}>Orders</button>
        </div>
    );
}

export default PartnerHeader;
