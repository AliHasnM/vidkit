'use client'

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const RegisterPage = () => {
    // Form Data
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    // confirm password
    const [confirmPassword, setConfirmPassword] = useState('');
    // navigation router
    const router = useRouter();

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.password !== confirmPassword) {
            // Handle password mismatch or wrong password
            console.error("Passwords do not match");
            alert("Passwords do not match");
            return;
        }
        try {
            // Send a POST request to the API endpoint
            const response = await axios.post('/api/auth/register', formData);
            if (response.status === 201) {
                // Registration successful, redirect to login page
                router.push('/auth/login');
            } else {
                // Handle error response
                console.error("Registration failed", response.data);
                alert("Registration failed");
            }
        } catch (error) {
            // Handle error
            console.error("Error during registration", error);
        }
    }
    return (
        <div className='flex flex-col items-center min-h-screen p-4'>
            <h1 className='text-center mt-10 font-bold text-3xl tracking-tight'>Register Your Account</h1>
            <form className='border-2 w-xl mt-10 p-10 rounded-md' onSubmit={handleSubmit}>
                <input
                    className='border border-zinc-600  p-2 rounded mb-4 w-full'
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
                <input
                    className='border border-zinc-600 p-2 rounded mb-4 w-full'
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <div className='flex justify-center items-center mt-4 tracking-tight'>
                    <button className='bg-zinc-700 rounded-md py-3 px-4 text-center hover:bg-zinc-500 hover:cursor-pointer' type="submit">Register</button>
                </div>
                <div className='text-center mt-4 tracking-tight'>
                    Already have an account? <a className='text-blue-500 hover:underline' href="/login">Login</a>
                </div>
            </form>
        </div>
    )
}

export default RegisterPage