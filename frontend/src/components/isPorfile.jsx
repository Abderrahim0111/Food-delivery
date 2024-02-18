"use client"
import { logged, loggedOut } from '@/redux/userSlice';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const IsProfile = ({userData}) => {
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState("");
    const [updatedData, setupdatedData] = useState({});
    const [image, setimage] = useState(null);
    const [updated, setupdated] = useState(false);

    const router = useRouter()
    const dispatch = useDispatch()
    

    const logout = async () => {
        try {
            const res = await fetch('/api/logout', {cache: "no-store"})
            const data = await res.json()
            if(data.message){
                router.push('/')
                dispatch(logged(null))
                dispatch(loggedOut())
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleChange = (e) => {
        setupdatedData({...updatedData, [e.target.name]: e.target.value})
    }

    const changeImage = (e) => {
        setimage(e.target.files[0])
    }

    const handleSubmit = async  (e) => {
        e.preventDefault()
        setloading(true)
        const formData = new FormData()
        formData.append("storeImage", image)

        try {
            if(image){
                const res1 = await fetch('/api/uploadStoreImage', {
                    method: 'POST',
                    body: formData
                })
                const data1 = await res1.json()
                if(data1.error){
                    setloading(false)
                    return seterror(data1.error) 
                }
                const res = await fetch('/api/updateProfile', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({...updatedData, storeImage: data1})
                })
                const data = await res.json()
                if(data.error){
                    setloading(false)
                    return seterror(data.error)
                }
                setupdated(true)
                setTimeout(() => {
                    setupdated(false)
                }, 2000);
                dispatch(logged(data))
                setloading(false)
            }else{
                const res = await fetch('/api/updateProfile', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedData)
                })
                const data = await res.json()
                if(data.error){
                    setloading(false)
                    return seterror(data.error)
                }
                setupdated(true)
                setTimeout(() => {
                    setupdated(false)
                }, 2000);
                dispatch(logged(data))
                setloading(false)
            }
            } catch (error) {
            setloading(false)
            console.log(error.message)
        }
    }

    return (
        <>
            <h1 className=' font-bold text-5xl text-center py-10 pt-16'>Your profile</h1>
            <form onSubmit={handleSubmit} className=' flex flex-col gap-3 max-w-lg mx-auto'>
                <input onChange={handleChange} defaultValue={userData.username} type="text" name="username" placeholder='Username' className=' p-2 rounded-lg w-full outline-none'/>
                <input onChange={handleChange} defaultValue={userData.phone} type="text" name="phone" placeholder='Phone number' className=' p-2 rounded-lg w-full outline-none'/>
                <input onChange={handleChange} defaultValue={userData.email} type="email" name="email" placeholder='Email' className=' p-2 rounded-lg w-full outline-none'/>
                <input onChange={handleChange} type="password" name="password" placeholder='New password' className=' p-2 rounded-lg w-full outline-none' />
                {userData.role === 'partner' && userData.modified === true && 
                <>
                    <input onChange={handleChange} defaultValue={userData.storeName} type="text" name="storeName" placeholder='Store name' className=' p-2 rounded-lg w-full outline-none'  />
                    <input onChange={handleChange} defaultValue={userData.storeCity} type="text" name="storeCity"  placeholder='Store city' className=' p-2 rounded-lg w-full outline-none'/>
                    <input onChange={changeImage} type="file" name="storeImage" accept='image/*' multiple={false} className=' p-2 rounded-lg w-full outline-none border' />
                </>
                }
                <button className=' bg-[#00A081] text-white px-4 py-2 rounded-lg mt-5'>{loading ? "Updating..." : 'Update profile'}</button>
                <button type='button' onClick={logout} className=' bg-red-500 text-white px-4 py-2 rounded-lg'>Logout</button>
                {error && <p className=' text-red-500'>{error}</p>}
            </form>
            { updated && <div className=" bg-white p-3 text-green-500 fixed top-28 z-10 right-5 rounded-lg shadow-md border">
                Profile updated successfully!
            </div>}
        </>
    );
}

export default IsProfile;
