import express from "express"
import { getAllUsers, getAllBookings, getAllListings, getDashboardStats } from "../controllers/admin.controller.js"
import isAuth from "../middleware/isAuth.js"

const adminRouter = express.Router()

// All routes require authentication
adminRouter.get("/users", isAuth, getAllUsers)
adminRouter.get("/bookings", isAuth, getAllBookings)
adminRouter.get("/listings", isAuth, getAllListings)
adminRouter.get("/stats", isAuth, getDashboardStats)

export default adminRouter
