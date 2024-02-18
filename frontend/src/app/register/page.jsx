"use client"
import { logged } from '@/redux/userSlice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Page = () => {
    const [userData, setuserData] = useState({});
    const [error, seterror] = useState("");
    const [loading, setloading] = useState(false);

    const {userCity} = useSelector((state) => state.user)

    const router = useRouter()
    const dispatch = useDispatch()

    const handleChnage = (e) => {
        setuserData({...userData, [e.target.name]: e.target.value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setloading(true)
        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            const data = await res.json()
            if(data.error){
                setloading(false)
                return seterror(data.error)
            }
            router.push(`${userCity ? `/?city=${userCity}` : "/"}`)
            dispatch(logged(data))
            setloading(false)
            seterror("")
        } catch (error) {
            setloading(false)
            console.log(error.message)
        }
    }

    useEffect(() => {
        const requireAuth = async () => {
            const res = await fetch('/api/requireAuth', {
                cache: "no-store"
            })
            const data = await res.json()
            if(!data.error){
                return router.push("/")
            }
        }
        requireAuth()
    }, [])

    return (
        <div className='h-[calc(100vh-64px)] bg-[#FFC144] px-2'>
            <h1 className=' font-bold text-5xl text-center py-10'>Welcome</h1>
            <form onSubmit={handleSubmit} className=' flex flex-col gap-3 max-w-lg mx-auto'>
                <input onChange={handleChnage} type="text" name="username" placeholder='Username' className=' p-2 rounded-lg w-full outline-none'/>
                <input onChange={handleChnage} type="text" name="phone" placeholder='Phone number' className=' p-2 rounded-lg w-full outline-none'/>
                <input onChange={handleChnage} type="email" name="email" placeholder='Email' className=' p-2 rounded-lg w-full outline-none'/>
                <input onChange={handleChnage} type="password" name="password" placeholder='Password' className=' p-2 rounded-lg w-full outline-none' />
                <button className=' bg-[#00A081] text-white px-4 py-2 rounded-lg mt-5'>{loading ? "Loading..." : 'Create account'}</button>
                <div className="flex items-center gap-3">
                    <p>Already have an account?</p>
                    <Link href="/login" className=' text-[#00A081]'>Login</Link>
                </div>
                {error && <p className=' text-red-500'>{error}</p>}
            </form>
        </div>
    );
}

export default Page;
