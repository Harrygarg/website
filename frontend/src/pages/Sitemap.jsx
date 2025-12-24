import React from 'react'
import { IoArrowBack, IoHome, IoCalendar, IoHeart, IoPerson, IoSettings, IoHelpCircle, IoDocumentText } from 'react-icons/io5'
import { useNavigate, Link } from 'react-router-dom'

function Sitemap() {
    const navigate = useNavigate()

    const sections = [
        {
            title: 'Explore',
            links: [
                { name: 'Home', path: '/', icon: IoHome },
                { name: 'Search Listings', path: '/', icon: IoHome },
            ]
        },
        {
            title: 'Your Account',
            links: [
                { name: 'My Bookings', path: '/mybooking', icon: IoCalendar },
                { name: 'My Listings', path: '/mylisting', icon: IoHome },
                { name: 'Login', path: '/login', icon: IoPerson },
                { name: 'Sign Up', path: '/signup', icon: IoPerson },
            ]
        },
        {
            title: 'Hosting',
            links: [
                { name: 'List Your Home', path: '/listingpage1', icon: IoHome },
                { name: 'Host Resources', path: '/help', icon: IoHelpCircle },
            ]
        },
        {
            title: 'Support',
            links: [
                { name: 'Help Centre', path: '/help', icon: IoHelpCircle },
                { name: 'Safety Information', path: '/safety', icon: IoHelpCircle },
                { name: 'Accessibility', path: '/accessibility', icon: IoHelpCircle },
                { name: 'Cancellation Options', path: '/cancellation', icon: IoHelpCircle },
            ]
        },
        {
            title: 'Legal',
            links: [
                { name: 'Privacy Policy', path: '/privacy', icon: IoDocumentText },
                { name: 'Terms of Service', path: '/terms', icon: IoDocumentText },
            ]
        },
    ]

    return (
        <div className='min-h-screen bg-white'>
            {/* Header */}
            <div className='border-b border-gray-200 sticky top-0 bg-white z-10'>
                <div className='max-w-6xl mx-auto px-4 py-4 flex items-center gap-4'>
                    <button 
                        onClick={() => navigate(-1)}
                        className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                    >
                        <IoArrowBack className='w-5 h-5' />
                    </button>
                    <h1 className='text-xl font-semibold'>Sitemap</h1>
                </div>
            </div>

            {/* Content */}
            <div className='max-w-6xl mx-auto px-4 py-12'>
                <p className='text-lg text-gray-600 mb-8'>
                    Find your way around our platform with this complete sitemap.
                </p>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {sections.map((section, i) => (
                        <div key={i}>
                            <h2 className='text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200'>
                                {section.title}
                            </h2>
                            <ul className='space-y-3'>
                                {section.links.map((link, j) => (
                                    <li key={j}>
                                        <Link 
                                            to={link.path}
                                            className='flex items-center gap-2 text-gray-600 hover:text-[#FF385C] transition-colors'
                                        >
                                            <link.icon className='w-4 h-4' />
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Sitemap
