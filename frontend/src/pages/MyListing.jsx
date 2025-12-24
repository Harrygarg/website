import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoArrowBack, IoHomeOutline, IoAdd } from "react-icons/io5"
import { userDataContext } from '../Context/UserContext'
import Card from '../Component/Card'
import Footer from '../Component/Footer'

function MyListing() {
    const navigate = useNavigate()
    const { userData } = useContext(userDataContext)

    return (
        <div className='min-h-screen bg-gray-50'>
            {/* Header */}
            <div className='sticky top-0 bg-white border-b border-gray-200 z-40'>
                <div className='container-airbnb'>
                    <div className='flex items-center justify-between h-16'>
                        <div className='flex items-center gap-4'>
                            <button 
                                className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                                onClick={() => navigate("/")}
                            >
                                <IoArrowBack className='w-5 h-5 text-gray-700' />
                            </button>
                            <h1 className='text-lg font-semibold text-gray-800'>My Listings</h1>
                        </div>
                        <button 
                            className='flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#E61E4D] to-[#D70466] text-white font-medium rounded-lg hover:opacity-95 transition-all'
                            onClick={() => navigate("/listingpage1")}
                        >
                            <IoAdd className='w-5 h-5' />
                            <span className='hidden sm:block'>Add listing</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className='container-airbnb py-8'>
                <div className='mb-8'>
                    <h2 className='text-2xl md:text-3xl font-semibold text-gray-800 mb-2'>Your listings</h2>
                    <p className='text-gray-500'>Manage your properties and track their performance</p>
                </div>

                {userData?.listing?.length > 0 ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                        {userData.listing.map((list) => (
                            <Card 
                                key={list._id}
                                title={list.title} 
                                landMark={list.landMark} 
                                city={list.city} 
                                image1={list.image1} 
                                image2={list.image2} 
                                image3={list.image3} 
                                rent={list.rent} 
                                id={list._id} 
                                isBooked={list.isBooked} 
                                ratings={list.ratings} 
                                host={list.host}
                            />
                        ))}
                    </div>
                ) : (
                    <div className='flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-gray-200'>
                        <div className='w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
                            <IoHomeOutline className='w-10 h-10 text-gray-400' />
                        </div>
                        <h3 className='text-xl font-semibold text-gray-800 mb-2'>No listings yet</h3>
                        <p className='text-gray-500 text-center max-w-md mb-6'>
                            Start earning by sharing your space with travelers from around the world
                        </p>
                        <button 
                            className='px-6 py-3 bg-gradient-to-r from-[#E61E4D] to-[#D70466] text-white font-medium rounded-lg hover:opacity-95 transition-all'
                            onClick={() => navigate("/listingpage1")}
                        >
                            Create your first listing
                        </button>
                    </div>
                )}
            </div>

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default MyListing
