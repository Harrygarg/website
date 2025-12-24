import React, { useState, useRef, useEffect, useContext } from 'react'
import { FiSearch } from 'react-icons/fi'
import DatePicker from './DatePicker'
import GuestCounter from './GuestCounter'
import DestinationList from './DestinationList'
import { bookingDataContext } from '../Context/BookingContext'
import { listingDataContext } from '../Context/ListingContext'

function SearchBar({ onSearch }) {
    const [activePanel, setActivePanel] = useState(null) // 'where' | 'when' | 'who' | null
    const [searchInput, setSearchInput] = useState('')
    const [selectedDestination, setSelectedDestination] = useState('')
    const [guests, setGuests] = useState({ adults: 0, children: 0, infants: 0, pets: 0 })
    
    const { checkIn, setCheckIn, checkOut, setCheckOut } = useContext(bookingDataContext)
    const { listingData, setNewListData, checkListingsAvailability } = useContext(listingDataContext)
    
    const searchBarRef = useRef(null)

    // Click outside handler
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
                setActivePanel(null)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleDestinationSelect = (dest) => {
        setSelectedDestination(dest.name.split(',')[0])
        setSearchInput(dest.name.split(',')[0])
        setActivePanel('when')
    }

    const handleSearch = () => {
        setActivePanel(null)
        const query = selectedDestination || searchInput
        
        if (query && query.length > 0 && query !== 'Nearby') {
            const filtered = listingData?.filter(l => 
                l.city?.toLowerCase().includes(query.toLowerCase()) ||
                l.landMark?.toLowerCase().includes(query.toLowerCase()) ||
                l.title?.toLowerCase().includes(query.toLowerCase()) ||
                l.category?.toLowerCase().includes(query.toLowerCase())
            ) || []
            
            if (filtered.length > 0) {
                setNewListData(filtered)
            } else {
                // No results, show all
                setNewListData(listingData)
            }
        } else {
            // No search query, show all
            setNewListData(listingData)
        }

        // Check availability if dates are selected
        if (checkIn && checkOut && checkListingsAvailability) {
            checkListingsAvailability(checkIn, checkOut)
        }
        
        // Scroll to listings section
        setTimeout(() => {
            const listingsSection = document.getElementById('all-listings')
            if (listingsSection) {
                listingsSection.scrollIntoView({ behavior: 'smooth' })
            }
        }, 100)
        
        if (onSearch) onSearch()
    }

    const totalGuests = guests.adults + guests.children
    const guestText = totalGuests > 0 
        ? `${totalGuests} guest${totalGuests > 1 ? 's' : ''}${guests.infants > 0 ? `, ${guests.infants} infant${guests.infants > 1 ? 's' : ''}` : ''}`
        : 'Add guests'

    const formatDateDisplay = () => {
        if (checkIn && checkOut) {
            const inDate = new Date(checkIn)
            const outDate = new Date(checkOut)
            return `${inDate.getDate()} ${inDate.toLocaleString('default', { month: 'short' })} - ${outDate.getDate()} ${outDate.toLocaleString('default', { month: 'short' })}`
        }
        return 'Add dates'
    }

    return (
        <div className='relative' ref={searchBarRef}>
            {/* Main Search Bar */}
            <div 
                className={`flex items-center bg-white border border-gray-300 rounded-full transition-all duration-200 ${activePanel ? 'shadow-lg' : 'shadow-sm hover:shadow-md'}`}
                style={{ minWidth: '700px' }}
            >
                {/* Where */}
                <button 
                    className={`flex-1 px-6 py-4 text-left rounded-full transition-colors relative ${activePanel === 'where' ? 'bg-white shadow-md' : 'hover:bg-gray-50'}`}
                    onClick={() => setActivePanel(activePanel === 'where' ? null : 'where')}
                >
                    <p className='text-xs font-bold text-gray-800'>Where</p>
                    <input 
                        type='text'
                        placeholder='Search destinations'
                        className='w-full text-sm text-gray-600 bg-transparent outline-none placeholder-gray-400'
                        value={searchInput}
                        onChange={(e) => {
                            setSearchInput(e.target.value)
                            setSelectedDestination('')
                            if (!activePanel) setActivePanel('where')
                        }}
                        onClick={(e) => {
                            e.stopPropagation()
                            setActivePanel('where')
                        }}
                    />
                    {activePanel === 'where' && <div className='absolute bottom-0 left-6 right-6 h-0.5 bg-gray-800 rounded-full'></div>}
                </button>

                <div className='w-px h-8 bg-gray-300'></div>

                {/* When */}
                <button 
                    className={`px-6 py-4 text-left rounded-full transition-colors relative min-w-[180px] ${activePanel === 'when' ? 'bg-white shadow-md' : 'hover:bg-gray-50'}`}
                    onClick={() => setActivePanel(activePanel === 'when' ? null : 'when')}
                >
                    <p className='text-xs font-bold text-gray-800'>When</p>
                    <p className='text-sm text-gray-500'>{formatDateDisplay()}</p>
                    {activePanel === 'when' && <div className='absolute bottom-0 left-6 right-6 h-0.5 bg-gray-800 rounded-full'></div>}
                </button>

                <div className='w-px h-8 bg-gray-300'></div>

                {/* Who */}
                <button 
                    className={`flex-1 px-6 py-4 text-left rounded-full transition-colors relative ${activePanel === 'who' ? 'bg-white shadow-md' : 'hover:bg-gray-50'}`}
                    onClick={() => setActivePanel(activePanel === 'who' ? null : 'who')}
                >
                    <p className='text-xs font-bold text-gray-800'>Who</p>
                    <p className='text-sm text-gray-500'>{guestText}</p>
                    {activePanel === 'who' && <div className='absolute bottom-0 left-6 right-6 h-0.5 bg-gray-800 rounded-full'></div>}
                </button>

                {/* Search Button */}
                <button 
                    className='m-2 px-5 py-3 bg-gradient-to-r from-[#FF385C] to-[#E61E4D] rounded-full flex items-center gap-2 hover:brightness-105 transition-all'
                    onClick={handleSearch}
                >
                    <FiSearch className='w-4 h-4 text-white' />
                    <span className='text-white font-medium text-sm'>Search</span>
                </button>
            </div>

            {/* Panels */}
            {activePanel && (
                <div className='absolute top-full mt-3 z-[9999]' style={{
                    left: activePanel === 'where' ? '0' : activePanel === 'when' ? '50%' : 'auto',
                    right: activePanel === 'who' ? '0' : 'auto',
                    transform: activePanel === 'when' ? 'translateX(-50%)' : 'none'
                }}>
                    {activePanel === 'where' && (
                        <DestinationList 
                            onSelect={handleDestinationSelect}
                            searchInput={searchInput}
                        />
                    )}
                    {activePanel === 'when' && (
                        <DatePicker 
                            checkIn={checkIn}
                            setCheckIn={setCheckIn}
                            checkOut={checkOut}
                            setCheckOut={setCheckOut}
                            onClose={() => setActivePanel('who')}
                        />
                    )}
                    {activePanel === 'who' && (
                        <GuestCounter 
                            guests={guests}
                            setGuests={setGuests}
                        />
                    )}
                </div>
            )}

            {/* Overlay */}
            {activePanel && (
                <div 
                    className='fixed inset-0 bg-black/20 -z-10'
                    onClick={() => setActivePanel(null)}
                />
            )}
        </div>
    )
}

export default SearchBar
