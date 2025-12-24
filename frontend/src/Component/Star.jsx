import React, { useState } from 'react'
import { FaStar } from "react-icons/fa"

function Star({ starValue = 5, onRate }) {
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)

    return (
        <div className='flex gap-2'>
            {[...Array(starValue)].map((_, index) => {
                const value = index + 1
                const isFilled = value <= (hover || rating)

                return (
                    <button
                        key={value}
                        type="button"
                        className='p-1 transition-transform hover:scale-110 focus:outline-none'
                        onClick={() => {
                            setRating(value)
                            onRate && onRate(value)
                        }}
                        onMouseEnter={() => setHover(value)}
                        onMouseLeave={() => setHover(0)}
                    >
                        <FaStar 
                            className={`w-8 h-8 transition-colors ${
                                isFilled 
                                    ? 'text-yellow-400' 
                                    : 'text-gray-300 hover:text-yellow-200'
                            }`}
                        />
                    </button>
                )
            })}
        </div>
    )
}

export default Star
