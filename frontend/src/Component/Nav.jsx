import React, { useContext, useEffect, useState } from 'react'
import { FiSearch, FiGlobe } from "react-icons/fi"
import { HiOutlineMenuAlt3 } from "react-icons/hi"
import { FaUserCircle } from "react-icons/fa"
import { MdOutlineWhatshot, MdOutlineVilla, MdOutlinePool, MdOutlineBedroomParent, MdOutlineApartment } from "react-icons/md"
import { GiFarmTractor, GiWoodCabin, GiShop } from "react-icons/gi"
import { IoBedOutline } from "react-icons/io5"
import { useNavigate } from 'react-router-dom'
import { authDataContext } from '../Context/AuthContext'
import axios from 'axios'
import { userDataContext } from '../Context/UserContext'
import { listingDataContext } from '../Context/ListingContext'
import SearchBar from './SearchBar'
import logo from '../assets/logo.png'

function Nav() {
    const [showPopup, setShowPopup] = useState(false)
    const { userData, setUserData } = useContext(userDataContext)
    const navigate = useNavigate()
    const { serverUrl } = useContext(authDataContext)
    const [activeCategory, setActiveCategory] = useState('trending')
    const { listingData, setNewListData } = useContext(listingDataContext)

    const categories = [
        { id: 'trending', name: 'Trending', icon: MdOutlineWhatshot },
        { id: 'villa', name: 'Villas', icon: MdOutlineVilla },
        { id: 'farmHouse', name: 'Farm House', icon: GiFarmTractor },
        { id: 'poolHouse', name: 'Pool House', icon: MdOutlinePool },
        { id: 'rooms', name: 'Rooms', icon: MdOutlineBedroomParent },
        { id: 'flat', name: 'Flats', icon: MdOutlineApartment },
        { id: 'pg', name: 'PG', icon: IoBedOutline },
        { id: 'cabin', name: 'Cabins', icon: GiWoodCabin },
        { id: 'shops', name: 'Shops', icon: GiShop },
    ]

    const handleLogOut = async () => {
        try {
            await axios.post(serverUrl + "/api/auth/logout", {}, { withCredentials: true })
            setUserData(null)
            setShowPopup(false)
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    const handleCategory = (categoryId) => {
        setActiveCategory(categoryId)
        if (categoryId === 'trending') {
            setNewListData(listingData)
        } else {
            setNewListData(listingData?.filter((list) => list.category === categoryId) || [])
        }
    }

    const handleLogoClick = () => {
        navigate("/")
    }

    // Close popup when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (showPopup && !e.target.closest('.profile-menu-container')) {
                setShowPopup(false)
            }
        }
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [showPopup])

    return (
        <header className='fixed top-0 left-0 right-0 bg-white z-50'>
            {/* Main Navbar */}
            <div className='border-b border-gray-200'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='flex items-center justify-between h-20'>
                        {/* Logo */}
                        <div className='flex-shrink-0 z-10'>
                            <img 
                                src={logo} 
                                alt="Airbnb" 
                                className='h-8 w-auto cursor-pointer'
                                onClick={handleLogoClick}
                            />
                        </div>

                        {/* Search Bar - Desktop */}
                        <div className='hidden lg:flex flex-1 justify-center px-8'>
                            <SearchBar />
                        </div>

                        {/* Right Side */}
                        <div className='flex items-center gap-2'>
                            <button 
                                className='hidden md:block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-full transition-colors'
                                onClick={() => navigate("/listingpage1")}
                            >
                                Airbnb your home
                            </button>
                            <button className='hidden md:flex p-2.5 hover:bg-gray-100 rounded-full transition-colors'>
                                <FiGlobe className='w-5 h-5 text-gray-700' />
                            </button>
                            
                            {/* Profile Menu */}
                            <div className='relative profile-menu-container'>
                                <button 
                                    className='flex items-center gap-2 px-2 py-1.5 border border-gray-200 rounded-full hover:shadow-md transition-shadow'
                                    onClick={(e) => { e.stopPropagation(); setShowPopup(!showPopup) }}
                                >
                                    <HiOutlineMenuAlt3 className='w-4 h-4 text-gray-700' />
                                    <FaUserCircle className='w-8 h-8 text-gray-500' />
                                </button>

                                {/* Dropdown Menu */}
                                {showPopup && (
                                    <div className='absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50'>
                                        {!userData ? (
                                            <>
                                                <button 
                                                    className='w-full px-4 py-2.5 text-left text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors'
                                                    onClick={() => { navigate("/signup"); setShowPopup(false) }}
                                                >
                                                    Sign up
                                                </button>
                                                <button 
                                                    className='w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors'
                                                    onClick={() => { navigate("/login"); setShowPopup(false) }}
                                                >
                                                    Log in
                                                </button>
                                                <div className='border-t border-gray-100 my-2'></div>
                                                <button 
                                                    className='w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors'
                                                    onClick={() => { navigate("/listingpage1"); setShowPopup(false) }}
                                                >
                                                    Airbnb your home
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button 
                                                    className='w-full px-4 py-2.5 text-left text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors'
                                                    onClick={() => { navigate("/mybooking"); setShowPopup(false) }}
                                                >
                                                    My bookings
                                                </button>
                                                <button 
                                                    className='w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors'
                                                    onClick={() => { navigate("/mylisting"); setShowPopup(false) }}
                                                >
                                                    My listings
                                                </button>
                                                <button 
                                                    className='w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors'
                                                    onClick={() => { navigate("/listingpage1"); setShowPopup(false) }}
                                                >
                                                    Airbnb your home
                                                </button>
                                                <div className='border-t border-gray-100 my-2'></div>
                                                <button 
                                                    className='w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors'
                                                    onClick={handleLogOut}
                                                >
                                                    Log out
                                                </button>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories Bar */}
            <div className='border-b border-gray-200 bg-white'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='flex items-center gap-8 overflow-x-auto hide-scrollbar py-4'>
                        {categories.map(cat => (
                            <button 
                                key={cat.id}
                                className={`flex flex-col items-center gap-2 pb-2 min-w-fit border-b-2 transition-all ${
                                    activeCategory === cat.id 
                                        ? 'border-gray-800 text-gray-800' 
                                        : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
                                }`}
                                onClick={() => handleCategory(cat.id)}
                            >
                                <cat.icon className='w-6 h-6' />
                                <span className='text-xs font-medium whitespace-nowrap'>{cat.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile Search Bar */}
            <div className='lg:hidden px-4 py-3 border-b border-gray-200 bg-white'>
                <button 
                    className='w-full flex items-center gap-3 p-3 border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow'
                    onClick={() => navigate("/")}
                >
                    <FiSearch className='w-5 h-5 text-gray-700' />
                    <div className='text-left'>
                        <p className='text-sm font-medium text-gray-800'>Where to?</p>
                        <p className='text-xs text-gray-500'>Anywhere · Any week · Add guests</p>
                    </div>
                </button>
            </div>
        </header>
    )
}

export default Nav