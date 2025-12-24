import React from 'react'
import { IoArrowBack, IoHelpCircle, IoSearch, IoHome, IoCalendar, IoCard, IoShield, IoPersonCircle } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

function HelpCentre() {
    const navigate = useNavigate()

    const helpTopics = [
        { icon: IoHome, title: 'Getting started', description: 'Learn the basics of booking and hosting on Airbnb' },
        { icon: IoCalendar, title: 'Your reservations', description: 'Manage your bookings, cancellations, and refunds' },
        { icon: IoCard, title: 'Payments & payouts', description: 'Information about payments, refunds, and pricing' },
        { icon: IoShield, title: 'Safety & security', description: 'Stay safe and secure while using Airbnb' },
        { icon: IoPersonCircle, title: 'Your account', description: 'Manage your profile and account settings' },
    ]

    const popularArticles = [
        'How do I cancel my reservation?',
        'How do I change my reservation?',
        'What is the cancellation policy?',
        'How do I contact my Host?',
        'How do I get a refund?',
        'What if my Host cancels?',
    ]

    return (
        <div className='min-h-screen bg-white'>
            {/* Header */}
            <div className='bg-gradient-to-r from-[#FF385C] to-[#E61E4D] text-white py-16'>
                <div className='max-w-4xl mx-auto px-4'>
                    <button 
                        onClick={() => navigate(-1)}
                        className='mb-6 p-2 hover:bg-white/20 rounded-full transition-colors'
                    >
                        <IoArrowBack className='w-6 h-6' />
                    </button>
                    <h1 className='text-4xl font-bold mb-4'>Hi, how can we help?</h1>
                    <div className='relative max-w-xl'>
                        <IoSearch className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
                        <input 
                            type="text"
                            placeholder='Search for help'
                            className='w-full pl-12 pr-4 py-4 rounded-full text-gray-800 outline-none'
                        />
                    </div>
                </div>
            </div>

            {/* Help Topics */}
            <div className='max-w-4xl mx-auto px-4 py-12'>
                <h2 className='text-2xl font-semibold mb-6'>Browse help topics</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {helpTopics.map((topic, i) => (
                        <div key={i} className='p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow cursor-pointer'>
                            <topic.icon className='w-8 h-8 text-[#FF385C] mb-4' />
                            <h3 className='font-semibold text-gray-800 mb-2'>{topic.title}</h3>
                            <p className='text-sm text-gray-500'>{topic.description}</p>
                        </div>
                    ))}
                </div>

                {/* Popular Articles */}
                <h2 className='text-2xl font-semibold mt-12 mb-6'>Popular articles</h2>
                <div className='space-y-3'>
                    {popularArticles.map((article, i) => (
                        <button key={i} className='w-full text-left p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors'>
                            <span className='text-gray-800'>{article}</span>
                        </button>
                    ))}
                </div>

                {/* Contact */}
                <div className='mt-12 p-8 bg-gray-50 rounded-2xl text-center'>
                    <IoHelpCircle className='w-12 h-12 text-[#FF385C] mx-auto mb-4' />
                    <h3 className='text-xl font-semibold mb-2'>Need to get in touch?</h3>
                    <p className='text-gray-600 mb-4'>We'll start with some questions and get you to the right place.</p>
                    <button className='px-6 py-3 bg-[#FF385C] text-white rounded-lg font-medium hover:bg-[#E61E4D] transition-colors'>
                        Contact us
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HelpCentre
