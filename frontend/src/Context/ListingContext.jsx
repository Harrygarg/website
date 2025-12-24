import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

export const listingDataContext = createContext()

function ListingContext({children}) {
    let navigate = useNavigate() 
    let [title,setTitle] = useState("")
    let [description,setDescription]=useState("")
    let [frontEndImage1,setFrontEndImage1]=useState(null)
    let [frontEndImage2,setFrontEndImage2]=useState(null)
    let [frontEndImage3,setFrontEndImage3]=useState(null)
    let [backEndImage1,setBackEndImage1]=useState(null)
    let [backEndImage2,setBackEndImage2]=useState(null)
    let [backEndImage3,setBackEndImage3]=useState(null)
    let [rent,setRent]=useState("")
    let [city,setCity]=useState("")
    let [landmark,setLandmark]=useState("")
    let [category,setCategory]=useState("")
    let [adding,setAdding]=useState(false)
    let [updating,setUpdating]=useState(false)
    let [deleting,setDeleting]=useState(false)
    let [listingData,setListingData]=useState([])
    let [newListData,setNewListData]=useState([])
    let [cardDetails,setCardDetails]=useState(null)
    let [searchData,setSearchData]=useState([])
    let [unavailableListings, setUnavailableListings] = useState({}) // {listingId: true}

    let {serverUrl} = useContext(authDataContext)

    // Function to check availability for selected dates
    const checkListingsAvailability = async (checkInDate, checkOutDate) => {
        if (!checkInDate || !checkOutDate || !listingData.length) {
            setUnavailableListings({})
            return
        }

        const unavailable = {}
        
        // Check each listing for date conflicts
        for (const listing of listingData) {
            if (listing._id && listing._id.length === 24) {
                try {
                    const res = await axios.get(`${serverUrl}/api/booking/booked-dates/${listing._id}`)
                    const bookedDates = res.data.bookedDates || []
                    
                    // Check if any selected date overlaps
                    const inDate = new Date(checkInDate)
                    const outDate = new Date(checkOutDate)
                    
                    for (let d = new Date(inDate); d < outDate; d.setDate(d.getDate() + 1)) {
                        const dateStr = d.toISOString().split('T')[0]
                        if (bookedDates.includes(dateStr)) {
                            unavailable[listing._id] = true
                            break
                        }
                    }
                } catch (error) {
                    // Ignore errors for individual listings
                }
            }
        }
        
        setUnavailableListings(unavailable)
        console.log('Unavailable listings:', unavailable)
    }

    

     const handleAddListing = async () => {
        setAdding(true)
        try {

            let formData = new FormData()
     formData.append("title",title)
     formData.append("image1",backEndImage1)
     formData.append("image2",backEndImage2)
     formData.append("image3",backEndImage3)
     formData.append("description",description)
     formData.append("rent",rent)
     formData.append("city",city)
     formData.append("landMark",landmark)
     formData.append("category",category)
        
        let result = await axios.post( serverUrl + "/api/listing/add" ,formData, {withCredentials:true}  )
        setAdding(false)
        console.log(result)
        navigate("/")
        toast.success("AddListing Successfully")
        setTitle("")
        setDescription("")
       setFrontEndImage1(null)
       setFrontEndImage2(null)
       setFrontEndImage3(null)
       setBackEndImage1(null)
       setBackEndImage2(null)
       setBackEndImage3(null)
       setRent("")
       setCity("")
       setLandmark("")
       setCategory("")
            
        } catch (error) {
            setAdding(false)
            console.log(error)
            toast.error(error.response.data.message)
        }
        
     }
     const handleViewCard = async (id) => {
        try {
            let result = await axios.get( serverUrl + `/api/listing/findlistingByid/${id}`,{withCredentials:true})
            console.log(result.data)
            setCardDetails(result.data)
            navigate("/viewcard")
        } catch (error) {
            console.log(error)
            // Fallback: find listing from local data (sample listings)
            const localListing = listingData.find(l => l._id === id || l._id?.toString() === id)
            if (localListing) {
                setCardDetails(localListing)
                navigate("/viewcard")
            }
        }
        
     }
     const handleSearch = async (data) => {
        try {
            let result = await axios.get(serverUrl + `/api/listing/search?query=${data}`)
            setSearchData(result.data)
        } catch (error) {
            setSearchData(null)
            console.log(error)
            
        }
        
     }

// Sample listings for fallback when database is empty
const sampleListings = [
  { _id: '1', title: 'Beachfront Villa Calangute', description: 'Stunning beachfront villa with private pool', image1: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80', image2: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80', image3: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80', rent: 15000, city: 'Goa', landMark: 'Calangute Beach', category: 'villa', ratings: 4.95, isBooked: false },
  { _id: '2', title: 'Luxury Sea View Apartment', description: 'Modern 2BHK with stunning sea views', image1: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80', image2: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80', image3: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80', rent: 8500, city: 'Mumbai', landMark: 'Marine Drive', category: 'flat', ratings: 4.8, isBooked: false },
  { _id: '3', title: 'Mountain View Cabin', description: 'Cozy cabin with Himalayan views', image1: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&q=80', image2: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80', image3: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80', rent: 6500, city: 'Manali', landMark: 'Old Manali', category: 'cabin', ratings: 4.9, isBooked: false },
  { _id: '4', title: 'Tropical Pool House', description: 'Beautiful pool house with tropical gardens', image1: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', image2: 'https://images.unsplash.com/photo-1575517111478-7f6afd0973db?w=800&q=80', image3: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80', rent: 12000, city: 'Goa', landMark: 'Anjuna Beach', category: 'poolHouse', ratings: 4.7, isBooked: false },
  { _id: '5', title: 'Heritage Haveli Suite', description: 'Experience royal Rajasthani hospitality', image1: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80', image2: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80', image3: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80', rent: 7800, city: 'Jaipur', landMark: 'City Palace', category: 'rooms', ratings: 4.85, isBooked: false },
  { _id: '6', title: 'Organic Farm Stay', description: 'Experience farm life with organic vegetables', image1: 'https://images.unsplash.com/photo-1500076656116-558758c991c1?w=800&q=80', image2: 'https://images.unsplash.com/photo-1523554888454-84137e72c3ce?w=800&q=80', image3: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80', rent: 6000, city: 'Pune', landMark: 'Mulshi', category: 'farmHouse', ratings: 4.7, isBooked: false },
  { _id: '7', title: 'Modern Flat South Delhi', description: 'Spacious 3BHK in upscale South Delhi', image1: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80', image2: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80', image3: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80', rent: 9500, city: 'Delhi', landMark: 'Hauz Khas', category: 'flat', ratings: 4.5, isBooked: false },
  { _id: '8', title: 'Infinity Pool Villa', description: 'Stunning property with infinity pool', image1: 'https://images.unsplash.com/photo-1575517111478-7f6afd0973db?w=800&q=80', image2: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80', image3: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', rent: 18000, city: 'Goa', landMark: 'Candolim Beach', category: 'poolHouse', ratings: 4.9, isBooked: false },
  { _id: '9', title: 'Coffee Estate Stay', description: 'Beautiful farmhouse in coffee plantations', image1: 'https://images.unsplash.com/photo-1500076656116-558758c991c1?w=800&q=80', image2: 'https://images.unsplash.com/photo-1523554888454-84137e72c3ce?w=800&q=80', image3: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80', rent: 7000, city: 'Chikmagalur', landMark: 'Coffee Estate', category: 'farmHouse', ratings: 4.85, isBooked: false },
  { _id: '10', title: 'Pine Forest Cabin', description: 'Secluded cabin in pine forests', image1: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80', image2: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&q=80', image3: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80', rent: 3500, city: 'Manali', landMark: 'Kasol', category: 'cabin', ratings: 4.8, isBooked: false },
  { _id: '11', title: 'Garden Villa Koramangala', description: 'Beautiful villa with lush garden', image1: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', image2: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', image3: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', rent: 18000, city: 'Bangalore', landMark: 'Koramangala', category: 'villa', ratings: 4.85, isBooked: false },
  { _id: '12', title: 'Lake View Room Udaipur', description: 'Romantic room overlooking Lake Pichola', image1: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80', image2: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80', image3: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80', rent: 5500, city: 'Udaipur', landMark: 'Lake Pichola', category: 'rooms', ratings: 4.8, isBooked: false },
]

     const getListing = async () => {
        try {
            console.log('Fetching listings from:', serverUrl + "/api/listing/get")
            let result = await axios.get( serverUrl + "/api/listing/get",{withCredentials:true})
            console.log('API Response:', result.data?.length, 'listings')
            if (result.data && result.data.length > 0) {
                console.log('Using database listings')
                setListingData(result.data)
                setNewListData(result.data)
            } else {
                // Use sample listings if database is empty
                console.log('Database empty, using sample listings')
                setListingData(sampleListings)
                setNewListData(sampleListings)
            }
        } catch (error) {
            console.log('API Error:', error.message)
            // Use sample listings on error (e.g., no backend)
            setListingData(sampleListings)
            setNewListData(sampleListings)
        }
        
     }

    useEffect(()=>{
     getListing()
    },[adding,updating,deleting])



    let value={
        title,setTitle,
        description,setDescription,
        frontEndImage1,setFrontEndImage1,
        frontEndImage2,setFrontEndImage2,
        frontEndImage3,setFrontEndImage3,
        backEndImage1,setBackEndImage1,
        backEndImage2,setBackEndImage2,
        backEndImage3,setBackEndImage3,
        rent,setRent,
        city,setCity,
        landmark,setLandmark,
        category,setCategory,
        handleAddListing,
        setAdding,adding,
        listingData,setListingData,
        getListing,
        newListData,setNewListData,
        handleViewCard,
        cardDetails,setCardDetails,
        updating,setUpdating,
        deleting,setDeleting,handleSearch,searchData,setSearchData,
        unavailableListings, checkListingsAvailability
       

    }
  return (
    <div>
        <listingDataContext.Provider value={value}>
            {children}
        </listingDataContext.Provider>
      
    </div>
  )
}

export default ListingContext
