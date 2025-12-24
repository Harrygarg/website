import React from 'react'
import { IoRemove, IoAdd } from 'react-icons/io5'

function GuestCounter({ guests, setGuests }) {
    const updateGuests = (type, action) => {
        setGuests(prev => {
            const newValue = action === 'add' ? prev[type] + 1 : prev[type] - 1
            const min = 0
            const max = type === 'infants' || type === 'pets' ? 5 : 16
            if (newValue < min || newValue > max) return prev
            return { ...prev, [type]: newValue }
        })
    }

    const GuestRow = ({ type, title, subtitle }) => (
        <div className='flex items-center justify-between py-6 border-b border-gray-200 last:border-b-0'>
            <div>
                <p className='font-medium text-gray-800 text-base'>{title}</p>
                <p className='text-sm text-gray-500'>{subtitle}</p>
            </div>
            <div className='flex items-center gap-4'>
                <button 
                    className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all
                        ${guests[type] <= 0 
                            ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                            : 'border-gray-400 text-gray-600 hover:border-gray-800 hover:text-gray-800'
                        }`}
                    onClick={() => updateGuests(type, 'remove')}
                    disabled={guests[type] <= 0}
                >
                    <IoRemove className='w-4 h-4' />
                </button>
                <span className='w-6 text-center text-base'>{guests[type]}</span>
                <button 
                    className='w-8 h-8 rounded-full border border-gray-400 text-gray-600 flex items-center justify-center hover:border-gray-800 hover:text-gray-800 transition-all'
                    onClick={() => updateGuests(type, 'add')}
                >
                    <IoAdd className='w-4 h-4' />
                </button>
            </div>
        </div>
    )

    return (
        <div className='bg-white rounded-3xl shadow-2xl border border-gray-200 p-6' style={{ width: '400px' }}>
            <GuestRow type='adults' title='Adults' subtitle='Ages 13 or above' />
            <GuestRow type='children' title='Children' subtitle='Ages 2–12' />
            <GuestRow type='infants' title='Infants' subtitle='Under 2' />
            <div className='flex items-center justify-between py-6'>
                <div>
                    <p className='font-medium text-gray-800 text-base'>Pets</p>
                    <p className='text-sm text-[#222222] underline cursor-pointer'>Bringing a service animal?</p>
                </div>
                <div className='flex items-center gap-4'>
                    <button 
                        className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all
                            ${guests.pets <= 0 
                                ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                                : 'border-gray-400 text-gray-600 hover:border-gray-800 hover:text-gray-800'
                            }`}
                        onClick={() => updateGuests('pets', 'remove')}
                        disabled={guests.pets <= 0}
                    >
                        <IoRemove className='w-4 h-4' />
                    </button>
                    <span className='w-6 text-center text-base'>{guests.pets}</span>
                    <button 
                        className='w-8 h-8 rounded-full border border-gray-400 text-gray-600 flex items-center justify-center hover:border-gray-800 hover:text-gray-800 transition-all'
                        onClick={() => updateGuests('pets', 'add')}
                    >
                        <IoAdd className='w-4 h-4' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GuestCounter
