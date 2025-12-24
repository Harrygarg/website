import React, { useContext, useState } from 'react'
import { IoMdEye, IoMdEyeOff } from "react-icons/io"
import { IoClose } from "react-icons/io5"
import { FcGoogle } from "react-icons/fc"
import { FaApple, FaFacebook } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { authDataContext } from '../Context/AuthContext'
import { userDataContext } from '../Context/UserContext'
import { toast } from 'react-toastify'

function SignUp() {
    const [show, setShow] = useState(false)
    const navigate = useNavigate()
    const { serverUrl, loading, setLoading } = useContext(authDataContext)
    const { setUserData } = useContext(userDataContext)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSignUP = async (e) => {
        setLoading(true)
        try {
            e.preventDefault()
            const result = await axios.post(serverUrl + "/api/auth/signup", {
                name,
                email,
                password
            }, { withCredentials: true })
            setLoading(false)
            setUserData(result.data)
            navigate("/")
            toast.success("Signup Successfully")
        } catch (error) {
            setLoading(false)
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }

    return (
        <div className='min-h-screen w-full flex items-center justify-center bg-gray-50 p-4'>
            {/* Modal Container */}
            <div className='w-full max-w-[568px] bg-white rounded-xl shadow-xl animate-fadeIn'>
                {/* Header */}
                <div className='relative flex items-center justify-center py-5 px-6 border-b border-gray-200'>
                    <button 
                        className='absolute left-4 p-2 hover:bg-gray-100 rounded-full transition-colors'
                        onClick={() => navigate("/")}
                    >
                        <IoClose className='w-5 h-5 text-gray-700' />
                    </button>
                    <h2 className='text-base font-semibold text-gray-800'>Sign up</h2>
                </div>

                {/* Content */}
                <div className='p-6'>
                    <h1 className='text-2xl font-semibold text-gray-800 mb-2'>Welcome to Airbnb</h1>
                    <p className='text-gray-500 text-sm mb-6'>Create your account to start exploring amazing places to stay.</p>
                    
                    <form onSubmit={handleSignUP}>
                        {/* Name Input */}
                        <div className='mb-0'>
                            <div className='relative'>
                                <label className='absolute top-2 left-3 text-xs text-gray-500'>
                                    Full name
                                </label>
                                <input 
                                    type="text"
                                    className='w-full pt-7 pb-3 px-3 text-base border border-gray-300 rounded-t-lg focus:outline-none focus:border-gray-800'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    placeholder="Enter your name"
                                />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div className='mb-0'>
                            <div className='relative'>
                                <label className='absolute top-2 left-3 text-xs text-gray-500'>
                                    Email
                                </label>
                                <input 
                                    type="email"
                                    className='w-full pt-7 pb-3 px-3 text-base border border-t-0 border-gray-300 focus:outline-none focus:border-gray-800'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className='mb-4'>
                            <div className='relative'>
                                <label className='absolute top-2 left-3 text-xs text-gray-500'>
                                    Password
                                </label>
                                <input 
                                    type={show ? "text" : "password"}
                                    className='w-full pt-7 pb-3 px-3 pr-12 text-base border border-t-0 border-gray-300 rounded-b-lg focus:outline-none focus:border-gray-800'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="Create a password"
                                />
                                <button
                                    type="button"
                                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700'
                                    onClick={() => setShow(!show)}
                                >
                                    {show ? <IoMdEyeOff className='w-5 h-5' /> : <IoMdEye className='w-5 h-5' />}
                                </button>
                            </div>
                        </div>

                        <p className='text-xs text-gray-500 mb-4'>
                            By selecting <strong>Agree and continue</strong>, I agree to Airbnb's{' '}
                            <a href="#" className='text-[#E31C5F] font-semibold hover:underline'>Terms of Service</a>,{' '}
                            <a href="#" className='text-[#E31C5F] font-semibold hover:underline'>Payments Terms of Service</a> and{' '}
                            <a href="#" className='text-[#E31C5F] font-semibold hover:underline'>Privacy Policy</a>.
                        </p>

                        {/* Sign Up Button */}
                        <button 
                            type="submit"
                            className='w-full py-3.5 bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] text-white text-base font-semibold rounded-lg hover:opacity-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed'
                            disabled={loading}
                        >
                            {loading ? "Creating account..." : "Agree and continue"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className='flex items-center gap-4 my-6'>
                        <div className='flex-1 h-px bg-gray-200'></div>
                        <span className='text-sm text-gray-500'>or</span>
                        <div className='flex-1 h-px bg-gray-200'></div>
                    </div>

                    {/* Social Sign Up Buttons */}
                    <div className='space-y-3'>
                        <button className='w-full flex items-center justify-center gap-3 py-3.5 px-4 border border-gray-800 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors'>
                            <FcGoogle className='w-5 h-5' />
                            Continue with Google
                        </button>
                        
                        <button className='w-full flex items-center justify-center gap-3 py-3.5 px-4 border border-gray-800 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors'>
                            <FaApple className='w-5 h-5' />
                            Continue with Apple
                        </button>
                        
                        <button className='w-full flex items-center justify-center gap-3 py-3.5 px-4 border border-gray-800 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors'>
                            <FaFacebook className='w-5 h-5 text-[#1877F2]' />
                            Continue with Facebook
                        </button>
                    </div>

                    {/* Login Link */}
                    <p className='text-center text-sm text-gray-600 mt-6'>
                        Already have an account?{' '}
                        <button 
                            className='font-semibold text-[#E31C5F] hover:underline'
                            onClick={() => navigate("/login")}
                        >
                            Log in
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUp