import React from 'react'
import SearchBar from './SearchBar'

function HeroSection() {
    return (
        <section className='relative bg-gradient-to-b from-rose-50 to-white py-12 md:py-20'>
            {/* Background Pattern */}
            <div className='absolute inset-0 overflow-hidden'>
                <div className='absolute -top-40 -right-40 w-80 h-80 bg-rose-100 rounded-full opacity-50 blur-3xl'></div>
                <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full opacity-50 blur-3xl'></div>
            </div>

            <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                {/* Hero Content */}
                <div className='text-center mb-10'>
                    <h1 className='text-3xl md:text-5xl font-bold text-gray-800 mb-4'>
                        Find your next adventure
                    </h1>
                    <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                        Discover unique homes and experiences around the world
                    </p>
                </div>

                {/* Search Bar */}
                <div className='flex justify-center'>
                    <SearchBar />
                </div>

                {/* Quick Links */}
                <div className='flex justify-center gap-4 mt-8'>
                    <span className='px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm text-gray-600 shadow-sm'>
                        🏖️ Beaches
                    </span>
                    <span className='px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm text-gray-600 shadow-sm'>
                        🏔️ Mountains
                    </span>
                    <span className='px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm text-gray-600 shadow-sm'>
                        🏡 Countryside
                    </span>
                    <span className='px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm text-gray-600 shadow-sm'>
                        🌆 Cities
                    </span>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
