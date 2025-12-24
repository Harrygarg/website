import React, { useContext } from 'react'
import { IoArrowBack, IoCloudUploadOutline } from "react-icons/io5"
import { useNavigate } from 'react-router-dom'
import { listingDataContext } from '../Context/ListingContext'

function ListingPage1() {
    const navigate = useNavigate()
    const {
        title, setTitle,
        description, setDescription,
        frontEndImage1, setFrontEndImage1,
        frontEndImage2, setFrontEndImage2,
        frontEndImage3, setFrontEndImage3,
        setBackEndImage1,
        setBackEndImage2,
        setBackEndImage3,
        rent, setRent,
        city, setCity,
        landmark, setLandmark,
    } = useContext(listingDataContext)

    const handleImage1 = (e) => {
        const file = e.target.files[0]
        setBackEndImage1(file)
        setFrontEndImage1(URL.createObjectURL(file))
    }
    const handleImage2 = (e) => {
        const file = e.target.files[0]
        setBackEndImage2(file)
        setFrontEndImage2(URL.createObjectURL(file))
    }
    const handleImage3 = (e) => {
        const file = e.target.files[0]
        setBackEndImage3(file)
        setFrontEndImage3(URL.createObjectURL(file))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate("/listingpage2")
    }

    return (
        <div className='min-h-screen bg-white'>
            {/* Header */}
            <div className='sticky top-0 bg-white border-b border-gray-200 z-40'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='flex items-center justify-between h-16'>
                        <button 
                            className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                            onClick={() => navigate("/")}
                        >
                            <IoArrowBack className='w-5 h-5 text-gray-700' />
                        </button>
                        <div className='flex items-center gap-2'>
                            <span className='text-sm text-gray-500'>Step 1 of 3</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className='w-full h-1 bg-gray-200'>
                <div className='w-1/3 h-full bg-gradient-to-r from-[#E61E4D] to-[#D70466]'></div>
            </div>

            {/* Main Content */}
            <div className='container-airbnb py-8 md:py-12'>
                <div className='max-w-2xl mx-auto'>
                    <h1 className='text-2xl md:text-3xl font-semibold text-gray-800 mb-2'>
                        Tell us about your place
                    </h1>
                    <p className='text-gray-500 mb-8'>
                        Share some basic info, like where it is and what guests can expect.
                    </p>

                    <form onSubmit={handleSubmit} className='space-y-6'>
                        {/* Title */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Title
                            </label>
                            <input 
                                type="text" 
                                placeholder="e.g., Cozy 2BHK apartment with city view"
                                className='w-full px-4 py-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-gray-800 transition-colors'
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Description
                            </label>
                            <textarea 
                                placeholder="Describe your place, amenities, and what makes it special..."
                                className='w-full px-4 py-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-gray-800 transition-colors min-h-[120px] resize-none'
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        {/* Images */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Photos
                            </label>
                            <p className='text-sm text-gray-500 mb-4'>
                                Add at least 3 photos of your place
                            </p>
                            <div className='grid grid-cols-3 gap-4'>
                                {/* Image 1 */}
                                <label className='relative aspect-square border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-gray-400 transition-colors overflow-hidden bg-gray-50'>
                                    {frontEndImage1 ? (
                                        <img src={frontEndImage1} alt="Preview 1" className='w-full h-full object-cover' />
                                    ) : (
                                        <div className='flex flex-col items-center justify-center h-full'>
                                            <IoCloudUploadOutline className='w-8 h-8 text-gray-400 mb-2' />
                                            <span className='text-xs text-gray-500'>Main photo</span>
                                        </div>
                                    )}
                                    <input type="file" className='hidden' required onChange={handleImage1} accept="image/*" />
                                </label>

                                {/* Image 2 */}
                                <label className='relative aspect-square border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-gray-400 transition-colors overflow-hidden bg-gray-50'>
                                    {frontEndImage2 ? (
                                        <img src={frontEndImage2} alt="Preview 2" className='w-full h-full object-cover' />
                                    ) : (
                                        <div className='flex flex-col items-center justify-center h-full'>
                                            <IoCloudUploadOutline className='w-8 h-8 text-gray-400 mb-2' />
                                            <span className='text-xs text-gray-500'>Photo 2</span>
                                        </div>
                                    )}
                                    <input type="file" className='hidden' required onChange={handleImage2} accept="image/*" />
                                </label>

                                {/* Image 3 */}
                                <label className='relative aspect-square border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-gray-400 transition-colors overflow-hidden bg-gray-50'>
                                    {frontEndImage3 ? (
                                        <img src={frontEndImage3} alt="Preview 3" className='w-full h-full object-cover' />
                                    ) : (
                                        <div className='flex flex-col items-center justify-center h-full'>
                                            <IoCloudUploadOutline className='w-8 h-8 text-gray-400 mb-2' />
                                            <span className='text-xs text-gray-500'>Photo 3</span>
                                        </div>
                                    )}
                                    <input type="file" className='hidden' required onChange={handleImage3} accept="image/*" />
                                </label>
                            </div>
                        </div>

                        {/* Location */}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>
                                    City
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="e.g., Mumbai"
                                    className='w-full px-4 py-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-gray-800 transition-colors'
                                    required
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>
                                    Landmark
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="e.g., Near Marine Drive"
                                    className='w-full px-4 py-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-gray-800 transition-colors'
                                    required
                                    value={landmark}
                                    onChange={(e) => setLandmark(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Rent */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Price per night
                            </label>
                            <div className='relative'>
                                <span className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg'>₹</span>
                                <input 
                                    type="number" 
                                    placeholder="0"
                                    className='w-full pl-10 pr-4 py-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:border-gray-800 transition-colors'
                                    required
                                    value={rent}
                                    onChange={(e) => setRent(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className='pt-6'>
                            <button 
                                type="submit"
                                className='w-full py-4 bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] text-white text-lg font-semibold rounded-lg hover:opacity-95 transition-all'
                            >
                                Next
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ListingPage1