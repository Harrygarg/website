import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IoArrowBack,
  IoCalendarOutline,
  IoTrashOutline,
  IoLocationSharp,
} from "react-icons/io5";
import { userDataContext } from "../Context/UserContext";
import { authDataContext } from "../Context/AuthContext";
import { bookingDataContext } from "../Context/BookingContext";
import Footer from "../Component/Footer";
import axios from "axios";
import { toast } from "react-toastify";

function MyBooking() {
  const navigate = useNavigate();
  const { userData } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  const { cancelBooking } = useContext(bookingDataContext);
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's bookings from API
  useEffect(() => {
    const fetchBookings = async () => {
      if (!userData) {
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(`${serverUrl}/api/booking/my-bookings`, {
          withCredentials: true,
        });
        setMyBookings(res.data || []);
        console.log("My bookings:", res.data);
      } catch (error) {
        console.log("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [userData, serverUrl]);

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;

    try {
      await axios.delete(`${serverUrl}/api/booking/cancel/${bookingId}`, {
        withCredentials: true,
      });
      setMyBookings((prev) => prev.filter((b) => b._id !== bookingId));
      toast.success("Booking cancelled successfully");
    } catch (error) {
      toast.error("Failed to cancel booking");
      console.log(error);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">
            <button
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => navigate("/")}
            >
              <IoArrowBack className="w-5 h-5 text-gray-700" />
            </button>
            <h1 className="text-lg font-semibold text-gray-800">My Bookings</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
            Your trips
          </h2>
          <p className="text-gray-500">
            Manage your upcoming and past reservations
          </p>
        </div>

        {myBookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myBookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-shadow"
              >
                {/* Image */}
                <div className="relative h-48">
                  <img
                    src={
                      booking.listing?.image1 ||
                      "https://via.placeholder.com/400x300?text=No+Image"
                    }
                    alt={booking.listing?.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <button
                      className="p-2 bg-white/90 hover:bg-white rounded-full shadow-md transition-colors"
                      onClick={() => handleCancelBooking(booking._id)}
                      title="Cancel Booking"
                    >
                      <IoTrashOutline className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 text-lg mb-1 line-clamp-1">
                    {booking.listing?.title || "Property"}
                  </h3>
                  <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                    <IoLocationSharp className="w-4 h-4" />
                    <span>
                      {booking.listing?.landMark}, {booking.listing?.city}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Check-in</span>
                      <span className="font-medium text-gray-800">
                        {formatDate(booking.checkIn)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Check-out</span>
                      <span className="font-medium text-gray-800">
                        {formatDate(booking.checkOut)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-100">
                      <span className="text-gray-500">Total Paid</span>
                      <span className="font-semibold text-gray-800">
                        ₹{booking.totalRent?.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`mt-4 py-2 px-3 rounded-lg text-center text-sm font-medium ${
                      booking.status === "booked"
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {booking.status === "booked" ? "✓ Confirmed" : "Cancelled"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-gray-200">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <IoCalendarOutline className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No trips booked...yet!
            </h3>
            <p className="text-gray-500 text-center max-w-md mb-6">
              Time to dust off your bags and start planning your next adventure
            </p>
            <button
              className="px-6 py-3 bg-gradient-to-r from-[#E61E4D] to-[#D70466] text-white font-medium rounded-lg hover:opacity-95 transition-all"
              onClick={() => navigate("/")}
            >
              Start searching
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default MyBooking;
