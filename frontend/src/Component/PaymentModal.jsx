import React, { useState } from 'react'
import { IoClose, IoCardOutline, IoLockClosed, IoCheckmarkCircle } from 'react-icons/io5'
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaGooglePay, FaApplePay } from 'react-icons/fa'
import { SiPaytm, SiPhonepe } from 'react-icons/si'

function PaymentModal({ isOpen, onClose, onSuccess, amount, propertyName, nights }) {
    const [paymentMethod, setPaymentMethod] = useState('card')
    const [cardNumber, setCardNumber] = useState('')
    const [cardName, setCardName] = useState('')
    const [expiry, setExpiry] = useState('')
    const [cvv, setCvv] = useState('')
    const [upiId, setUpiId] = useState('')
    const [processing, setProcessing] = useState(false)
    const [success, setSuccess] = useState(false)

    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
        const matches = v.match(/\d{4,16}/g)
        const match = matches && matches[0] || ''
        const parts = []
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4))
        }
        return parts.length ? parts.join(' ') : value
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setProcessing(true)
        
        // Simulate payment processing
        setTimeout(() => {
            setProcessing(false)
            setSuccess(true)
            
            // Close after showing success
            setTimeout(() => {
                onSuccess && onSuccess()
                onClose()
            }, 2000)
        }, 2500)
    }

    if (!isOpen) return null

    return (
        <div className='fixed inset-0 z-[9999] flex items-center justify-center p-4'>
            {/* Backdrop */}
            <div className='absolute inset-0 bg-black/60 backdrop-blur-sm' onClick={onClose}></div>
            
            {/* Modal */}
            <div className='relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-fadeIn'>
                {/* Success State */}
                {success ? (
                    <div className='p-8 text-center'>
                        <div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                            <IoCheckmarkCircle className='w-12 h-12 text-green-500' />
                        </div>
                        <h2 className='text-2xl font-bold text-gray-800 mb-2'>Payment Successful!</h2>
                        <p className='text-gray-500 mb-4'>Your booking has been confirmed</p>
                        <p className='text-sm text-gray-400'>Redirecting...</p>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className='flex items-center justify-between p-4 border-b border-gray-200'>
                            <h2 className='text-lg font-semibold'>Complete your booking</h2>
                            <button 
                                onClick={onClose}
                                className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                            >
                                <IoClose className='w-5 h-5' />
                            </button>
                        </div>
                        
                        {/* Order Summary */}
                        <div className='p-4 bg-gray-50 border-b'>
                            <div className='flex justify-between items-center mb-2'>
                                <span className='text-gray-600'>{propertyName}</span>
                                <span className='font-semibold'>₹{amount?.toLocaleString()}</span>
                            </div>
                            <div className='text-sm text-gray-500'>{nights} night{nights > 1 ? 's' : ''} • Includes all taxes</div>
                        </div>

                        {/* Payment Methods */}
                        <div className='p-4'>
                            <p className='text-sm font-medium text-gray-700 mb-3'>Pay with</p>
                            <div className='flex gap-2 mb-4'>
                                <button 
                                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${paymentMethod === 'card' ? 'border-[#FF385C] bg-red-50' : 'border-gray-200'}`}
                                    onClick={() => setPaymentMethod('card')}
                                >
                                    <IoCardOutline className='w-6 h-6 mx-auto text-gray-700' />
                                    <span className='text-xs mt-1 block'>Card</span>
                                </button>
                                <button 
                                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${paymentMethod === 'upi' ? 'border-[#FF385C] bg-red-50' : 'border-gray-200'}`}
                                    onClick={() => setPaymentMethod('upi')}
                                >
                                    <span className='text-lg font-bold text-purple-600'>UPI</span>
                                    <span className='text-xs mt-1 block'>UPI</span>
                                </button>
                                <button 
                                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${paymentMethod === 'wallet' ? 'border-[#FF385C] bg-red-50' : 'border-gray-200'}`}
                                    onClick={() => setPaymentMethod('wallet')}
                                >
                                    <FaGooglePay className='w-6 h-6 mx-auto' />
                                    <span className='text-xs mt-1 block'>Wallet</span>
                                </button>
                            </div>

                            <form onSubmit={handleSubmit}>
                                {paymentMethod === 'card' && (
                                    <div className='space-y-4'>
                                        {/* Card Icons */}
                                        <div className='flex gap-2 mb-2'>
                                            <FaCcVisa className='w-10 h-7 text-blue-600' />
                                            <FaCcMastercard className='w-10 h-7 text-orange-500' />
                                            <FaCcAmex className='w-10 h-7 text-blue-500' />
                                        </div>
                                        
                                        <div>
                                            <label className='block text-sm text-gray-600 mb-1'>Card number</label>
                                            <input 
                                                type='text'
                                                placeholder='1234 5678 9012 3456'
                                                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-800 focus:outline-none'
                                                value={cardNumber}
                                                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                                maxLength={19}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className='block text-sm text-gray-600 mb-1'>Name on card</label>
                                            <input 
                                                type='text'
                                                placeholder='John Doe'
                                                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-800 focus:outline-none'
                                                value={cardName}
                                                onChange={(e) => setCardName(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className='flex gap-4'>
                                            <div className='flex-1'>
                                                <label className='block text-sm text-gray-600 mb-1'>Expiry</label>
                                                <input 
                                                    type='text'
                                                    placeholder='MM/YY'
                                                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-800 focus:outline-none'
                                                    value={expiry}
                                                    onChange={(e) => setExpiry(e.target.value)}
                                                    maxLength={5}
                                                    required
                                                />
                                            </div>
                                            <div className='flex-1'>
                                                <label className='block text-sm text-gray-600 mb-1'>CVV</label>
                                                <input 
                                                    type='password'
                                                    placeholder='•••'
                                                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-800 focus:outline-none'
                                                    value={cvv}
                                                    onChange={(e) => setCvv(e.target.value)}
                                                    maxLength={4}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {paymentMethod === 'upi' && (
                                    <div className='space-y-4'>
                                        <div className='flex gap-3 justify-center mb-4'>
                                            <SiPhonepe className='w-10 h-10 text-purple-600' />
                                            <FaGooglePay className='w-10 h-10' />
                                            <SiPaytm className='w-10 h-10 text-blue-500' />
                                        </div>
                                        <div>
                                            <label className='block text-sm text-gray-600 mb-1'>UPI ID</label>
                                            <input 
                                                type='text'
                                                placeholder='yourname@upi'
                                                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-800 focus:outline-none'
                                                value={upiId}
                                                onChange={(e) => setUpiId(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                )}

                                {paymentMethod === 'wallet' && (
                                    <div className='space-y-3'>
                                        <button type='button' className='w-full flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50'>
                                            <FaGooglePay className='w-8 h-8' />
                                            <span className='font-medium'>Google Pay</span>
                                        </button>
                                        <button type='button' className='w-full flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50'>
                                            <FaApplePay className='w-8 h-8' />
                                            <span className='font-medium'>Apple Pay</span>
                                        </button>
                                        <button type='button' className='w-full flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50'>
                                            <SiPaytm className='w-8 h-8 text-blue-500' />
                                            <span className='font-medium'>Paytm</span>
                                        </button>
                                    </div>
                                )}

                                {/* Security Note */}
                                <div className='flex items-center gap-2 mt-4 text-sm text-gray-500'>
                                    <IoLockClosed className='w-4 h-4' />
                                    <span>Your payment is secured with 256-bit encryption</span>
                                </div>

                                {/* Pay Button */}
                                <button 
                                    type='submit'
                                    disabled={processing}
                                    className='w-full mt-6 py-4 bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] text-white font-semibold rounded-xl hover:opacity-95 transition-all disabled:opacity-70 flex items-center justify-center gap-2'
                                >
                                    {processing ? (
                                        <>
                                            <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                                            Processing...
                                        </>
                                    ) : (
                                        <>Pay ₹{amount?.toLocaleString()}</>
                                    )}
                                </button>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default PaymentModal
