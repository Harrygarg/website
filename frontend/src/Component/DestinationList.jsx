import React from 'react'
import { MdNearMe, MdOutlineLocationOn } from 'react-icons/md'

function DestinationList({ onSelect, searchInput }) {
    const destinations = [
        { name: 'Nearby', subtitle: "Find what's around you", icon: MdNearMe, color: 'text-cyan-500', bg: 'bg-cyan-50' },
        { name: 'New Delhi, Delhi', subtitle: 'For sights like India Gate', icon: MdOutlineLocationOn, color: 'text-rose-500', bg: 'bg-rose-50' },
        { name: 'Noida, Uttar Pradesh', subtitle: 'Near you', icon: MdOutlineLocationOn, color: 'text-amber-500', bg: 'bg-amber-50' },
        { name: 'Jaipur, Rajasthan', subtitle: 'For its stunning architecture', icon: MdOutlineLocationOn, color: 'text-pink-500', bg: 'bg-pink-50' },
        { name: 'Gurgaon District, Haryana', subtitle: 'Popular with travellers near you', icon: MdOutlineLocationOn, color: 'text-purple-500', bg: 'bg-purple-50' },
        { name: 'Dehradun, Uttarakhand', subtitle: 'For nature lovers', icon: MdOutlineLocationOn, color: 'text-green-500', bg: 'bg-green-50' },
        { name: 'North Goa, Goa', subtitle: 'Popular beach destination', icon: MdOutlineLocationOn, color: 'text-blue-500', bg: 'bg-blue-50' },
        { name: 'Mumbai, Maharashtra', subtitle: 'For city life', icon: MdOutlineLocationOn, color: 'text-orange-500', bg: 'bg-orange-50' },
        { name: 'Bangalore, Karnataka', subtitle: 'For tech hubs', icon: MdOutlineLocationOn, color: 'text-indigo-500', bg: 'bg-indigo-50' },
        { name: 'Manali, Himachal Pradesh', subtitle: 'For mountain adventures', icon: MdOutlineLocationOn, color: 'text-teal-500', bg: 'bg-teal-50' },
    ]

    // Filter destinations based on search input
    const filteredDestinations = searchInput 
        ? destinations.filter(d => d.name.toLowerCase().includes(searchInput.toLowerCase()))
        : destinations

    return (
        <div className='bg-white rounded-3xl shadow-2xl border border-gray-200 py-4' style={{ width: '450px', maxHeight: '500px', overflowY: 'auto' }}>
            <p className='text-sm font-semibold text-gray-800 px-6 mb-3'>Suggested destinations</p>
            <div>
                {filteredDestinations.map((dest, i) => (
                    <button 
                        key={i}
                        className='w-full flex items-center gap-4 px-6 py-3 hover:bg-gray-50 transition-colors text-left'
                        onClick={() => onSelect(dest)}
                    >
                        <div className={`w-12 h-12 ${dest.bg} rounded-xl flex items-center justify-center`}>
                            <dest.icon className={`w-6 h-6 ${dest.color}`} />
                        </div>
                        <div>
                            <p className='font-medium text-gray-800'>{dest.name}</p>
                            <p className='text-sm text-gray-500'>{dest.subtitle}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default DestinationList
