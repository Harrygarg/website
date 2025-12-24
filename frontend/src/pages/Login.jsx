import React, { useContext, useState } from 'react'
import { IoMdEye, IoMdEyeOff } from "react-icons/io"
import { IoClose } from "react-icons/io5"
import { FcGoogle } from "react-icons/fc"
import { FaApple, FaFacebook } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import { useNavigate } from 'react-router-dom'
import { authDataContext } from '../Context/AuthContext'
import axios from 'axios'
import { userDataContext } from '../Context/UserContext'
import { toast } from 'react-toastify'

function Login() {
    const [show, setShow] = useState(false)
    const [loginMethod, setLoginMethod] = useState('email') // 'email' or 'phone'
    const { serverUrl, loading, setLoading } = useContext(authDataContext)
    const { setUserData } = useContext(userDataContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [countryCode, setCountryCode] = useState("+91")
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        setLoading(true)
        try {
            e.preventDefault()
            const result = await axios.post(serverUrl + "/api/auth/login", {
                email,
                password
            }, { withCredentials: true })
            setLoading(false)
            setUserData(result.data)
            navigate("/")
            toast.success("Login Successfully")
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
                    <h2 className='text-base font-semibold text-gray-800'>Log in or sign up</h2>
                </div>

                {/* Content */}
                <div className='p-6'>
                    <h1 className='text-2xl font-semibold text-gray-800 mb-6'>Welcome to Airbnb</h1>
                    
                    <form onSubmit={handleLogin}>
                        {loginMethod === 'phone' ? (
                            <>
                                {/* Country/Region Dropdown */}
                                <div className='mb-0'>
                                    <div className='relative'>
                                        <label className='absolute top-2 left-3 text-xs text-gray-500'>
                                            Country/Region
                                        </label>
                                        <select 
                                            className='w-full pt-7 pb-3 px-3 text-base border border-gray-300 rounded-t-lg focus:outline-none focus:border-gray-800 bg-white appearance-none cursor-pointer'
                                            value={countryCode}
                                            onChange={(e) => setCountryCode(e.target.value)}
                                        >
                                            <option value="+91">India (+91)</option>
                                            <option value="+1">United States (+1)</option>
                                            <option value="+44">United Kingdom (+44)</option>
                                            <option value="+61">Australia (+61)</option>
                                            <option value="+81">Japan (+81)</option>
                                        </select>
                                        <div className='absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none'>
                                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Phone Input */}
                                <div className='mb-3'>
                                    <input 
                                        type="tel" 
                                        placeholder="Phone number"
                                        className='w-full py-4 px-3 text-base border border-t-0 border-gray-300 rounded-b-lg focus:outline-none focus:border-gray-800'
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>

                                <p className='text-xs text-gray-500 mb-4'>
                                    We'll call or text you to confirm your number. Standard message and data rates apply. 
                                    <a href="#" className='font-semibold underline'> Privacy Policy</a>
                                </p>
                            </>
                        ) : (
                            <>
                                {/* Email Input */}
                                <div className='mb-3'>
                                    <div className='relative'>
                                        <label className='absolute top-2 left-3 text-xs text-gray-500'>
                                            Email
                                        </label>
                                        <input 
                                            type="email" 
                                            className='w-full pt-7 pb-3 px-3 text-base border border-gray-300 rounded-t-lg focus:outline-none focus:border-gray-800'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
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
                            </>
                        )}

                        {/* Continue Button */}
                        <button 
                            type="submit"
                            className='w-full py-3.5 bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] text-white text-base font-semibold rounded-lg hover:opacity-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed'
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Continue"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className='flex items-center gap-4 my-6'>
                        <div className='flex-1 h-px bg-gray-200'></div>
                        <span className='text-sm text-gray-500'>or</span>
                        <div className='flex-1 h-px bg-gray-200'></div>
                    </div>

                    {/* Social Login Buttons */}
                    <div className='space-y-3'>
                        {loginMethod === 'email' && (
                            <button 
                                className='w-full flex items-center justify-center gap-3 py-3.5 px-4 border border-gray-800 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors'
                                onClick={() => setLoginMethod('phone')}
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                                </svg>
                                Continue with Phone
                            </button>
                        )}
                        
                        <button 
                            className='w-full flex items-center justify-center gap-3 py-3.5 px-4 border border-gray-800 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors'
                            onClick={() => {
                                // Demo Google login - creates demo user
                                setLoading(true)
                                setTimeout(() => {
                                    const demoUser = { name: 'Google User', email: 'google.user@gmail.com', _id: 'google123' }
                                    setUserData(demoUser)
                                    localStorage.setItem('demoUser', JSON.stringify(demoUser))
                                    setLoading(false)
                                    toast.success('Logged in with Google (Demo)')
                                    navigate('/')
                                }, 1500)
                            }}
                        >
                            <FcGoogle className='w-5 h-5' />
                            Continue with Google
                        </button>
                        
                        <button 
                            className='w-full flex items-center justify-center gap-3 py-3.5 px-4 border border-gray-800 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors'
                            onClick={() => {
                                // Demo Apple login - creates demo user
                                setLoading(true)
                                setTimeout(() => {
                                    const demoUser = { name: 'Apple User', email: 'apple.user@icloud.com', _id: 'apple123' }
                                    setUserData(demoUser)
                                    localStorage.setItem('demoUser', JSON.stringify(demoUser))
                                    setLoading(false)
                                    toast.success('Logged in with Apple (Demo)')
                                    navigate('/')
                                }, 1500)
                            }}
                        >
                            <FaApple className='w-5 h-5' />
                            Continue with Apple
                        </button>

                        {loginMethod === 'phone' && (
                            <button 
                                className='w-full flex items-center justify-center gap-3 py-3.5 px-4 border border-gray-800 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors'
                                onClick={() => setLoginMethod('email')}
                            >
                                <MdEmail className='w-5 h-5' />
                                Continue with email
                            </button>
                        )}
                        
                        <button 
                            className='w-full flex items-center justify-center gap-3 py-3.5 px-4 border border-gray-800 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors'
                            onClick={() => {
                                // Demo Facebook login
                                setLoading(true)
                                setTimeout(() => {
                                    const demoUser = { name: 'Facebook User', email: 'fb.user@facebook.com', _id: 'fb123' }
                                    setUserData(demoUser)
                                    localStorage.setItem('demoUser', JSON.stringify(demoUser))
                                    setLoading(false)
                                    toast.success('Logged in with Facebook (Demo)')
                                    navigate('/')
                                }, 1500)
                            }}
                        >
                            <FaFacebook className='w-5 h-5 text-[#1877F2]' />
                            Continue with Facebook
                        </button>
                    </div>

                    {/* Sign Up Link */}
                    <p className='text-center text-sm text-gray-600 mt-6'>
                        Don't have an account?{' '}
                        <button 
                            className='font-semibold text-[#E31C5F] hover:underline'
                            onClick={() => navigate("/signup")}
                        >
                            Sign up
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
