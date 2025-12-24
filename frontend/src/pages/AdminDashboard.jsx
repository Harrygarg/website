import React, { useContext, useEffect, useState } from 'react'
import { IoArrowBack, IoPerson, IoHome, IoCalendar, IoStatsChart } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { authDataContext } from '../Context/AuthContext'
import { userDataContext } from '../Context/UserContext'

function AdminDashboard() {
    const navigate = useNavigate()
    const { serverUrl } = useContext(authDataContext)
    const { userData } = useContext(userDataContext)
    
    const [activeTab, setActiveTab] = useState('stats')
    const [stats, setStats] = useState(null)
    const [users, setUsers] = useState([])
    const [bookings, setBookings] = useState([])
    const [listings, setListings] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!userData) {
            navigate('/login')
            return
        }
        fetchData()
    }, [userData])

    const fetchData = async () => {
        setLoading(true)
        try {
            const [statsRes, usersRes, bookingsRes, listingsRes] = await Promise.all([
                axios.get(serverUrl + '/api/admin/stats', { withCredentials: true }),
                axios.get(serverUrl + '/api/admin/users', { withCredentials: true }),
                axios.get(serverUrl + '/api/admin/bookings', { withCredentials: true }),
                axios.get(serverUrl + '/api/admin/listings', { withCredentials: true }),
            ])
            
            setStats(statsRes.data.stats)
            setUsers(usersRes.data.users || [])
            setBookings(bookingsRes.data.bookings || [])
            setListings(listingsRes.data.listings || [])
        } catch (error) {
            console.error('Error fetching admin data:', error)
        }
        setLoading(false)
    }

    const formatDate = (dateStr) => {
        if (!dateStr) return 'N/A'
        return new Date(dateStr).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
    }

    const tabs = [
        { id: 'stats', name: 'Dashboard', icon: IoStatsChart },
        { id: 'users', name: 'All Users', icon: IoPerson },
        { id: 'bookings', name: 'All Bookings', icon: IoCalendar },
        { id: 'listings', name: 'All Listings', icon: IoHome },
    ]

    if (loading) {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <div className='text-center'>
                    <div className='w-12 h-12 border-4 border-gray-200 border-t-[#FF385C] rounded-full animate-spin mx-auto mb-4'></div>
                    <p className='text-gray-500'>Loading admin data...</p>
                </div>
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-gray-50'>
            {/* Header */}
            <div className='bg-white border-b border-gray-200 sticky top-0 z-10'>
                <div className='max-w-7xl mx-auto px-4 py-4 flex items-center gap-4'>
                    <button 
                        onClick={() => navigate('/')}
                        className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                    >
                        <IoArrowBack className='w-5 h-5' />
                    </button>
                    <h1 className='text-xl font-semibold'>Admin Dashboard</h1>
                </div>
            </div>

            <div className='max-w-7xl mx-auto px-4 py-8'>
                {/* Tabs */}
                <div className='flex gap-2 mb-8 overflow-x-auto'>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-medium text-sm transition-colors whitespace-nowrap ${
                                activeTab === tab.id 
                                    ? 'bg-gray-900 text-white' 
                                    : 'bg-white text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            <tab.icon className='w-4 h-4' />
                            {tab.name}
                        </button>
                    ))}
                </div>

                {/* Stats Tab */}
                {activeTab === 'stats' && stats && (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                        <div className='bg-white p-6 rounded-2xl shadow-sm border border-gray-100'>
                            <div className='flex items-center gap-4'>
                                <div className='w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center'>
                                    <IoPerson className='w-6 h-6 text-blue-600' />
                                </div>
                                <div>
                                    <p className='text-2xl font-bold text-gray-800'>{stats.totalUsers}</p>
                                    <p className='text-sm text-gray-500'>Total Users</p>
                                </div>
                            </div>
                        </div>
                        <div className='bg-white p-6 rounded-2xl shadow-sm border border-gray-100'>
                            <div className='flex items-center gap-4'>
                                <div className='w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center'>
                                    <IoHome className='w-6 h-6 text-green-600' />
                                </div>
                                <div>
                                    <p className='text-2xl font-bold text-gray-800'>{stats.totalListings}</p>
                                    <p className='text-sm text-gray-500'>Total Listings</p>
                                </div>
                            </div>
                        </div>
                        <div className='bg-white p-6 rounded-2xl shadow-sm border border-gray-100'>
                            <div className='flex items-center gap-4'>
                                <div className='w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center'>
                                    <IoCalendar className='w-6 h-6 text-purple-600' />
                                </div>
                                <div>
                                    <p className='text-2xl font-bold text-gray-800'>{stats.totalBookings}</p>
                                    <p className='text-sm text-gray-500'>Total Bookings</p>
                                </div>
                            </div>
                        </div>
                        <div className='bg-white p-6 rounded-2xl shadow-sm border border-gray-100'>
                            <div className='flex items-center gap-4'>
                                <div className='w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center'>
                                    <IoHome className='w-6 h-6 text-rose-600' />
                                </div>
                                <div>
                                    <p className='text-2xl font-bold text-gray-800'>{stats.bookedListings}</p>
                                    <p className='text-sm text-gray-500'>Booked Properties</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Users Tab */}
                {activeTab === 'users' && (
                    <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
                        <div className='p-4 border-b border-gray-100'>
                            <h2 className='font-semibold text-gray-800'>All Users ({users.length})</h2>
                        </div>
                        <div className='overflow-x-auto'>
                            <table className='w-full'>
                                <thead className='bg-gray-50'>
                                    <tr>
                                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Name</th>
                                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Email</th>
                                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Listings</th>
                                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Joined</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-gray-100'>
                                    {users.map((user, i) => (
                                        <tr key={user._id || i} className='hover:bg-gray-50'>
                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                <div className='flex items-center gap-3'>
                                                    <div className='w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center'>
                                                        <span className='text-sm font-medium text-gray-600'>{user.name?.charAt(0)?.toUpperCase()}</span>
                                                    </div>
                                                    <span className='font-medium text-gray-800'>{user.name}</span>
                                                </div>
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap text-gray-600'>{user.email}</td>
                                            <td className='px-6 py-4 whitespace-nowrap text-gray-600'>{user.listing?.length || 0}</td>
                                            <td className='px-6 py-4 whitespace-nowrap text-gray-500 text-sm'>{formatDate(user.createdAt)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Bookings Tab */}
                {activeTab === 'bookings' && (
                    <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
                        <div className='p-4 border-b border-gray-100'>
                            <h2 className='font-semibold text-gray-800'>All Bookings ({bookings.length})</h2>
                        </div>
                        <div className='overflow-x-auto'>
                            <table className='w-full'>
                                <thead className='bg-gray-50'>
                                    <tr>
                                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Property</th>
                                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Booked By</th>
                                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Check-in</th>
                                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Check-out</th>
                                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Total</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-gray-100'>
                                    {bookings.map((booking, i) => (
                                        <tr key={booking._id || i} className='hover:bg-gray-50'>
                                            <td className='px-6 py-4'>
                                                <div className='flex items-center gap-3'>
                                                    {booking.listing?.image1 && (
                                                        <img src={booking.listing.image1} alt="" className='w-10 h-10 rounded-lg object-cover' />
                                                    )}
                                                    <div>
                                                        <p className='font-medium text-gray-800'>{booking.listing?.title || 'N/A'}</p>
                                                        <p className='text-sm text-gray-500'>{booking.listing?.city}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                <div>
                                                    <p className='font-medium text-gray-800'>{booking.user?.name || 'N/A'}</p>
                                                    <p className='text-sm text-gray-500'>{booking.user?.email}</p>
                                                </div>
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap text-gray-600'>{formatDate(booking.checkIn)}</td>
                                            <td className='px-6 py-4 whitespace-nowrap text-gray-600'>{formatDate(booking.checkOut)}</td>
                                            <td className='px-6 py-4 whitespace-nowrap font-semibold text-gray-800'>₹{booking.totalRent?.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                    {bookings.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className='px-6 py-12 text-center text-gray-500'>No bookings yet</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Listings Tab */}
                {activeTab === 'listings' && (
                    <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
                        <div className='p-4 border-b border-gray-100'>
                            <h2 className='font-semibold text-gray-800'>All Listings ({listings.length})</h2>
                        </div>
                        <div className='overflow-x-auto'>
                            <table className='w-full'>
                                <thead className='bg-gray-50'>
                                    <tr>
                                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Property</th>
                                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Host</th>
                                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Category</th>
                                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Price/Night</th>
                                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-gray-100'>
                                    {listings.map((listing, i) => (
                                        <tr key={listing._id || i} className='hover:bg-gray-50'>
                                            <td className='px-6 py-4'>
                                                <div className='flex items-center gap-3'>
                                                    {listing.image1 && (
                                                        <img src={listing.image1} alt="" className='w-10 h-10 rounded-lg object-cover' />
                                                    )}
                                                    <div>
                                                        <p className='font-medium text-gray-800'>{listing.title}</p>
                                                        <p className='text-sm text-gray-500'>{listing.city}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                <p className='text-gray-800'>{listing.host?.name || 'N/A'}</p>
                                                <p className='text-sm text-gray-500'>{listing.host?.email}</p>
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                <span className='px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium'>{listing.category}</span>
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap font-semibold text-gray-800'>₹{listing.rent?.toLocaleString()}</td>
                                            <td className='px-6 py-4 whitespace-nowrap'>
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${listing.isBooked ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                                    {listing.isBooked ? 'Booked' : 'Available'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminDashboard
