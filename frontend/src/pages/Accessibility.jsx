import React from 'react'
import { IoArrowBack, IoAccessibility, IoEye, IoEar, IoHandLeft } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

function Accessibility() {
    const navigate = useNavigate()

    const features = [
        { icon: IoEye, title: 'Visual accessibility', items: ['Screen reader support', 'High contrast mode', 'Adjustable text sizes', 'Alt text for images'] },
        { icon: IoEar, title: 'Hearing accessibility', items: ['Visual alerts', 'Captions for videos', 'Text-based communication'] },
        { icon: IoHandLeft, title: 'Motor accessibility', items: ['Keyboard navigation', 'Large click targets', 'No time limits on forms'] },
    ]

    return (
        <div className='min-h-screen bg-white'>
            {/* Header */}
            <div className='bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-16'>
                <div className='max-w-4xl mx-auto px-4'>
                    <button 
                        onClick={() => navigate(-1)}
                        className='mb-6 p-2 hover:bg-white/20 rounded-full transition-colors'
                    >
                        <IoArrowBack className='w-6 h-6' />
                    </button>
                    <IoAccessibility className='w-16 h-16 mb-4' />
                    <h1 className='text-4xl font-bold mb-4'>Accessibility</h1>
                    <p className='text-xl opacity-90'>Making our platform accessible to everyone</p>
                </div>
            </div>

            {/* Content */}
            <div className='max-w-4xl mx-auto px-4 py-12'>
                <p className='text-lg text-gray-600 mb-8'>
                    We're committed to making our platform accessible to all users, including those with 
                    disabilities. We continuously work to improve the accessibility of our website and app.
                </p>

                {features.map((feature, i) => (
                    <div key={i} className='mb-8'>
                        <div className='flex items-center gap-3 mb-4'>
                            <feature.icon className='w-8 h-8 text-purple-500' />
                            <h2 className='text-2xl font-semibold'>{feature.title}</h2>
                        </div>
                        <ul className='space-y-2 ml-11'>
                            {feature.items.map((item, j) => (
                                <li key={j} className='text-gray-600 flex items-center gap-2'>
                                    <span className='w-1.5 h-1.5 bg-purple-500 rounded-full'></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                <div className='bg-purple-50 border border-purple-200 rounded-xl p-6 mt-8'>
                    <h3 className='font-semibold text-purple-800 mb-2'>Need assistance?</h3>
                    <p className='text-purple-700 mb-4'>
                        If you encounter any accessibility barriers or have suggestions for improvement, 
                        please contact our accessibility team.
                    </p>
                    <button className='px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors'>
                        Contact Accessibility Team
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Accessibility
