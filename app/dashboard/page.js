"use client"
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { fetchuser, updateprofile } from '@/actions/useractions'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Dashboard = () => {
    const { data: session } = useSession()
    const router = useRouter()
    const [form, setform] = useState({})
    useEffect(() => {
        document.title = 'Dashboard - Buy Me a Coffee'
        if (!session) {
            router.push('/login')
        }
        else {
            getData()
        }
    }, [router, session])

    const getData = async () => {
        let u = await fetchuser(session.user.name)
        setform(u)
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        let a = await updateprofile(e, session.user.name)
        let newdata = Object.fromEntries(e)
        session.user.name = newdata.username
        if (a) {
            toast.success('Profile Updated', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
        } else {
            toast.error('Username already exists', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
        }
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <div>
                <h1 className='font-bold text-2xl py-12 text-center px-4'>Welcome to your Dashboard</h1>
                <form className="max-w-sm mx-auto pb-24 px-4" action={handleSubmit}>
                    <div className="mb-2">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" id="name" name='name' value={form.name ? form.name : ""} onChange={handleChange} className="bg-[#f0f0f0] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="email" id="email" name='email' value={form.email ? form.email : ""} onChange={handleChange} className="bg-[#f0f0f0] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                        <input type="text" id="username" name='username' value={form.username ? form.username : ""} onChange={handleChange} className="bg-[#f0f0f0] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="coverpic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cover Picture</label>
                        <input type="text" id="coverpic" name='coverpic' value={form.coverpic ? form.coverpic : ""} onChange={handleChange} className="bg-[#f0f0f0] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="profilepic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Picture</label>
                        <input type="text" id="profilepic" name='profilepic' value={form.profilepic ? form.profilepic : ""} onChange={handleChange} className="bg-[#f0f0f0] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="cashfreeid" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cashfree Id</label>
                        <input type="text" id="cashfreeid" name='cashfreeid' value={form.cashfreeid ? form.cashfreeid : ""} onChange={handleChange} className="bg-[#f0f0f0] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="cashfreesecret" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cashfree Secret</label>
                        <input type="text" id="cashfreesecret" name='cashfreesecret' value={form.cashfreesecret ? form.cashfreesecret : ""} onChange={handleChange} className="bg-[#f0f0f0] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    <button type="submit" className="mt-4 bg-[#ffdd00] hover:bg-yellow-400 font-bold rounded-lg text-xl w-full px-5 py-3 text-center">Update Profile</button>
                </form>

            </div>
        </>
    )
}


export default Dashboard
