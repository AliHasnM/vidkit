'use client'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const LoginPage = () => {
    // Form Data
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    // navigation router
    const router = useRouter();
    // handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // Login from Next Auth API
            const response = await signIn('credentials', {
                email: formData.email,
                password: formData.password,
                redirect: false, // Prevent automatic redirection
            })
            // Check if error or success
            if (response?.error) {
                // Handle error response
                console.error("Login failed", response.error);
            } else {
                // Login successful, redirect to home page
                router.push('/');
            }
        } catch (error) {
            console.error("Login failed", error);
        }
    }
    return (
        <div className='flex flex-col items-center min-h-screen p-4'>
            <h1 className='text-center mt-10 font-bold text-3xl tracking-tight'>Login Your Account</h1>
            <form className='border-2 w-xl mt-10 p-10 rounded-md' onSubmit={handleSubmit}>
                <input
                    className='border border-zinc-600 p-2 rounded mb-4 w-full'
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
                <input
                    className='border border-zinc-600 p-2 rounded mb-4 w-full'
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                />
                <div className='flex justify-center items-center mt-4 tracking-tight'>
                    <button className='bg-zinc-700 rounded-md py-3 px-4 text-center hover:bg-zinc-500 hover:cursor-pointer' type="submit">Login</button>
                </div>
                <div className='text-center mt-4 tracking-tight'>
                    If you haven&apos;t account ? <a className='text-blue-500 hover:underline' href="/register">Register</a>
                </div>
            </form>
        </div>
    )
}

export default LoginPage