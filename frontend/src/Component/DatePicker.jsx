import React, { useState } from 'react'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'

function DatePicker({ checkIn, setCheckIn, checkOut, setCheckOut, onClose }) {
    const [calendarMonth, setCalendarMonth] = useState(new Date())
    const [dateType, setDateType] = useState('dates') // dates | months | flexible

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

    const getDaysInMonth = (date) => {
        const year = date.getFullYear()
        const month = date.getMonth()
        const firstDay = new Date(year, month, 1)
        const lastDay = new Date(year, month + 1, 0)
        const days = []
        
        for (let i = 0; i < firstDay.getDay(); i++) {
            days.push(null)
        }
        
        for (let i = 1; i <= lastDay.getDate(); i++) {
            days.push(new Date(year, month, i))
        }
        
        return days
    }

    const formatDate = (date) => {
        if (!date) return ''
        return date.toISOString().split('T')[0]
    }

    const isDateDisabled = (date) => {
        if (!date) return true
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        return date < today
    }

    const isDateSelected = (date) => {
        if (!date) return false
        const dateStr = formatDate(date)
        return dateStr === checkIn || dateStr === checkOut
    }

    const isDateInRange = (date) => {
        if (!date || !checkIn || !checkOut) return false
        const dateStr = formatDate(date)
        return dateStr > checkIn && dateStr < checkOut
    }

    const handleDateClick = (date) => {
        if (!date || isDateDisabled(date)) return
        const dateStr = formatDate(date)
        
        if (!checkIn || (checkIn && checkOut)) {
            setCheckIn(dateStr)
            setCheckOut('')
        } else if (dateStr > checkIn) {
            setCheckOut(dateStr)
        } else {
            setCheckIn(dateStr)
        }
    }

    const nextMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1)

    const clearDates = () => {
        setCheckIn('')
        setCheckOut('')
    }

    return (
        <div className='bg-white rounded-3xl shadow-2xl border border-gray-200 p-6' style={{ width: '850px' }}>
            {/* Tabs */}
            <div className='flex justify-center mb-6'>
                <div className='inline-flex bg-gray-100 rounded-full p-1'>
                    <button 
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${dateType === 'dates' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-600 hover:text-gray-800'}`}
                        onClick={() => setDateType('dates')}
                    >
                        Dates
                    </button>
                    <button 
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${dateType === 'months' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-600 hover:text-gray-800'}`}
                        onClick={() => setDateType('months')}
                    >
                        Months
                    </button>
                    <button 
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${dateType === 'flexible' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-600 hover:text-gray-800'}`}
                        onClick={() => setDateType('flexible')}
                    >
                        Flexible
                    </button>
                </div>
            </div>

            {/* Calendar Navigation */}
            <div className='flex items-center justify-between mb-6 px-4'>
                <button 
                    className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                    onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1))}
                >
                    <IoChevronBack className='w-5 h-5 text-gray-600' />
                </button>
                <div className='flex-1 flex justify-around'>
                    <h3 className='font-semibold text-gray-800 text-center'>
                        {monthNames[calendarMonth.getMonth()]} {calendarMonth.getFullYear()}
                    </h3>
                    <h3 className='font-semibold text-gray-800 text-center'>
                        {monthNames[nextMonth.getMonth()]} {nextMonth.getFullYear()}
                    </h3>
                </div>
                <button 
                    className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                    onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1))}
                >
                    <IoChevronForward className='w-5 h-5 text-gray-600' />
                </button>
            </div>

            {/* Two Month Calendar */}
            <div className='flex gap-12'>
                {/* First Month */}
                <div className='flex-1'>
                    <div className='grid grid-cols-7 mb-2'>
                        {dayNames.map((day, i) => (
                            <div key={i} className='text-center text-xs font-medium text-gray-500 py-2'>{day}</div>
                        ))}
                    </div>
                    <div className='grid grid-cols-7'>
                        {getDaysInMonth(calendarMonth).map((date, i) => (
                            <button 
                                key={i}
                                className={`h-11 w-11 mx-auto rounded-full text-sm font-medium transition-all
                                    ${!date ? 'invisible' : ''}
                                    ${isDateDisabled(date) ? 'text-gray-300 cursor-not-allowed line-through' : 'hover:bg-gray-100 text-gray-800'}
                                    ${isDateSelected(date) ? 'bg-gray-900 text-white hover:bg-gray-900' : ''}
                                    ${isDateInRange(date) ? 'bg-gray-100 rounded-none' : ''}
                                    ${formatDate(date) === checkIn ? 'rounded-l-full' : ''}
                                    ${formatDate(date) === checkOut ? 'rounded-r-full' : ''}
                                `}
                                onClick={() => handleDateClick(date)}
                                disabled={isDateDisabled(date)}
                            >
                                {date?.getDate()}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Second Month */}
                <div className='flex-1'>
                    <div className='grid grid-cols-7 mb-2'>
                        {dayNames.map((day, i) => (
                            <div key={i} className='text-center text-xs font-medium text-gray-500 py-2'>{day}</div>
                        ))}
                    </div>
                    <div className='grid grid-cols-7'>
                        {getDaysInMonth(nextMonth).map((date, i) => (
                            <button 
                                key={i}
                                className={`h-11 w-11 mx-auto rounded-full text-sm font-medium transition-all
                                    ${!date ? 'invisible' : ''}
                                    ${isDateDisabled(date) ? 'text-gray-300 cursor-not-allowed line-through' : 'hover:bg-gray-100 text-gray-800'}
                                    ${isDateSelected(date) ? 'bg-gray-900 text-white hover:bg-gray-900' : ''}
                                    ${isDateInRange(date) ? 'bg-gray-100 rounded-none' : ''}
                                    ${formatDate(date) === checkIn ? 'rounded-l-full' : ''}
                                    ${formatDate(date) === checkOut ? 'rounded-r-full' : ''}
                                `}
                                onClick={() => handleDateClick(date)}
                                disabled={isDateDisabled(date)}
                            >
                                {date?.getDate()}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Flexibility Options */}
            <div className='mt-6 pt-4 border-t border-gray-200 flex items-center gap-2'>
                {['Exact dates', '± 1 day', '± 2 days', '± 3 days', '± 7 days', '± 14 days'].map((option) => (
                    <button 
                        key={option}
                        className='px-4 py-2 border border-gray-300 rounded-full text-sm hover:border-gray-800 transition-colors'
                    >
                        {option}
                    </button>
                ))}
                <div className='flex-1'></div>
                {(checkIn || checkOut) && (
                    <button 
                        className='text-sm font-semibold text-gray-800 underline'
                        onClick={clearDates}
                    >
                        Clear dates
                    </button>
                )}
            </div>
        </div>
    )
}

export default DatePicker
