import React, { useContext, useState } from 'react'
import { userDataContext } from '../Context/UserContext'
import { listingDataContext } from '../Context/ListingContext'
import { useNavigate } from 'react-router-dom'
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa"
import { IoChevronBack, IoChevronForward } from "react-icons/io5"
import { bookingDataContext } from '../Context/BookingContext'

function Card({ title, landMark, image1, image2, image3, rent, city, id, ratings, isBooked, host, unavailableForDates }) {
    const navigate = useNavigate()
    const { userData } = useContext(userDataContext)
    const { handleViewCard } = useContext(listingDataContext)
    const { cancelBooking } = useContext(bookingDataContext)
    const [currentImage, setCurrentImage] = useState(0)
    const [isLiked, setIsLiked] = useState(false)
    const [showCancelModal, setShowCancelModal] = useState(false)
    
    const images = [image1, image2, image3].filter(Boolean)

    const handleClick = () => {
        handleViewCard(id)
    }

    const nextImage = (e) => {
        e.stopPropagation()
        setCurrentImage((prev) => (prev + 1) % images.length)
    }

    const prevImage = (e) => {
        e.stopPropagation()
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
    }

    const toggleLike = (e) => {
        e.stopPropagation()
        setIsLiked(!isLiked)
    }

    const handleCancelClick = (e) => {
        e.stopPropagation()
        setShowCancelModal(true)
    }

    const confirmCancel = (e) => {
        e.stopPropagation()
        cancelBooking(id)
        setShowCancelModal(false)
    }

    // Handle card click - always navigate to view, allow booking check on ViewCard
    const onCardClick = () => {
        handleClick()
    }

    return (
        <div 
            className='w-full cursor-pointer group relative'
            onClick={onCardClick}
        >
            {/* Cancel Modal */}
            {showCancelModal && (
                <div 
                    className='absolute inset-0 bg-white/95 z-30 rounded-xl flex flex-col items-center justify-center p-6 animate-fadeIn'
                    onClick={(e) => e.stopPropagation()}
                >
                    <p className='text-lg font-semibold text-gray-800 mb-2'>Cancel Booking?</p>
                    <p className='text-sm text-gray-500 mb-6 text-center'>Are you sure you want to cancel this booking?</p>
                    <div className='flex gap-3'>
                        <button 
                            className='px-6 py-2.5 bg-gradient-to-r from-[#E61E4D] to-[#D70466] text-white font-medium rounded-lg hover:opacity-90 transition-all'
                            onClick={confirmCancel}
                        >
                            Yes, Cancel
                        </button>
                        <button 
                            className='px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors'
                            onClick={(e) => { e.stopPropagation(); setShowCancelModal(false) }}
                        >
                            No, Keep
                        </button>
                    </div>
                </div>
            )}

            {/* Image Container */}
            <div className='relative w-full aspect-square rounded-xl overflow-hidden mb-3'>
                {/* Images */}
                <div 
                    className='flex h-full transition-transform duration-300 ease-out'
                    style={{ transform: `translateX(-${currentImage * 100}%)` }}
                >
                    {images.map((img, index) => (
                        <img 
                            key={index}
                            src={img} 
                            alt={title}
                            className='w-full h-full object-cover flex-shrink-0'
                        />
                    ))}
                </div>

                {/* Booked Badge */}
                {isBooked && (
                    <div className='absolute top-3 left-3 bg-white px-3 py-1.5 rounded-full shadow-md z-10'>
                        <span className='text-xs font-semibold text-green-600 flex items-center gap-1'>
                            <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                            Booked
                        </span>
                    </div>
                )}

                {/* Guest Favourite Badge (show for high ratings) */}
                {!isBooked && ratings >= 4.8 && !unavailableForDates && (
                    <div className='absolute top-3 left-3 bg-white px-3 py-1.5 rounded-full shadow-md z-10'>
                        <span className='text-xs font-semibold text-gray-800'>Guest favourite</span>
                    </div>
                )}

                {/* Unavailable for Selected Dates Badge */}
                {unavailableForDates && !isBooked && (
                    <div className='absolute top-3 left-3 bg-red-500 px-3 py-1.5 rounded-full shadow-md z-10'>
                        <span className='text-xs font-semibold text-white'>Not available for selected dates</span>
                    </div>
                )}

                {/* Heart Button */}
                <button 
                    className='absolute top-3 right-3 z-10 p-1.5 transition-transform hover:scale-110'
                    onClick={toggleLike}
                >
                    {isLiked ? (
                        <FaHeart className='w-6 h-6 text-[#FF385C] drop-shadow-md' />
                    ) : (
                        <FaRegHeart className='w-6 h-6 text-white drop-shadow-md stroke-2' style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }} />
                    )}
                </button>

                {/* Cancel Booking Button (for host) */}
                {isBooked && host === userData?._id && (
                    <button 
                        className='absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md z-10 text-xs font-medium text-red-500 hover:bg-white transition-colors'
                        onClick={handleCancelClick}
                    >
                        Cancel Booking
                    </button>
                )}

                {/* Navigation Arrows */}
                {images.length > 1 && (
                    <>
                        <button 
                            className='absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:scale-105 z-10'
                            onClick={prevImage}
                        >
                            <IoChevronBack className='w-4 h-4 text-gray-700' />
                        </button>
                        <button 
                            className='absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:scale-105 z-10'
                            onClick={nextImage}
                        >
                            <IoChevronForward className='w-4 h-4 text-gray-700' />
                        </button>
                    </>
                )}

                {/* Dots Indicator */}
                {images.length > 1 && (
                    <div className='absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10'>
                        {images.map((_, index) => (
                            <span 
                                key={index}
                                className={`w-1.5 h-1.5 rounded-full transition-all ${
                                    index === currentImage 
                                        ? 'bg-white w-2' 
                                        : 'bg-white/60'
                                }`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className='space-y-1'>
                {/* Title and Rating Row */}
                <div className='flex justify-between items-start gap-2'>
                    <h3 className='font-semibold text-[15px] text-gray-800 truncate flex-1'>
                        {landMark}, {city}
                    </h3>
                    <div className='flex items-center gap-1 flex-shrink-0'>
                        <FaStar className='w-3.5 h-3.5 text-gray-800' />
                        <span className='text-sm text-gray-800'>{ratings || '4.5'}</span>
                    </div>
                </div>

                {/* Description */}
                <p className='text-sm text-gray-500 truncate'>{title}</p>

                {/* Dates (placeholder) */}
                <p className='text-sm text-gray-500'>Any week</p>

                {/* Price */}
                <p className='text-[15px] pt-1'>
                    <span className='font-semibold text-gray-800'>₹{rent?.toLocaleString()}</span>
                    <span className='text-gray-500'> night</span>
                </p>
            </div>
        </div>
    )
}

export default Card
