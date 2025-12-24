import express from "express"
import isAuth from "../middleware/isAuth.js"
import { cancelBooking, createBooking, getBookedDates, getUserBookings } from "../controllers/booking.controller.js"

let bookingRouter = express.Router()

// Create a new booking
bookingRouter.post("/create/:id", isAuth, createBooking)

// Cancel a booking
bookingRouter.delete("/cancel/:id", isAuth, cancelBooking)

// Get all booked dates for a listing (public - for showing availability)
bookingRouter.get("/booked-dates/:id", getBookedDates)

// Get current user's bookings
bookingRouter.get("/my-bookings", isAuth, getUserBookings)

export default bookingRouter
