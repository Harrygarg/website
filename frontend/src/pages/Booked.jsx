import React, { useContext, useState } from 'react'
import { IoCheckmarkCircle, IoHomeOutline } from "react-icons/io5"
import { bookingDataContext } from '../Context/BookingContext'
import { useNavigate } from 'react-router-dom'
import Star from '../Component/Star'
import { userDataContext } from '../Context/UserContext'
import { authDataContext } from '../Context/AuthContext'
import { listingDataContext } from '../Context/ListingContext'
import axios from 'axios'

function Booked() {
    const { bookingData } = useContext(bookingDataContext)
    const [star, setStar] = useState(0)
    const [submitting, setSubmitting] = useState(false)
    const { serverUrl } = useContext(authDataContext)
    const { getCurrentUser } = useContext(userDataContext)
    const { getListing, cardDetails } = useContext(listingDataContext)
    const navigate = useNavigate()

    const handleRating = async (id) => {
        setSubmitting(true)
        try {
            await axios.post(serverUrl + `/api/listing/ratings/${id}`, {
                ratings: star
            }, { withCredentials: true })
            await getListing()
            await getCurrentUser()
            navigate("/")
        } catch (error) {
            console.log(error)
            setSubmitting(false)
        }
    }

    const handleStar = (value) => {
        setStar(value)
    }

    return (
        <div className='min-h-screen bg-gray-50 flex flex-col'>
            {/* Header */}
            <div className='bg-white border-b border-gray-200'>
                <div className='container-airbnb'>
                    <div className='flex items-center justify-between h-16'>
                        <span className='text-lg font-semibold text-gray-800'>Booking Confirmed</span>
                        <button 
                            className='flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors'
                            onClick={() => navigate("/")}
                        >
                            <IoHomeOutline className='w-5 h-5' />
                            <span className='hidden sm:block'>Back to Home</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className='flex-1 flex items-center justify-center p-6'>
                <div className='w-full max-w-lg space-y-6'>
                    {/* Success Card */}
                    <div className='bg-white rounded-2xl shadow-lg p-8 text-center animate-fadeIn'>
                        <div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                            <IoCheckmarkCircle className='w-12 h-12 text-green-500' />
                        </div>
                        
                        <h1 className='text-2xl font-semibold text-gray-800 mb-2'>
                            Booking Confirmed!
                        </h1>
                        <p className='text-gray-500 mb-8'>
                            Your reservation has been successfully made.
                        </p>

                        <div className='bg-gray-50 rounded-xl p-6 text-left space-y-4'>
                            <div className='flex justify-between items-center pb-3 border-b border-gray-200'>
                                <span className='text-gray-500'>Booking ID</span>
                                <span className='font-medium text-gray-800 text-sm'>{bookingData?._id?.slice(-8).toUpperCase() || 'N/A'}</span>
                            </div>
                            <div className='flex justify-between items-center pb-3 border-b border-gray-200'>
                                <span className='text-gray-500'>Host Email</span>
                                <span className='font-medium text-gray-800 text-sm truncate max-w-[200px]'>{bookingData?.host?.email || 'N/A'}</span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <span className='text-gray-500'>Total Amount</span>
                                <span className='font-semibold text-gray-800 text-lg'>₹{bookingData?.totalRent?.toLocaleString() || 0}</span>
                            </div>
                        </div>
                    </div>

                    {/* Rating Card */}
                    <div className='bg-white rounded-2xl shadow-lg p-8 text-center animate-slideUp'>
                        <h2 className='text-lg font-semibold text-gray-800 mb-2'>
                            Rate your experience
                        </h2>
                        <p className='text-gray-500 text-sm mb-6'>
                            Your feedback helps hosts provide better stays
                        </p>

                        <div className='flex justify-center mb-4'>
                            <Star onRate={handleStar} />
                        </div>
                        
                        <p className='text-sm text-gray-500 mb-6'>
                            {star > 0 ? `${star} out of 5 stars` : 'Tap to rate'}
                        </p>

                        <button 
                            className={`w-full py-3.5 bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] text-white font-semibold rounded-lg transition-all ${
                                star > 0 ? 'hover:opacity-95' : 'opacity-50 cursor-not-allowed'
                            }`}
                            onClick={() => handleRating(cardDetails?._id)}
                            disabled={star === 0 || submitting}
                        >
                            {submitting ? 'Submitting...' : 'Submit Rating'}
                        </button>

                        <button 
                            className='w-full mt-3 py-3 text-gray-600 font-medium hover:text-gray-800 transition-colors'
                            onClick={() => navigate("/")}
                        >
                            Skip for now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Booked
