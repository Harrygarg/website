import userModel from "../model/user.model.js"
import bookingModel from "../model/booking.model.js"
import listingModel from "../model/listing.model.js"

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find().select('-password').populate('listing')
        res.status(200).json({ success: true, users })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

// Get all bookings with user and listing details
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await bookingModel.find()
            .populate({
                path: 'listing',
                select: 'title city rent image1'
            })
            .populate({
                path: 'user',
                select: 'name email'
            })
            .sort({ createdAt: -1 })
        
        res.status(200).json({ success: true, bookings })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

// Get all listings with host details  
export const getAllListings = async (req, res) => {
    try {
        const listings = await listingModel.find()
            .populate({
                path: 'host',
                select: 'name email'
            })
            .sort({ createdAt: -1 })
        
        res.status(200).json({ success: true, listings })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

// Get dashboard stats
export const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await userModel.countDocuments()
        const totalListings = await listingModel.countDocuments()
        const totalBookings = await bookingModel.countDocuments()
        const bookedListings = await listingModel.countDocuments({ isBooked: true })
        
        res.status(200).json({ 
            success: true, 
            stats: {
                totalUsers,
                totalListings,
                totalBookings,
                bookedListings,
                availableListings: totalListings - bookedListings
            }
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
