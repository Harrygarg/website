import React, { useContext } from 'react'
import { IoArrowBack } from "react-icons/io5"
import { useNavigate } from 'react-router-dom'
import { MdOutlineVilla, MdOutlinePool, MdOutlineBedroomParent, MdOutlineApartment } from "react-icons/md"
import { GiFarmTractor, GiWoodCabin, GiShop } from "react-icons/gi"
import { IoBedOutline } from "react-icons/io5"
import { listingDataContext } from '../Context/ListingContext'

function ListingPage2() {
    const navigate = useNavigate()
    const { category, setCategory } = useContext(listingDataContext)

    const categories = [
        { id: 'villa', name: 'Villa', icon: MdOutlineVilla, description: 'A self-contained unit with luxury amenities' },
        { id: 'farmHouse', name: 'Farm House', icon: GiFarmTractor, description: 'Rural property with agricultural surroundings' },
        { id: 'poolHouse', name: 'Pool House', icon: MdOutlinePool, description: 'Property featuring a private pool' },
        { id: 'rooms', name: 'Rooms', icon: MdOutlineBedroomParent, description: 'Private room in a larger property' },
        { id: 'flat', name: 'Apartment', icon: MdOutlineApartment, description: 'Unit in a multi-story building' },
        { id: 'pg', name: 'PG/Hostel', icon: IoBedOutline, description: 'Shared accommodation with basic amenities' },
        { id: 'cabin', name: 'Cabin', icon: GiWoodCabin, description: 'Cozy retreat in nature' },
        { id: 'shops', name: 'Commercial', icon: GiShop, description: 'Space for business purposes' },
    ]

    return (
        <div className='min-h-screen bg-white'>
            {/* Header */}
            <div className='sticky top-0 bg-white border-b border-gray-200 z-40'>
                <div className='container-airbnb'>
                    <div className='flex items-center justify-between h-16'>
                        <button 
                            className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                            onClick={() => navigate("/listingpage1")}
                        >
                            <IoArrowBack className='w-5 h-5 text-gray-700' />
                        </button>
                        <div className='flex items-center gap-2'>
                            <span className='text-sm text-gray-500'>Step 2 of 3</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className='w-full h-1 bg-gray-200'>
                <div className='w-2/3 h-full bg-gradient-to-r from-[#E61E4D] to-[#D70466]'></div>
            </div>

            {/* Main Content */}
            <div className='container-airbnb py-8 md:py-12'>
                <div className='max-w-3xl mx-auto'>
                    <h1 className='text-2xl md:text-3xl font-semibold text-gray-800 mb-2'>
                        Which of these best describes your place?
                    </h1>
                    <p className='text-gray-500 mb-8'>
                        Pick a property type that best matches what you're offering.
                    </p>

                    {/* Category Grid */}
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                className={`p-6 border-2 rounded-xl text-left transition-all hover:border-gray-400 ${
                                    category === cat.id 
                                        ? 'border-gray-800 bg-gray-50' 
                                        : 'border-gray-200'
                                }`}
                                onClick={() => setCategory(cat.id)}
                            >
                                <cat.icon className='w-8 h-8 text-gray-700 mb-3' />
                                <h3 className='font-medium text-gray-800 mb-1'>{cat.name}</h3>
                                <p className='text-xs text-gray-500 line-clamp-2'>{cat.description}</p>
                            </button>
                        ))}
                    </div>

                    {/* Navigation */}
                    <div className='flex justify-between items-center pt-6 border-t border-gray-200'>
                        <button 
                            className='px-6 py-3 text-gray-700 font-medium underline hover:text-gray-800 transition-colors'
                            onClick={() => navigate("/listingpage1")}
                        >
                            Back
                        </button>
                        <button 
                            className={`px-8 py-3.5 bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] text-white font-semibold rounded-lg transition-all ${
                                category ? 'hover:opacity-95' : 'opacity-50 cursor-not-allowed'
                            }`}
                            onClick={() => navigate("/listingpage3")}
                            disabled={!category}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListingPage2
