import React from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

function Terms() {
    const navigate = useNavigate()

    return (
        <div className='min-h-screen bg-white'>
            {/* Header */}
            <div className='border-b border-gray-200 sticky top-0 bg-white z-10'>
                <div className='max-w-4xl mx-auto px-4 py-4 flex items-center gap-4'>
                    <button 
                        onClick={() => navigate(-1)}
                        className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                    >
                        <IoArrowBack className='w-5 h-5' />
                    </button>
                    <h1 className='text-xl font-semibold'>Terms of Service</h1>
                </div>
            </div>

            {/* Content */}
            <div className='max-w-4xl mx-auto px-4 py-12'>
                <p className='text-gray-500 mb-8'>Last updated: December 2024</p>

                <div className='prose prose-gray max-w-none'>
                    <h2 className='text-2xl font-semibold mb-4'>1. Acceptance of Terms</h2>
                    <p className='text-gray-600 mb-6'>
                        By accessing and using this platform, you accept and agree to be bound by the terms 
                        and provisions of this agreement. If you do not agree to abide by these terms, 
                        please do not use this service.
                    </p>

                    <h2 className='text-2xl font-semibold mb-4'>2. Description of Service</h2>
                    <p className='text-gray-600 mb-6'>
                        Our platform provides a marketplace for hosts to list accommodations and for guests 
                        to book them. We facilitate the connection between hosts and guests but are not a 
                        party to any rental agreement between them.
                    </p>

                    <h2 className='text-2xl font-semibold mb-4'>3. User Accounts</h2>
                    <p className='text-gray-600 mb-6'>
                        To use certain features of the platform, you must register for an account. You agree 
                        to provide accurate, current, and complete information during registration and to update 
                        such information to keep it accurate, current, and complete.
                    </p>

                    <h2 className='text-2xl font-semibold mb-4'>4. Booking and Cancellation</h2>
                    <p className='text-gray-600 mb-6'>
                        When you book a property, you agree to pay all charges for your booking, including 
                        the listing price, service fees, and applicable taxes. Cancellation policies vary by 
                        listing and are displayed before you complete your booking.
                    </p>

                    <h2 className='text-2xl font-semibold mb-4'>5. Host Responsibilities</h2>
                    <p className='text-gray-600 mb-6'>
                        Hosts are responsible for ensuring their listings are accurate and that their properties 
                        meet all applicable legal requirements. Hosts must honor all confirmed bookings and 
                        provide guests with safe, clean accommodations as described in their listings.
                    </p>

                    <h2 className='text-2xl font-semibold mb-4'>6. Guest Responsibilities</h2>
                    <p className='text-gray-600 mb-6'>
                        Guests agree to treat the host's property with respect, follow all house rules, and 
                        communicate openly with hosts about any issues during their stay. Guests may be held 
                        responsible for any damages they cause.
                    </p>

                    <h2 className='text-2xl font-semibold mb-4'>7. Limitation of Liability</h2>
                    <p className='text-gray-600 mb-6'>
                        We are not liable for any indirect, incidental, special, consequential, or punitive damages, 
                        or any loss of profits or revenues, whether incurred directly or indirectly, or any loss 
                        of data, use, goodwill, or other intangible losses.
                    </p>

                    <h2 className='text-2xl font-semibold mb-4'>8. Contact</h2>
                    <p className='text-gray-600 mb-6'>
                        If you have any questions about these Terms, please contact us at terms@airbnbclone.com
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Terms
