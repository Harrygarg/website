import React from 'react'
import { IoGlobeOutline } from 'react-icons/io5'
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'
import { useNavigate, Link } from 'react-router-dom'

function Footer() {
  const navigate = useNavigate()

  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Support Column */}
          <div>
            <h4 className="font-semibold text-sm text-gray-800 mb-4">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/help" className="text-sm text-gray-600 hover:underline hover:text-gray-800 transition-colors">
                  Help Centre
                </Link>
              </li>
              <li>
                <Link to="/mybooking" className="text-sm text-gray-600 hover:underline hover:text-gray-800 transition-colors">
                  Get help with a booking
                </Link>
              </li>
              <li>
                <Link to="/safety" className="text-sm text-gray-600 hover:underline hover:text-gray-800 transition-colors">
                  Safety information
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="text-sm text-gray-600 hover:underline hover:text-gray-800 transition-colors">
                  Accessibility support
                </Link>
              </li>
              <li>
                <Link to="/cancellation" className="text-sm text-gray-600 hover:underline hover:text-gray-800 transition-colors">
                  Cancellation options
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-sm text-gray-600 hover:underline hover:text-gray-800 transition-colors">
                  Report a concern
                </Link>
              </li>
            </ul>
          </div>

          {/* Hosting Column */}
          <div>
            <h4 className="font-semibold text-sm text-gray-800 mb-4">Hosting</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/listingpage1" className="text-sm text-gray-600 hover:underline hover:text-gray-800 transition-colors">
                  List your home
                </Link>
              </li>
              <li>
                <Link to="/mylisting" className="text-sm text-gray-600 hover:underline hover:text-gray-800 transition-colors">
                  Manage your listings
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-sm text-gray-600 hover:underline hover:text-gray-800 transition-colors">
                  Host resources
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-sm text-gray-600 hover:underline hover:text-gray-800 transition-colors">
                  Community forum
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-sm text-gray-600 hover:underline hover:text-gray-800 transition-colors">
                  Hosting tips & guides
                </Link>
              </li>
              <li>
                <Link to="/listingpage1" className="text-sm text-gray-600 hover:underline hover:text-gray-800 transition-colors">
                  Start hosting today
                </Link>
              </li>
            </ul>
          </div>

          {/* Airbnb Column */}
          <div>
            <h4 className="font-semibold text-sm text-gray-800 mb-4">Airbnb</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:underline hover:text-gray-800 transition-colors">
                  About us
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:underline hover:text-gray-800 transition-colors">
                  New features
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-sm text-gray-600 hover:underline hover:text-gray-800 transition-colors">
                  Login to account
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-sm text-gray-600 hover:underline hover:text-gray-800 transition-colors">
                  Create an account
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:underline hover:text-gray-800 transition-colors">
                  Gift cards
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Left Side - Links */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-sm text-gray-600">
              <span>© 2024 Airbnb Clone</span>
              <span className="hidden md:inline">·</span>
              <Link to="/privacy" className="hover:underline">Privacy</Link>
              <span>·</span>
              <Link to="/terms" className="hover:underline">Terms</Link>
              <span>·</span>
              <Link to="/sitemap" className="hover:underline">Sitemap</Link>
            </div>

            {/* Right Side - Language & Social */}
            <div className="flex items-center gap-6">
              {/* Language & Currency */}
              <div className="flex items-center gap-4 text-sm text-gray-800">
                <button className="flex items-center gap-2 hover:underline">
                  <IoGlobeOutline className="w-5 h-5" />
                  <span className="font-medium">English (IN)</span>
                </button>
                <button className="font-medium hover:underline">
                  ₹ INR
                </button>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-600 transition-colors">
                  <FaFacebookF className="w-4 h-4" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-600 transition-colors">
                  <FaTwitter className="w-4 h-4" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-600 transition-colors">
                  <FaInstagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
