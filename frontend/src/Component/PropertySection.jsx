import React, { useContext } from 'react'
import { IoChevronForward, IoChevronBack } from 'react-icons/io5'
import { FaStar, FaRegHeart } from 'react-icons/fa'
import { MdOutlineVilla, MdOutlineApartment, MdOutlinePool, MdOutlineBedroomParent } from 'react-icons/md'
import { GiWoodCabin, GiFarmTractor } from 'react-icons/gi'
import { listingDataContext } from '../Context/ListingContext'
import { useNavigate } from 'react-router-dom'

function PropertySection() {
  const { listingData, handleViewCard, setNewListData } = useContext(listingDataContext)
  const navigate = useNavigate()

  // Group listings by city - only show cities with 3+ listings
  const groupedListings = listingData?.reduce((acc, listing) => {
    const city = listing.city || 'Other'
    if (!acc[city]) acc[city] = []
    acc[city].push(listing)
    return acc
  }, {}) || {}

  // Filter to only show cities with at least 3 listings
  const citiesWithEnoughListings = Object.entries(groupedListings)
    .filter(([city, listings]) => listings.length >= 3)
    .sort((a, b) => b[1].length - a[1].length) // Sort by most listings first

  // Property types for browsing
  const propertyTypes = [
    { id: 'villa', name: 'Villas', icon: MdOutlineVilla, image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80' },
    { id: 'flat', name: 'Apartments', icon: MdOutlineApartment, image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80' },
    { id: 'cabin', name: 'Cabins', icon: GiWoodCabin, image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=400&q=80' },
    { id: 'farmHouse', name: 'Farm stays', icon: GiFarmTractor, image: 'https://images.unsplash.com/photo-1500076656116-558758c991c1?w=400&q=80' },
    { id: 'poolHouse', name: 'Pool Houses', icon: MdOutlinePool, image: 'https://images.unsplash.com/photo-1575517111478-7f6afd0973db?w=400&q=80' },
    { id: 'rooms', name: 'Rooms', icon: MdOutlineBedroomParent, image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&q=80' },
  ]

  const handlePropertyTypeClick = (categoryId) => {
    const filtered = listingData?.filter(l => l.category === categoryId) || []
    if (filtered.length > 0) {
      setNewListData(filtered)
      // Scroll to listings grid
      document.getElementById('all-listings')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // PropertyCard component for horizontal scroll
  const PropertyCard = ({ listing }) => (
    <div 
      className='flex-shrink-0 w-[220px] cursor-pointer group'
      onClick={() => handleViewCard(listing._id)}
    >
      <div className='relative aspect-[4/5] rounded-2xl overflow-hidden mb-3'>
        <img 
          src={listing.image1} 
          alt={listing.title}
          className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
          loading='lazy'
        />
        {/* Guest Favourite Badge */}
        {listing.ratings >= 4.5 && (
          <div className='absolute top-3 left-3 bg-white px-3 py-1.5 rounded-full shadow-sm'>
            <span className='text-xs font-semibold text-gray-800'>Guest favourite</span>
          </div>
        )}
        {/* Heart */}
        <button 
          className='absolute top-3 right-3 p-2 hover:scale-110 transition-transform'
          onClick={(e) => e.stopPropagation()}
        >
          <FaRegHeart className='w-5 h-5 text-white drop-shadow-lg' />
        </button>
      </div>
      <div className='space-y-1'>
        <div className='flex items-center justify-between'>
          <p className='text-sm font-medium text-gray-800 truncate pr-2'>
            {listing.category?.charAt(0).toUpperCase() + listing.category?.slice(1)} in {listing.landMark}
          </p>
          <div className='flex items-center gap-1 flex-shrink-0'>
            <FaStar className='w-3 h-3 text-gray-800' />
            <span className='text-sm text-gray-800'>{listing.ratings || '4.5'}</span>
          </div>
        </div>
        <p className='text-sm text-gray-500'>
          ₹{listing.rent?.toLocaleString()} <span className='text-gray-400'>/ night</span>
        </p>
      </div>
    </div>
  )

  if (!listingData || listingData.length === 0) {
    return null
  }

  return (
    <div className='space-y-16 py-8'>
      {/* Popular homes by city - only show if city has 3+ listings */}
      {citiesWithEnoughListings.slice(0, 2).map(([city, listings]) => (
        <section key={city} className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-xl md:text-2xl font-semibold text-gray-800 flex items-center gap-2'>
              Popular homes in {city}
              <IoChevronForward className='w-5 h-5 text-gray-600' />
            </h2>
          </div>
          
          {/* Horizontal Scroll Container */}
          <div className='relative group/scroll'>
            <div className='flex gap-5 overflow-x-auto pb-4 hide-scrollbar scroll-smooth' id={`scroll-${city}`}>
              {listings.slice(0, 10).map((listing) => (
                <PropertyCard key={listing._id} listing={listing} />
              ))}
            </div>
            
            {/* Scroll Arrows */}
            {listings.length > 4 && (
              <>
                <button 
                  className='absolute left-0 top-1/3 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity flex items-center justify-center hover:scale-105'
                  onClick={() => document.getElementById(`scroll-${city}`)?.scrollBy({ left: -240, behavior: 'smooth' })}
                >
                  <IoChevronBack className='w-5 h-5 text-gray-800' />
                </button>
                <button 
                  className='absolute right-0 top-1/3 translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg opacity-0 group-hover/scroll:opacity-100 transition-opacity flex items-center justify-center hover:scale-105'
                  onClick={() => document.getElementById(`scroll-${city}`)?.scrollBy({ left: 240, behavior: 'smooth' })}
                >
                  <IoChevronForward className='w-5 h-5 text-gray-800' />
                </button>
              </>
            )}
          </div>
        </section>
      ))}

      {/* Browse by property type */}
      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-xl md:text-2xl font-semibold text-gray-800 mb-6'>
          Browse by property type
        </h2>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
          {propertyTypes.map((type) => {
            const count = listingData?.filter(l => l.category === type.id).length || 0
            return (
              <button 
                key={type.id}
                onClick={() => handlePropertyTypeClick(type.id)}
                className='group text-left'
              >
                <div className='relative aspect-square rounded-xl overflow-hidden mb-3'>
                  <img 
                    src={type.image} 
                    alt={type.name}
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                    loading='lazy'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent' />
                  <type.icon className='absolute bottom-3 left-3 w-6 h-6 text-white' />
                </div>
                <p className='font-medium text-gray-800 group-hover:text-rose-600 transition-colors'>{type.name}</p>
                <p className='text-sm text-gray-500'>{count} properties</p>
              </button>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default PropertySection
