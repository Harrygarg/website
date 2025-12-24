import React from 'react'
import { IoArrowBack, IoShield, IoCall, IoWarning, IoCheckmarkCircle, IoLockClosed } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

function SafetyInfo() {
    const navigate = useNavigate()

    const safetyTips = [
        { icon: IoCheckmarkCircle, title: 'Verify listings', text: 'Check reviews, photos, and host profiles before booking' },
        { icon: IoLockClosed, title: 'Keep payments on platform', text: 'Never send money outside of the official platform' },
        { icon: IoCall, title: 'Communicate through the app', text: 'Use our messaging system for all communications' },
        { icon: IoWarning, title: 'Trust your instincts', text: "If something feels off, don't proceed with the booking" },
    ]

    return (
        <div className='min-h-screen bg-white'>
            {/* Header */}
            <div className='bg-gradient-to-r from-green-500 to-teal-500 text-white py-16'>
                <div className='max-w-4xl mx-auto px-4'>
                    <button 
                        onClick={() => navigate(-1)}
                        className='mb-6 p-2 hover:bg-white/20 rounded-full transition-colors'
                    >
                        <IoArrowBack className='w-6 h-6' />
                    </button>
                    <IoShield className='w-16 h-16 mb-4' />
                    <h1 className='text-4xl font-bold mb-4'>Safety Information</h1>
                    <p className='text-xl opacity-90'>Your safety is our priority</p>
                </div>
            </div>

            {/* Content */}
            <div className='max-w-4xl mx-auto px-4 py-12'>
                <h2 className='text-2xl font-semibold mb-6'>Safety Tips</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-12'>
                    {safetyTips.map((tip, i) => (
                        <div key={i} className='p-6 border border-gray-200 rounded-xl'>
                            <tip.icon className='w-8 h-8 text-green-500 mb-4' />
                            <h3 className='font-semibold text-gray-800 mb-2'>{tip.title}</h3>
                            <p className='text-gray-600'>{tip.text}</p>
                        </div>
                    ))}
                </div>

                <h2 className='text-2xl font-semibold mb-6'>Emergency Resources</h2>
                <div className='bg-red-50 border border-red-200 rounded-xl p-6 mb-8'>
                    <h3 className='font-semibold text-red-800 mb-2'>In case of emergency</h3>
                    <p className='text-red-700 mb-4'>If you're in immediate danger, contact local emergency services first.</p>
                    <p className='text-red-700'>Emergency: <strong>112</strong> (India)</p>
                </div>

                <h2 className='text-2xl font-semibold mb-6'>COVID-19 Safety</h2>
                <p className='text-gray-600 mb-4'>
                    We encourage all hosts to follow enhanced cleaning protocols and all guests to practice 
                    good hygiene during their stays. Check local guidelines for travel restrictions.
                </p>
            </div>
        </div>
    )
}

export default SafetyInfo
