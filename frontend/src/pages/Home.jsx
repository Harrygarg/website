import React, { useContext, useState } from 'react'
import Nav from '../Component/Nav'
import Card from '../Component/Card'
import Footer from '../Component/Footer'
import PropertySection from '../Component/PropertySection'
import { listingDataContext } from '../Context/ListingContext'
import { IoChevronDown, IoFilter } from 'react-icons/io5'

function Home() {
  const { newListData, listingData, setNewListData, unavailableListings } = useContext(listingDataContext)
  const [sortBy, setSortBy] = useState('relevance')
  const [showSortMenu, setShowSortMenu] = useState(false)

  const sortOptions = [
    { id: 'relevance', name: 'Relevance' },
    { id: 'price_low', name: 'Price: Low to High' },
    { id: 'price_high', name: 'Price: High to Low' },
    { id: 'rating', name: 'Top Rated' },
    { id: 'newest', name: 'Newest' },
  ]

  const handleSort = (sortId) => {
    setSortBy(sortId)
    setShowSortMenu(false)
    
    let sorted = [...(newListData || [])]
    
    switch(sortId) {
      case 'price_low':
        sorted.sort((a, b) => (a.rent || 0) - (b.rent || 0))
        break
      case 'price_high':
        sorted.sort((a, b) => (b.rent || 0) - (a.rent || 0))
        break
      case 'rating':
        sorted.sort((a, b) => (b.ratings || 0) - (a.ratings || 0))
        break
      case 'newest':
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        break
      default:
        sorted = listingData || []
    }
    
    setNewListData(sorted)
  }

  const resetFilters = () => {
    setNewListData(listingData)
    setSortBy('relevance')
  }
  
  return (
    <div className='min-h-screen bg-white'>
      {/* Navigation */}
      <Nav />
      
      {/* Main Content - Account for fixed navbar height */}
      <main className='pt-[200px] lg:pt-[180px]'>
        {/* Property Sections - Popular homes, Browse by type */}
        {listingData && listingData.length >= 6 && (
          <PropertySection />
        )}
        
        {/* All Listings Grid */}
        <section id="all-listings" className='bg-white py-12 md:py-16'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            {/* Header with Sort */}
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8'>
              <div>
                <h2 className='text-2xl md:text-3xl font-semibold text-gray-800'>
                  {newListData?.length !== listingData?.length ? 'Filtered listings' : 'Explore all listings'}
                </h2>
                <p className='text-gray-500 mt-1'>
                  {newListData?.length || 0} places to stay
                </p>
              </div>

              <div className='flex items-center gap-3'>
                {/* Sort Dropdown */}
                <div className='relative'>
                  <button 
                    className='flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-xl hover:border-gray-800 transition-colors'
                    onClick={() => setShowSortMenu(!showSortMenu)}
                  >
                    <IoFilter className='w-4 h-4' />
                    <span className='text-sm font-medium'>{sortOptions.find(s => s.id === sortBy)?.name}</span>
                    <IoChevronDown className={`w-4 h-4 transition-transform ${showSortMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {showSortMenu && (
                    <>
                      <div className='fixed inset-0 z-40' onClick={() => setShowSortMenu(false)}></div>
                      <div className='absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50'>
                        {sortOptions.map(option => (
                          <button 
                            key={option.id}
                            className={`w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors ${sortBy === option.id ? 'font-semibold text-gray-800' : 'text-gray-600'}`}
                            onClick={() => handleSort(option.id)}
                          >
                            {option.name}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Clear Filter */}
                {(newListData?.length !== listingData?.length || sortBy !== 'relevance') && (
                  <button 
                    className='px-4 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-xl transition-colors'
                    onClick={resetFilters}
                  >
                    Clear all
                  </button>
                )}
              </div>
            </div>
            
            {/* Listings Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              {newListData?.map((list) => (
                <Card 
                  key={list._id}
                  title={list.title} 
                  landMark={list.landMark} 
                  city={list.city} 
                  image1={list.image1} 
                  image2={list.image2} 
                  image3={list.image3} 
                  rent={list.rent} 
                  id={list._id} 
                  ratings={list.ratings} 
                  isBooked={list.isBooked} 
                  host={list.host}
                  unavailableForDates={unavailableListings?.[list._id] || false}
                />
              ))}
            </div>
            
            {/* Empty State */}
            {(!newListData || newListData.length === 0) && (
              <div className='flex flex-col items-center justify-center py-16'>
                <div className='w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
                  <svg className='w-12 h-12 text-gray-400' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className='text-lg font-semibold text-gray-800 mb-1'>No listings found</h3>
                <p className='text-gray-500 text-center max-w-md mb-4'>
                  Try adjusting your search or filter to find what you're looking for.
                </p>
                <button 
                  className='px-6 py-3 bg-gradient-to-r from-[#FF385C] to-[#E61E4D] text-white font-medium rounded-lg hover:brightness-105 transition-all'
                  onClick={resetFilters}
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </section>
        
        {/* Footer */}
        <Footer />
      </main>
    </div>
  )
}

export default Home
