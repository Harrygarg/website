import React from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

function PrivacyPolicy() {
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
                    <h1 className='text-xl font-semibold'>Privacy Policy</h1>
                </div>
            </div>

            {/* Content */}
            <div className='max-w-4xl mx-auto px-4 py-12'>
                <p className='text-gray-500 mb-8'>Last updated: December 2024</p>

                <div className='prose prose-gray max-w-none'>
                    <h2 className='text-2xl font-semibold mb-4'>1. Information We Collect</h2>
                    <p className='text-gray-600 mb-6'>
                        We collect information you provide directly to us, such as when you create an account, 
                        make a booking, communicate with hosts or guests, or contact us for support. This information 
                        may include your name, email address, phone number, payment information, and any other 
                        information you choose to provide.
                    </p>

                    <h2 className='text-2xl font-semibold mb-4'>2. How We Use Your Information</h2>
                    <p className='text-gray-600 mb-6'>
                        We use the information we collect to provide, maintain, and improve our services, 
                        process transactions, send you related information, and communicate with you about 
                        products, services, and events offered by us and others.
                    </p>

                    <h2 className='text-2xl font-semibold mb-4'>3. Information Sharing</h2>
                    <p className='text-gray-600 mb-6'>
                        We may share information about you as follows: with hosts and guests to facilitate 
                        bookings, with vendors and service providers who need access to such information to 
                        carry out work on our behalf, and in response to a request for information if we believe 
                        disclosure is in accordance with applicable law.
                    </p>

                    <h2 className='text-2xl font-semibold mb-4'>4. Data Security</h2>
                    <p className='text-gray-600 mb-6'>
                        We take reasonable measures to help protect information about you from loss, theft, 
                        misuse, and unauthorized access, disclosure, alteration, and destruction. All payment 
                        information is encrypted using industry-standard protocols.
                    </p>

                    <h2 className='text-2xl font-semibold mb-4'>5. Your Rights</h2>
                    <p className='text-gray-600 mb-6'>
                        You may update, correct, or delete your account information at any time by logging 
                        into your account. You may also request access to the personal information we hold 
                        about you by contacting us.
                    </p>

                    <h2 className='text-2xl font-semibold mb-4'>6. Cookies</h2>
                    <p className='text-gray-600 mb-6'>
                        We use cookies and similar tracking technologies to collect information about your 
                        browsing activities and to distinguish you from other users of our platform.
                    </p>

                    <h2 className='text-2xl font-semibold mb-4'>7. Contact Us</h2>
                    <p className='text-gray-600 mb-6'>
                        If you have any questions about this Privacy Policy, please contact us at 
                        privacy@airbnbclone.com
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PrivacyPolicy
