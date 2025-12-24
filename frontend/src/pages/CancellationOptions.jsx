import React from 'react'
import { IoArrowBack, IoClose, IoCheckmark, IoTime, IoWallet } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

function CancellationOptions() {
    const navigate = useNavigate()

    const policies = [
        { 
            name: 'Flexible', 
            refund: '100%', 
            deadline: 'Up to 24 hours before check-in',
            color: 'green',
            details: 'Full refund if cancelled at least 24 hours before check-in. After that, 50% refund.'
        },
        { 
            name: 'Moderate', 
            refund: '100%', 
            deadline: 'Up to 5 days before check-in',
            color: 'yellow',
            details: 'Full refund if cancelled at least 5 days before check-in. After that, 50% refund.'
        },
        { 
            name: 'Strict', 
            refund: '50%', 
            deadline: 'Up to 1 week before check-in',
            color: 'orange',
            details: '50% refund if cancelled at least 1 week before check-in. No refund after that.'
        },
        { 
            name: 'Non-refundable', 
            refund: '0%', 
            deadline: 'No refund available',
            color: 'red',
            details: 'No refund available for any cancellation. Often offered at a discounted rate.'
        },
    ]

    const colorClasses = {
        green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', badge: 'bg-green-500' },
        yellow: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', badge: 'bg-yellow-500' },
        orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', badge: 'bg-orange-500' },
        red: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', badge: 'bg-red-500' },
    }

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
                    <h1 className='text-xl font-semibold'>Cancellation Options</h1>
                </div>
            </div>

            {/* Content */}
            <div className='max-w-4xl mx-auto px-4 py-12'>
                <p className='text-lg text-gray-600 mb-8'>
                    Each listing has its own cancellation policy. Check the policy before booking to 
                    understand what refund you may be entitled to if you need to cancel.
                </p>

                <h2 className='text-2xl font-semibold mb-6'>Cancellation Policies</h2>
                <div className='space-y-4'>
                    {policies.map((policy, i) => {
                        const colors = colorClasses[policy.color]
                        return (
                            <div key={i} className={`p-6 rounded-xl border ${colors.border} ${colors.bg}`}>
                                <div className='flex items-center justify-between mb-4'>
                                    <div className='flex items-center gap-3'>
                                        <span className={`w-3 h-3 rounded-full ${colors.badge}`}></span>
                                        <h3 className='font-semibold text-gray-800 text-lg'>{policy.name}</h3>
                                    </div>
                                    <span className={`font-bold ${colors.text}`}>{policy.refund} refund</span>
                                </div>
                                <p className='text-gray-600 mb-2'><strong>Deadline:</strong> {policy.deadline}</p>
                                <p className='text-gray-600'>{policy.details}</p>
                            </div>
                        )
                    })}
                </div>

                <div className='mt-12 p-6 bg-gray-50 rounded-xl'>
                    <h3 className='font-semibold text-gray-800 mb-4'>How to cancel a booking</h3>
                    <ol className='space-y-3 text-gray-600'>
                        <li className='flex gap-3'><span className='font-semibold'>1.</span> Go to your bookings page</li>
                        <li className='flex gap-3'><span className='font-semibold'>2.</span> Select the booking you want to cancel</li>
                        <li className='flex gap-3'><span className='font-semibold'>3.</span> Click "Cancel booking"</li>
                        <li className='flex gap-3'><span className='font-semibold'>4.</span> Review your refund amount and confirm</li>
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default CancellationOptions
