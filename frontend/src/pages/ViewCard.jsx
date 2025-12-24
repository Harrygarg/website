import React, { useContext, useEffect, useState } from 'react'
import {
    IoArrowBack, IoClose, IoStar, IoHeartOutline, IoShareOutline, IoChevronDown,
    IoRemove, IoAdd, IoWifi, IoTv, IoCarSport, IoSnow, IoShieldCheckmark, IoFlame,
    IoWater, IoLeaf, IoLocationSharp, IoPersonCircle, IoCalendarClear, IoBedOutline, IoHome
} from "react-icons/io5"
import { MdOutlineKitchen, MdOutlineLocalLaundryService, MdBalcony, MdOutlinePets, MdAir, MdPool, MdWorkspaces } from "react-icons/md"
import { FaStar, FaRegStar } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import { listingDataContext } from '../Context/ListingContext'
import { userDataContext } from '../Context/UserContext'
import axios from 'axios'
import { authDataContext } from '../Context/AuthContext'
import { bookingDataContext } from '../Context/BookingContext'
import { toast } from 'react-toastify'
import PaymentModal from '../Component/PaymentModal'

function ViewCard() {
    const navigate = useNavigate()
    const { cardDetails, updating, setUpdating, deleting, setDeleting } = useContext(listingDataContext)
    const { userData } = useContext(userDataContext)
    const { serverUrl } = useContext(authDataContext)
    const { checkIn, setCheckIn, checkOut, setCheckOut, total, setTotal, night, setNight, handleBooking, booking } = useContext(bookingDataContext)

    const [guestPopup, setGuestPopup] = useState(false)
    const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0 })
    const [showPayment, setShowPayment] = useState(false)
    const [minDate, setMinDate] = useState("")
    const [bookedDates, setBookedDates] = useState([])
    const [dateWarning, setDateWarning] = useState("")

    const totalGuests = guests.adults + guests.children

    const updateGuests = (type, action) => {
        setGuests(prev => {
            const min = type === 'adults' ? 1 : 0
            const max = type === 'infants' ? 5 : 16
            const newValue = action === 'add' ? prev[type] + 1 : prev[type] - 1
            if (newValue < min || newValue > max) return prev
            return { ...prev, [type]: newValue }
        })
    }

    // Set min date to today
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0]
        setMinDate(today)
    }, [])

    // Fetch booked dates for this listing
    useEffect(() => {
        const fetchBookedDates = async () => {
            if (cardDetails?._id && cardDetails._id.length === 24) {
                try {
                    const res = await axios.get(`${serverUrl}/api/booking/booked-dates/${cardDetails._id}`)
                    setBookedDates(res.data.bookedDates || [])
                    console.log('Booked dates:', res.data.bookedDates)
                } catch (error) {
                    console.log('Error fetching booked dates:', error)
                }
            }
        }
        fetchBookedDates()
    }, [cardDetails?._id, serverUrl])

    // Calculate total when dates change + validate against booked dates
    useEffect(() => {
        if (checkIn && checkOut && cardDetails?.rent) {
            const inDate = new Date(checkIn)
            const outDate = new Date(checkOut)
            const n = Math.ceil((outDate - inDate) / (24 * 60 * 60 * 1000))
            
            if (n > 0) {
                setNight(n)
                // Price calculation:
                // Base: rent per night × number of nights
                // Service fee: 7% of rent (Airbnb platform fee)
                // Tax: 7% of rent (GST/local taxes)
                const basePrice = cardDetails.rent * n
                const serviceFee = cardDetails.rent * 0.07
                const tax = cardDetails.rent * 0.07
                setTotal(basePrice + serviceFee + tax)

                // Check if any selected date overlaps with booked dates
                if (bookedDates.length > 0) {
                    let hasConflict = false
                    for (let d = new Date(inDate); d < outDate; d.setDate(d.getDate() + 1)) {
                        const dateStr = d.toISOString().split('T')[0]
                        if (bookedDates.includes(dateStr)) {
                            hasConflict = true
                            break
                        }
                    }
                    if (hasConflict) {
                        setDateWarning("⚠️ Some dates are already booked. Please select different dates.")
                    } else {
                        setDateWarning("")
                    }
                } else {
                    setDateWarning("")
                }
            } else {
                setNight(0)
                setTotal(0)
                setDateWarning("")
            }
        }
    }, [checkIn, checkOut, cardDetails?.rent, bookedDates])

    // CLICK OUTSIDE TO CLOSE POPUP
    useEffect(() => {
        const close = (e) => {
            if (!e.target.closest(".guest-popup-container")) {
                setGuestPopup(false);
            }
        };
        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
    }, []);

    // Sample amenities
    const amenities = [
        { icon: IoWifi, name: 'High-speed WiFi', available: true },
        { icon: IoTv, name: 'Smart TV', available: true },
        { icon: MdOutlineKitchen, name: 'Fully equipped kitchen', available: true },
        { icon: MdAir, name: 'Air conditioning', available: true },
        { icon: MdOutlineLocalLaundryService, name: 'Washing machine', available: true },
        { icon: IoCarSport, name: 'Free parking', available: true },
        { icon: MdBalcony, name: 'Balcony', available: true },
        { icon: MdPool, name: 'Pool access', available: false },
    ]

    // Sample reviews
    const sampleReviews = [
        { name: 'Priya', date: 'November 2024', rating: 5, comment: 'Absolutely wonderful stay! The place was exactly as described.' },
        { name: 'Rahul', date: 'October 2024', rating: 5, comment: 'Great location and the apartment was spotless. Highly recommended!' },
        { name: 'Anita', date: 'October 2024', rating: 4, comment: 'Nice place with good views. Overall a pleasant experience.' },
    ]

    if (!cardDetails) return null

    return (
        <div className='min-h-screen bg-white'>
            {/* Header */}
            <div className='sticky top-0 z-10 bg-white border-b border-gray-200'>
                <div className='max-w-7xl mx-auto px-4 py-4'>
                    <button 
                        className='flex items-center gap-2 text-gray-700 hover:text-gray-900'
                        onClick={() => navigate('/')}
                    >
                        <IoArrowBack className='w-5 h-5' />
                        <span>Back</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
                {/* Title */}
                <h1 className='text-2xl md:text-3xl font-semibold text-gray-800 mb-2'>{cardDetails.title}</h1>
                <div className='flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-6'>
                    <div className='flex items-center gap-1'>
                        <IoStar className='w-4 h-4 text-gray-800' />
                        <span className='font-medium text-gray-800'>{cardDetails.ratings || '4.5'}</span>
                    </div>
                    <span>·</span>
                    <span>{cardDetails.landMark}, {cardDetails.city}</span>
                </div>

                {/* Image Gallery */}
                <div className='grid grid-cols-1 md:grid-cols-4 gap-2 rounded-xl overflow-hidden mb-8'>
                    <div className='md:col-span-2 md:row-span-2'>
                        <img src={cardDetails.image1} alt={cardDetails.title} className='w-full h-[300px] md:h-full object-cover' />
                    </div>
                    <div className='hidden md:block'>
                        <img src={cardDetails.image2} alt={cardDetails.title} className='w-full h-full object-cover' />
                    </div>
                    <div className='hidden md:block'>
                        <img src={cardDetails.image3} alt={cardDetails.title} className='w-full h-full object-cover' />
                    </div>
                </div>

                <div className='flex flex-col lg:flex-row gap-12'>
                    {/* Left Column - Details */}
                    <div className='flex-1'>
                        {/* Host Info */}
                        <div className='flex items-center gap-4 py-6 border-b border-gray-200'>
                            <div className='w-14 h-14 bg-gray-700 rounded-full flex items-center justify-center text-white text-xl'>
                                {cardDetails.host?.name?.charAt(0) || 'H'}
                            </div>
                            <div>
                                <h2 className='text-lg font-semibold'>Hosted by {cardDetails.host?.name || 'Host'}</h2>
                                <p className='text-gray-500 text-sm'>Superhost · 2 years hosting</p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className='py-6 border-b border-gray-200'>
                            <h3 className='text-lg font-semibold mb-4'>About this place</h3>
                            <p className='text-gray-600 leading-relaxed'>{cardDetails.description}</p>
                        </div>

                        {/* Amenities */}
                        <div className='py-6 border-b border-gray-200'>
                            <h3 className='text-lg font-semibold mb-4'>What this place offers</h3>
                            <div className='grid grid-cols-2 gap-4'>
                                {amenities.slice(0, 6).map((amenity, i) => (
                                    <div key={i} className='flex items-center gap-4'>
                                        <amenity.icon className={`w-6 h-6 ${amenity.available ? 'text-gray-700' : 'text-gray-300 line-through'}`} />
                                        <span className={amenity.available ? '' : 'line-through text-gray-400'}>{amenity.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Reviews */}
                        <div className='py-6 border-b border-gray-200'>
                            <div className='flex items-center gap-2 mb-6'>
                                <IoStar className='w-5 h-5 text-gray-800' />
                                <span className='text-lg font-semibold'>{cardDetails.ratings || '4.5'} · {sampleReviews.length} reviews</span>
                            </div>
                            <div className='space-y-6'>
                                {sampleReviews.map((review, i) => (
                                    <div key={i}>
                                        <div className='flex items-center gap-3 mb-2'>
                                            <div className='w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white'>
                                                {review.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className='font-medium'>{review.name}</p>
                                                <p className='text-sm text-gray-500'>{review.date}</p>
                                            </div>
                                        </div>
                                        <p className='text-gray-600 text-sm'>{review.comment}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Booking Card */}
                    <div className='lg:w-[380px] flex-shrink-0'>
                        <div className='sticky top-24 border border-gray-200 rounded-xl p-6 shadow-lg'>
                            {/* Price */}
                            <div className='flex items-baseline gap-1 mb-6'>
                                <span className='text-2xl font-semibold text-gray-800'>₹{cardDetails.rent?.toLocaleString()}</span>
                                <span className='text-gray-500'>night</span>
                            </div>

                            {/* Date + Guests */}
                            <div className='border border-gray-300 rounded-xl mb-4'>
                                {/* Dates */}
                                <div className='grid grid-cols-2'>
                                    <div className='p-4 border-r border-b border-gray-300'>
                                        <label className='text-[10px] font-bold text-gray-800 uppercase tracking-wider'>Check-in</label>
                                        <input
                                            type="date"
                                            min={minDate}
                                            className='w-full text-sm text-gray-700 outline-none bg-transparent cursor-pointer font-medium'
                                            value={checkIn}
                                            onChange={(e) => setCheckIn(e.target.value)}
                                        />
                                    </div>
                                    <div className='p-4 border-b border-gray-300'>
                                        <label className='text-[10px] font-bold text-gray-800 uppercase tracking-wider'>Checkout</label>
                                        <input
                                            type="date"
                                            min={checkIn || minDate}
                                            className='w-full text-sm text-gray-700 outline-none bg-transparent cursor-pointer font-medium'
                                            value={checkOut}
                                            onChange={(e) => setCheckOut(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* GUEST SECTION */}
                                <div className="relative guest-popup-container">
                                    <button
                                        className='w-full p-4 flex items-center justify-between hover:bg-gray-50'
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setGuestPopup(!guestPopup)
                                        }}
                                    >
                                        <div>
                                            <label className='text-[10px] font-bold uppercase tracking-wider'>Guests</label>
                                            <p className='text-sm text-gray-700 font-medium'>
                                                {totalGuests} guest{totalGuests > 1 ? "s" : ""}
                                                {guests.infants > 0 ? `, ${guests.infants} infant` : ""}
                                            </p>
                                        </div>
                                        <IoChevronDown className={`w-5 h-5 transition-transform ${guestPopup ? "rotate-180" : ""}`} />
                                    </button>

                                    {/* POPUP */}
                                    {guestPopup && (
                                        <div
                                            className='guest-popup-container absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 p-6 z-[9999]'
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {/* Adults */}
                                            <div className='flex items-center justify-between py-4 border-b border-gray-100'>
                                                <div>
                                                    <p className='font-medium text-gray-800'>Adults</p>
                                                    <p className='text-sm text-gray-500'>Age 13+</p>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <button
                                                        type="button"
                                                        className={`w-8 h-8 rounded-full border flex items-center justify-center ${guests.adults <= 1 ? "border-gray-200 text-gray-300" : "border-gray-400 text-gray-700 hover:border-gray-600"}`}
                                                        disabled={guests.adults <= 1}
                                                        onClick={() => updateGuests("adults", "remove")}
                                                    >
                                                        <IoRemove />
                                                    </button>
                                                    <span className='w-6 text-center font-medium'>{guests.adults}</span>
                                                    <button
                                                        type="button"
                                                        className='w-8 h-8 rounded-full border border-gray-400 text-gray-700 flex items-center justify-center hover:border-gray-600'
                                                        onClick={() => updateGuests("adults", "add")}
                                                    >
                                                        <IoAdd />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Children */}
                                            <div className='flex items-center justify-between py-4 border-b border-gray-100'>
                                                <div>
                                                    <p className='font-medium text-gray-800'>Children</p>
                                                    <p className='text-sm text-gray-500'>Ages 2-12</p>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <button
                                                        type="button"
                                                        className={`w-8 h-8 rounded-full border flex items-center justify-center ${guests.children <= 0 ? "border-gray-200 text-gray-300" : "border-gray-400 text-gray-700 hover:border-gray-600"}`}
                                                        disabled={guests.children <= 0}
                                                        onClick={() => updateGuests("children", "remove")}
                                                    >
                                                        <IoRemove />
                                                    </button>
                                                    <span className='w-6 text-center font-medium'>{guests.children}</span>
                                                    <button
                                                        type="button"
                                                        className='w-8 h-8 rounded-full border border-gray-400 text-gray-700 flex items-center justify-center hover:border-gray-600'
                                                        onClick={() => updateGuests("children", "add")}
                                                    >
                                                        <IoAdd />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Infants */}
                                            <div className='flex items-center justify-between py-4'>
                                                <div>
                                                    <p className='font-medium text-gray-800'>Infants</p>
                                                    <p className='text-sm text-gray-500'>Under 2</p>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <button
                                                        type="button"
                                                        className={`w-8 h-8 rounded-full border flex items-center justify-center ${guests.infants <= 0 ? "border-gray-200 text-gray-300" : "border-gray-400 text-gray-700 hover:border-gray-600"}`}
                                                        disabled={guests.infants <= 0}
                                                        onClick={() => updateGuests("infants", "remove")}
                                                    >
                                                        <IoRemove />
                                                    </button>
                                                    <span className='w-6 text-center font-medium'>{guests.infants}</span>
                                                    <button
                                                        type="button"
                                                        className='w-8 h-8 rounded-full border border-gray-400 text-gray-700 flex items-center justify-center hover:border-gray-600'
                                                        onClick={() => updateGuests("infants", "add")}
                                                    >
                                                        <IoAdd />
                                                    </button>
                                                </div>
                                            </div>

                                            <button 
                                                className='w-full mt-4 text-sm font-semibold text-gray-800 underline text-right'
                                                onClick={() => setGuestPopup(false)}
                                            >
                                                Close
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* Date Warning */}
                            {dateWarning && (
                                <div className='mb-4 p-3 bg-red-50 border border-red-200 rounded-lg'>
                                    <p className='text-red-600 text-sm'>{dateWarning}</p>
                                </div>
                            )}

                            {/* Availability Info */}
                            {bookedDates.length > 0 && (
                                <div className='mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg'>
                                    <p className='text-yellow-700 text-sm font-medium'>📅 Some dates unavailable</p>
                                    <p className='text-yellow-600 text-xs mt-1'>This property has existing bookings. Please check date availability.</p>
                                </div>
                            )}

                            {/* Reserve button */}
                            <button
                                className='w-full py-3.5 bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] text-white text-base font-semibold rounded-lg hover:opacity-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed'
                                onClick={() => {
                                    if (!userData) {
                                        toast.info('Please login to book')
                                        navigate('/login')
                                        return
                                    }
                                    if (!checkIn || !checkOut || night <= 0) {
                                        toast.warning('Please select valid dates')
                                        return
                                    }
                                    if (dateWarning) {
                                        toast.error('Selected dates are not available')
                                        return
                                    }
                                    setShowPayment(true)
                                }}
                                disabled={!checkIn || !checkOut || dateWarning !== ""}
                            >
                                {dateWarning ? "Dates Unavailable" : "Reserve"}
                            </button>

                            <p className='text-center text-sm text-gray-500 mt-4'>You won't be charged yet</p>

                            {/* Price Breakdown */}
                            {night > 0 && (
                                <div className='mt-6 space-y-3'>
                                    <div className='flex justify-between text-gray-600'>
                                        <span className='underline'>₹{cardDetails.rent?.toLocaleString()} x {night} nights</span>
                                        <span>₹{(cardDetails.rent * night).toLocaleString()}</span>
                                    </div>
                                    <div className='flex justify-between text-gray-600'>
                                        <span className='underline'>Airbnb service fee</span>
                                        <span>₹{Math.round(cardDetails.rent * 0.07).toLocaleString()}</span>
                                    </div>
                                    <div className='flex justify-between text-gray-600'>
                                        <span className='underline'>Taxes</span>
                                        <span>₹{Math.round(cardDetails.rent * 0.07).toLocaleString()}</span>
                                    </div>
                                    <div className='flex justify-between pt-4 border-t border-gray-200 font-semibold text-gray-800'>
                                        <span>Total</span>
                                        <span>₹{Math.round(total).toLocaleString()}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Modal */}
            <PaymentModal 
                isOpen={showPayment}
                onClose={() => setShowPayment(false)}
                onSuccess={async () => {
                    setShowPayment(false)
                    
                    // Check if listing has a valid MongoDB ObjectId (24 hex chars)
                    const isRealListing = cardDetails?._id && 
                        cardDetails._id.length === 24 && 
                        /^[0-9a-fA-F]{24}$/.test(cardDetails._id)
                    
                    if (isRealListing) {
                        // Real listing - save to database
                        try {
                            await handleBooking(cardDetails._id)
                        } catch (error) {
                            toast.error('Failed to save booking')
                            console.log('Booking error:', error)
                        }
                    } else {
                        // Demo mode
                        toast.success('Booking confirmed! (Demo - not saved to database)')
                        navigate('/')
                    }
                }}
                amount={Math.round(total)}
                propertyName={cardDetails?.title}
                nights={night}
            />
        </div>
    )
}

export default ViewCard
