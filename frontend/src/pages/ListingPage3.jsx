import React, { useContext } from 'react'
import { IoArrowBack, IoStar, IoLocationOutline } from "react-icons/io5"
import { useNavigate } from 'react-router-dom'
import { listingDataContext } from '../Context/ListingContext'

function ListingPage3() {
    const navigate = useNavigate()
    const {
        title,
        description,
        frontEndImage1,
        frontEndImage2,
        frontEndImage3,
        rent,
        city,
        landmark,
        category,
        handleAddListing,
        adding
    } = useContext(listingDataContext)

    const categoryNames = {
        villa: 'Villa',
        farmHouse: 'Farm House',
        poolHouse: 'Pool House',
        rooms: 'Room',
        flat: 'Apartment',
        pg: 'PG/Hostel',
        cabin: 'Cabin',
        shops: 'Commercial Space'
    }

    return (
        <div className='min-h-screen bg-white'>
            {/* Header */}
            <div className='sticky top-0 bg-white border-b border-gray-200 z-40'>
                <div className='container-airbnb'>
                    <div className='flex items-center justify-between h-16'>
                        <button 
                            className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                            onClick={() => navigate("/listingpage2")}
                        >
                            <IoArrowBack className='w-5 h-5 text-gray-700' />
                        </button>
                        <div className='flex items-center gap-2'>
                            <span className='text-sm text-gray-500'>Step 3 of 3</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className='w-full h-1 bg-gray-200'>
                <div className='w-full h-full bg-gradient-to-r from-[#E61E4D] to-[#D70466]'></div>
            </div>

            {/* Main Content */}
            <div className='container-airbnb py-8 md:py-12'>
                <div className='max-w-4xl mx-auto'>
                    <h1 className='text-2xl md:text-3xl font-semibold text-gray-800 mb-2'>
                        Review your listing
                    </h1>
                    <p className='text-gray-500 mb-8'>
                        Here's what guests will see when they browse your listing.
                    </p>

                    {/* Preview Card */}
                    <div className='bg-gray-50 rounded-2xl p-6 md:p-8 mb-8'>
                        <h2 className='text-lg font-semibold text-gray-800 mb-4'>Listing Preview</h2>
                        
                        {/* Image Gallery */}
                        <div className='grid grid-cols-4 gap-2 rounded-xl overflow-hidden mb-6'>
                            <div className='col-span-2 row-span-2'>
                                <img 
                                    src={frontEndImage1} 
                                    alt="Main"
                                    className='w-full h-full object-cover aspect-square'
                                />
                            </div>
                            <div className='col-span-1'>
                                <img 
                                    src={frontEndImage2} 
                                    alt="Photo 2"
                                    className='w-full h-full object-cover aspect-square'
                                />
                            </div>
                            <div className='col-span-1'>
                                <img 
                                    src={frontEndImage3} 
                                    alt="Photo 3"
                                    className='w-full h-full object-cover aspect-square'
                                />
                            </div>
                        </div>

                        {/* Details */}
                        <div className='space-y-4'>
                            <div className='flex items-start justify-between gap-4'>
                                <div>
                                    <h3 className='text-xl font-semibold text-gray-800 mb-1'>
                                        {title || 'Your listing title'}
                                    </h3>
                                    <p className='flex items-center gap-1 text-gray-500 text-sm'>
                                        <IoLocationOutline className='w-4 h-4' />
                                        {landmark}, {city}
                                    </p>
                                </div>
                                <div className='flex items-center gap-1 text-sm'>
                                    <IoStar className='w-4 h-4 text-gray-800' />
                                    <span className='font-medium'>New</span>
                                </div>
                            </div>

                            <div className='flex items-center gap-2'>
                                <span className='px-3 py-1 bg-gray-200 rounded-full text-sm font-medium text-gray-700'>
                                    {categoryNames[category] || category}
                                </span>
                            </div>

                            <p className='text-gray-600 leading-relaxed'>
                                {description || 'Your listing description will appear here...'}
                            </p>

                            <div className='pt-4 border-t border-gray-200'>
                                <div className='flex items-baseline gap-1'>
                                    <span className='text-2xl font-semibold text-gray-800'>₹{parseInt(rent || 0).toLocaleString()}</span>
                                    <span className='text-gray-500'>night</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className='bg-white border border-gray-200 rounded-xl p-6 mb-8'>
                        <h3 className='font-semibold text-gray-800 mb-4'>Listing Summary</h3>
                        <div className='grid grid-cols-2 gap-4 text-sm'>
                            <div>
                                <span className='text-gray-500'>Property Type</span>
                                <p className='font-medium text-gray-800'>{categoryNames[category] || '-'}</p>
                            </div>
                            <div>
                                <span className='text-gray-500'>Location</span>
                                <p className='font-medium text-gray-800'>{city || '-'}</p>
                            </div>
                            <div>
                                <span className='text-gray-500'>Landmark</span>
                                <p className='font-medium text-gray-800'>{landmark || '-'}</p>
                            </div>
                            <div>
                                <span className='text-gray-500'>Price per night</span>
                                <p className='font-medium text-gray-800'>₹{parseInt(rent || 0).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className='flex justify-between items-center pt-6 border-t border-gray-200'>
                        <button 
                            className='px-6 py-3 text-gray-700 font-medium underline hover:text-gray-800 transition-colors'
                            onClick={() => navigate("/listingpage2")}
                        >
                            Back
                        </button>
                        <button 
                            className='px-8 py-3.5 bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] text-white font-semibold rounded-lg hover:opacity-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed'
                            onClick={handleAddListing}
                            disabled={adding}
                        >
                            {adding ? (
                                <span className='flex items-center gap-2'>
                                    <svg className='animate-spin w-5 h-5' viewBox="0 0 24 24">
                                        <circle className='opacity-25' cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className='opacity-75' fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Publishing...
                                </span>
                            ) : (
                                'Publish listing'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListingPage3
