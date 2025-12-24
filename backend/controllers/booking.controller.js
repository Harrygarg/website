import Booking from "../model/booking.model.js"
import Listing from "../model/listing.model.js"
import User from "../model/user.model.js"

export const createBooking = async (req,res) => {
   try {
    let {id} = req.params
    let {checkIn ,checkOut ,totalRent} = req.body
    
    let listing = await Listing.findById(id)
    if(!listing){
        return res.status(404).json({message:"Listing is not found"})
    }
    
    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)
    
    if (checkInDate >= checkOutDate){
        return res.status(400).json({message:"Invalid checkIn/checkOut date"})
    }

    // Check for date overlap with existing bookings
    const overlappingBooking = await Booking.findOne({
        listing: id,
        status: "booked",
        $or: [
            // New booking starts during existing booking
            { checkIn: { $lte: checkInDate }, checkOut: { $gt: checkInDate } },
            // New booking ends during existing booking
            { checkIn: { $lt: checkOutDate }, checkOut: { $gte: checkOutDate } },
            // New booking completely contains existing booking
            { checkIn: { $gte: checkInDate }, checkOut: { $lte: checkOutDate } }
        ]
    })

    if (overlappingBooking) {
        return res.status(400).json({
            message: `Property already booked from ${overlappingBooking.checkIn.toLocaleDateString()} to ${overlappingBooking.checkOut.toLocaleDateString()}`
        })
    }

    let booking = await Booking.create({
        checkIn: checkInDate,
        checkOut: checkOutDate,
        totalRent,
        host: listing.host,
        guest: req.userId,
        listing: listing._id
    })
    
    await booking.populate("host", "email")
    
    let user = await User.findByIdAndUpdate(req.userId, {
        $push: { booking: booking._id }
    }, { new: true })
    
    if(!user){
        return res.status(404).json({message:"User is not found"})
    }

    return res.status(201).json(booking)

   } catch (error) {
    console.log(error)
    return res.status(500).json({message:`booking error ${error}`})
   }
    
}

export const cancelBooking = async (req,res) => {
    try {
        let {id} = req.params
        
        // Find the booking and update status
        const booking = await Booking.findByIdAndUpdate(id, { status: "cancel" }, { new: true })
        
        if (!booking) {
            return res.status(404).json({message: "Booking not found"})
        }
        
        // Remove booking from user's booking array
        await User.findByIdAndUpdate(booking.guest, {
            $pull: { booking: id }
        })
        
        return res.status(200).json({message: "Booking cancelled successfully"})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "booking cancel error"})
    }
    
}

// Get all booked dates for a specific listing
export const getBookedDates = async (req, res) => {
    try {
        const { id } = req.params
        
        // Find all active bookings for this listing
        const bookings = await Booking.find({
            listing: id,
            status: "booked",
            checkOut: { $gte: new Date() } // Only future/current bookings
        }).select("checkIn checkOut")
        
        // Generate array of all booked dates
        const bookedDates = []
        
        bookings.forEach(booking => {
            const start = new Date(booking.checkIn)
            const end = new Date(booking.checkOut)
            
            // Add each day from checkIn to checkOut-1 (checkout day is available)
            for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
                bookedDates.push(new Date(d).toISOString().split('T')[0])
            }
        })
        
        return res.status(200).json({
            bookedDates: [...new Set(bookedDates)], // Remove duplicates
            bookings: bookings
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error fetching booked dates"})
    }
}

// Get bookings for a user
export const getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({
            guest: req.userId,
            status: "booked"
        })
        .populate("listing", "title city image1 rent landMark")
        .populate("host", "name email")
        .sort({ checkIn: -1 })
        
        return res.status(200).json(bookings)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error fetching bookings"})
    }
}