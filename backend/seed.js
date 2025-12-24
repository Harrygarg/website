import mongoose from "mongoose";
import dotenv from "dotenv";
import Listing from "./model/listing.model.js";
import User from "./model/user.model.js";
import bcrypt from "bcryptjs";

dotenv.config();

// Extensive sample listings data - 50+ listings across categories
const sampleListings = [
  // ========== VILLAS (10+) ==========
  {
    title: "Beachfront Villa Calangute",
    description: "Wake up to the sound of waves in this stunning beachfront villa. Features 3 bedrooms, private pool, outdoor dining, and direct beach access. Perfect for family vacations and group getaways.",
    image1: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
    rent: 15000, city: "Goa", landMark: "Calangute Beach", category: "villa", ratings: 4.95
  },
  {
    title: "Garden Villa Koramangala",
    description: "Beautiful villa with lush garden in Koramangala. Features 4 bedrooms, modern kitchen, and outdoor BBQ area. Perfect for large families.",
    image1: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    rent: 18000, city: "Bangalore", landMark: "Koramangala", category: "villa", ratings: 4.85
  },
  {
    title: "Hilltop Bungalow Lavasa",
    description: "Stunning hilltop bungalow overlooking Lavasa lake. Features panoramic views, fireplace, and private garden.",
    image1: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
    rent: 11000, city: "Pune", landMark: "Lavasa", category: "villa", ratings: 4.75
  },
  {
    title: "Luxury Villa Juhu",
    description: "Premium 5-bedroom villa near Juhu Beach with private pool, home theater, and stunning sea views.",
    image1: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    rent: 35000, city: "Mumbai", landMark: "Juhu Beach", category: "villa", ratings: 4.9
  },
  {
    title: "Heritage Villa Jaipur",
    description: "Traditional Rajasthani villa with modern amenities. Features courtyard, rooftop restaurant, and royal decor.",
    image1: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
    rent: 14000, city: "Jaipur", landMark: "City Palace", category: "villa", ratings: 4.8
  },
  {
    title: "Cliffside Villa Anjuna",
    description: "Spectacular villa perched on Anjuna cliffs with infinity pool and panoramic ocean views.",
    image1: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    rent: 22000, city: "Goa", landMark: "Anjuna Beach", category: "villa", ratings: 4.92
  },
  {
    title: "Villa with Private Beach",
    description: "Exclusive villa with private beach access in South Goa. Perfect for privacy seekers.",
    image1: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
    rent: 28000, city: "Goa", landMark: "Palolem Beach", category: "villa", ratings: 4.88
  },
  {
    title: "Modern Villa Whitefield",
    description: "Contemporary 4BHK villa in Whitefield with smart home features and landscaped gardens.",
    image1: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    rent: 16000, city: "Bangalore", landMark: "Whitefield", category: "villa", ratings: 4.7
  },
  {
    title: "Villa Greenwoods Lonavala",
    description: "Peaceful villa surrounded by mountains and greenery. Perfect for weekend getaways from Mumbai/Pune.",
    image1: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
    rent: 12000, city: "Pune", landMark: "Lonavala", category: "villa", ratings: 4.65
  },
  {
    title: "Poolside Villa Indiranagar",
    description: "Stylish villa with private pool in the heart of Indiranagar. Walking distance to cafes and pubs.",
    image1: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    rent: 20000, city: "Bangalore", landMark: "Indiranagar", category: "villa", ratings: 4.78
  },

  // ========== APARTMENTS/FLATS (10+) ==========
  {
    title: "Luxury Sea View Apartment",
    description: "Experience stunning sea views from this modern 2BHK apartment in Mumbai.",
    image1: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    rent: 8500, city: "Mumbai", landMark: "Marine Drive", category: "flat", ratings: 4.8
  },
  {
    title: "Designer Loft Powai",
    description: "A beautiful designer loft near Powai Lake. Features floor-to-ceiling windows and rooftop garden.",
    image1: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    rent: 7200, city: "Mumbai", landMark: "Powai Lake", category: "flat", ratings: 4.9
  },
  {
    title: "Modern Flat South Delhi",
    description: "Spacious 3BHK apartment in upscale South Delhi. Close to Hauz Khas Village.",
    image1: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80",
    rent: 9500, city: "Delhi", landMark: "Hauz Khas", category: "flat", ratings: 4.5
  },
  {
    title: "Tech Park Studio Whitefield",
    description: "Modern studio perfect for business travelers. Walking distance to IT parks.",
    image1: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    rent: 4800, city: "Bangalore", landMark: "Whitefield", category: "flat", ratings: 4.3
  },
  {
    title: "Modern Flat Viman Nagar",
    description: "Contemporary 2BHK near Pune airport. Walking distance to Phoenix Mall.",
    image1: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
    rent: 5200, city: "Pune", landMark: "Viman Nagar", category: "flat", ratings: 4.55
  },
  {
    title: "Pink City Apartment",
    description: "Modern apartment with traditional Rajasthani decor. Rooftop terrace with Hawa Mahal views.",
    image1: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
    rent: 4500, city: "Jaipur", landMark: "Hawa Mahal", category: "flat", ratings: 4.6
  },
  {
    title: "Cozy Studio in Bandra",
    description: "Charming studio apartment in the heart of Bandra. Walk to cafes and Bandstand.",
    image1: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
    rent: 5500, city: "Mumbai", landMark: "Bandra West", category: "flat", ratings: 4.6
  },
  {
    title: "Skyline Apartment Worli",
    description: "Premium high-rise apartment with breathtaking city skyline views.",
    image1: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    rent: 12000, city: "Mumbai", landMark: "Worli Sea Link", category: "flat", ratings: 4.85
  },
  {
    title: "Garden View Flat Koregaon",
    description: "Peaceful 2BHK with garden views in upscale Koregaon Park.",
    image1: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
    rent: 6000, city: "Pune", landMark: "Koregaon Park", category: "flat", ratings: 4.5
  },
  {
    title: "Central Delhi Apartment",
    description: "Well-connected 2BHK in Connaught Place area. Perfect for tourists.",
    image1: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
    rent: 7500, city: "Delhi", landMark: "Connaught Place", category: "flat", ratings: 4.4
  },
  {
    title: "HSR Layout Studio",
    description: "Modern studio apartment in tech hub HSR Layout with all amenities.",
    image1: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    rent: 4200, city: "Bangalore", landMark: "HSR Layout", category: "flat", ratings: 4.35
  },

  // ========== POOL HOUSES (10+) ==========
  {
    title: "Tropical Pool House Anjuna",
    description: "Beautiful pool house surrounded by tropical gardens. Walk to famous Anjuna Beach.",
    image1: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1575517111478-7f6afd0973db?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
    rent: 12000, city: "Goa", landMark: "Anjuna Beach", category: "poolHouse", ratings: 4.7
  },
  {
    title: "Infinity Pool Villa Candolim",
    description: "Stunning property with infinity pool overlooking the Arabian Sea.",
    image1: "https://images.unsplash.com/photo-1575517111478-7f6afd0973db?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    rent: 18000, city: "Goa", landMark: "Candolim Beach", category: "poolHouse", ratings: 4.9
  },
  {
    title: "Pool House with Garden",
    description: "Spacious pool house with beautiful landscaped gardens in Vagator.",
    image1: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1575517111478-7f6afd0973db?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
    rent: 14000, city: "Goa", landMark: "Vagator", category: "poolHouse", ratings: 4.6
  },
  {
    title: "Modern Pool House Bangalore",
    description: "Contemporary pool house in serene Electronic City area.",
    image1: "https://images.unsplash.com/photo-1575517111478-7f6afd0973db?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    rent: 15000, city: "Bangalore", landMark: "Electronic City", category: "poolHouse", ratings: 4.5
  },
  {
    title: "Luxury Pool Retreat Alibaug",
    description: "Premium pool property near Alibaug beach. Perfect weekend getaway from Mumbai.",
    image1: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1575517111478-7f6afd0973db?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
    rent: 20000, city: "Mumbai", landMark: "Alibaug", category: "poolHouse", ratings: 4.8
  },
  {
    title: "Rooftop Pool Penthouse",
    description: "Exclusive penthouse with private rooftop pool and city views.",
    image1: "https://images.unsplash.com/photo-1575517111478-7f6afd0973db?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    rent: 25000, city: "Mumbai", landMark: "Lower Parel", category: "poolHouse", ratings: 4.95
  },
  {
    title: "Pool Cottage Morjim",
    description: "Charming cottage with plunge pool near quiet Morjim beach.",
    image1: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1575517111478-7f6afd0973db?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
    rent: 9000, city: "Goa", landMark: "Morjim Beach", category: "poolHouse", ratings: 4.55
  },
  {
    title: "Farmhouse with Pool",
    description: "Rustic farmhouse with large pool near Pune-Mumbai Expressway.",
    image1: "https://images.unsplash.com/photo-1575517111478-7f6afd0973db?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    rent: 16000, city: "Pune", landMark: "Khandala", category: "poolHouse", ratings: 4.65
  },
  {
    title: "Pool House JP Nagar",
    description: "Family-friendly pool house in peaceful JP Nagar locality.",
    image1: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1575517111478-7f6afd0973db?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
    rent: 11000, city: "Bangalore", landMark: "JP Nagar", category: "poolHouse", ratings: 4.4
  },
  {
    title: "Beach Pool Villa Arpora",
    description: "Beautiful villa with beach-side pool near Arpora night market.",
    image1: "https://images.unsplash.com/photo-1575517111478-7f6afd0973db?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    rent: 17000, city: "Goa", landMark: "Arpora", category: "poolHouse", ratings: 4.75
  },

  // ========== CABINS (10+) ==========
  {
    title: "Mountain View Cabin",
    description: "Cozy wooden cabin with breathtaking Himalayan views in Old Manali.",
    image1: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80",
    rent: 6500, city: "Manali", landMark: "Old Manali", category: "cabin", ratings: 4.9
  },
  {
    title: "Riverside Cottage Solang",
    description: "Beautiful cottage by the Beas river. Close to Solang Valley ski slopes.",
    image1: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80",
    rent: 4200, city: "Manali", landMark: "Solang Valley", category: "cabin", ratings: 4.7
  },
  {
    title: "Bohemian Cottage Vagator",
    description: "Escape to this charming bohemian cottage near Chapora Fort.",
    image1: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80",
    rent: 4500, city: "Goa", landMark: "Vagator Cliffs", category: "cabin", ratings: 4.65
  },
  {
    title: "Pine Forest Cabin",
    description: "Secluded cabin surrounded by pine forests in Kasol.",
    image1: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80",
    rent: 3500, city: "Manali", landMark: "Kasol", category: "cabin", ratings: 4.8
  },
  {
    title: "Treehouse Cabin Wayanad",
    description: "Unique treehouse experience in the heart of Wayanad wildlife.",
    image1: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80",
    rent: 5500, city: "Wayanad", landMark: "Wayanad Forest", category: "cabin", ratings: 4.85
  },
  {
    title: "Snowfall View Cabin",
    description: "Experience snowfall from this cozy cabin with fireplace.",
    image1: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80",
    rent: 7000, city: "Manali", landMark: "Rohtang Road", category: "cabin", ratings: 4.75
  },
  {
    title: "Eco Cabin Coorg",
    description: "Sustainable eco-cabin amidst coffee plantations.",
    image1: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80",
    rent: 4800, city: "Coorg", landMark: "Madikeri", category: "cabin", ratings: 4.6
  },
  {
    title: "Lakeside Cabin Nainital",
    description: "Charming cabin with Naini Lake views and mountain backdrop.",
    image1: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80",
    rent: 5000, city: "Nainital", landMark: "Mall Road", category: "cabin", ratings: 4.5
  },
  {
    title: "Himalayan Retreat Cabin",
    description: "Peaceful retreat cabin with yoga deck and mountain views.",
    image1: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80",
    rent: 5500, city: "Rishikesh", landMark: "Laxman Jhula", category: "cabin", ratings: 4.7
  },
  {
    title: "Artist Cabin Dharamshala",
    description: "Creative space with inspiring mountain views in Dharamshala.",
    image1: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80",
    rent: 4000, city: "Dharamshala", landMark: "McLeodganj", category: "cabin", ratings: 4.55
  },

  // ========== ROOMS (10+) ==========
  {
    title: "Heritage Haveli Room",
    description: "Experience old Delhi charm in this restored haveli. Rooftop breakfast included.",
    image1: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80",
    rent: 3500, city: "Delhi", landMark: "Chandni Chowk", category: "rooms", ratings: 4.4
  },
  {
    title: "Royal Haveli Suite",
    description: "Experience royal Rajasthani hospitality in this heritage haveli.",
    image1: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80",
    rent: 7800, city: "Jaipur", landMark: "City Palace", category: "rooms", ratings: 4.85
  },
  {
    title: "Cozy Room Bandra",
    description: "Private room in shared apartment, great for solo travelers.",
    image1: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80",
    rent: 2500, city: "Mumbai", landMark: "Bandra", category: "rooms", ratings: 4.3
  },
  {
    title: "Artist Studio Room",
    description: "Creative space in artist collective with shared amenities.",
    image1: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80",
    rent: 2000, city: "Pune", landMark: "FC Road", category: "rooms", ratings: 4.2
  },
  {
    title: "Backpacker Room Goa",
    description: "Budget-friendly room near Arambol beach. Great for backpackers.",
    image1: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80",
    rent: 1500, city: "Goa", landMark: "Arambol", category: "rooms", ratings: 4.0
  },
  {
    title: "Garden Room Bangalore",
    description: "Peaceful room with garden access in central Bangalore.",
    image1: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80",
    rent: 3000, city: "Bangalore", landMark: "MG Road", category: "rooms", ratings: 4.4
  },
  {
    title: "Rooftop Room Delhi",
    description: "Unique rooftop room with terrace and Delhi skyline views.",
    image1: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80",
    rent: 4000, city: "Delhi", landMark: "Saket", category: "rooms", ratings: 4.5
  },
  {
    title: "Lake View Room Udaipur",
    description: "Romantic room overlooking Lake Pichola in the city of lakes.",
    image1: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80",
    rent: 5500, city: "Udaipur", landMark: "Lake Pichola", category: "rooms", ratings: 4.8
  },
  {
    title: "Boutique Room Pondicherry",
    description: "French-colonial style room in White Town area.",
    image1: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80",
    rent: 3500, city: "Pondicherry", landMark: "White Town", category: "rooms", ratings: 4.6
  },
  {
    title: "Hilltop Room Shimla",
    description: "Cozy room with valley views on Shimla hilltop.",
    image1: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&q=80",
    rent: 2800, city: "Shimla", landMark: "Mall Road", category: "rooms", ratings: 4.3
  },

  // ========== FARM HOUSES (10+) ==========
  {
    title: "Organic Farm Stay Pune",
    description: "Experience farm life with organic vegetables and fresh milk.",
    image1: "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1523554888454-84137e72c3ce?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    rent: 6000, city: "Pune", landMark: "Mulshi", category: "farmHouse", ratings: 4.7
  },
  {
    title: "Mango Farm Retreat",
    description: "Stay amidst mango orchards with farm-to-table meals.",
    image1: "https://images.unsplash.com/photo-1523554888454-84137e72c3ce?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    rent: 5500, city: "Ratnagiri", landMark: "Konkan", category: "farmHouse", ratings: 4.6
  },
  {
    title: "Coffee Estate Stay",
    description: "Beautiful farmhouse in coffee plantations of Chikmagalur.",
    image1: "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1523554888454-84137e72c3ce?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    rent: 7000, city: "Chikmagalur", landMark: "Coffee Estate", category: "farmHouse", ratings: 4.85
  },
  {
    title: "Vineyard Farm Stay",
    description: "Experience wine country at this Nashik vineyard farm.",
    image1: "https://images.unsplash.com/photo-1523554888454-84137e72c3ce?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    rent: 8500, city: "Nashik", landMark: "Sula Vineyards", category: "farmHouse", ratings: 4.9
  },
  {
    title: "Rural Farm Experience",
    description: "Authentic village life experience with traditional food.",
    image1: "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1523554888454-84137e72c3ce?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    rent: 3500, city: "Mysore", landMark: "Countryside", category: "farmHouse", ratings: 4.4
  },
  {
    title: "Tea Garden Farmhouse",
    description: "Stay in a working tea garden in the Nilgiris.",
    image1: "https://images.unsplash.com/photo-1523554888454-84137e72c3ce?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    rent: 6500, city: "Ooty", landMark: "Tea Gardens", category: "farmHouse", ratings: 4.75
  },
  {
    title: "Coconut Grove Farm",
    description: "Tranquil farmhouse surrounded by coconut groves in Kerala.",
    image1: "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1523554888454-84137e72c3ce?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    rent: 5000, city: "Alleppey", landMark: "Backwaters", category: "farmHouse", ratings: 4.6
  },
  {
    title: "Dairy Farm Stay",
    description: "Experience dairy farming with fresh milk and butter making.",
    image1: "https://images.unsplash.com/photo-1523554888454-84137e72c3ce?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    rent: 4000, city: "Anand", landMark: "Gujarat", category: "farmHouse", ratings: 4.3
  },
  {
    title: "Spice Farm Retreat",
    description: "Stay amidst cardamom and pepper plantations in Munnar.",
    image1: "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1523554888454-84137e72c3ce?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    rent: 5500, city: "Munnar", landMark: "Spice Gardens", category: "farmHouse", ratings: 4.7
  },
  {
    title: "Strawberry Farm Stay",
    description: "Pick fresh strawberries at this Mahabaleshwar farm.",
    image1: "https://images.unsplash.com/photo-1523554888454-84137e72c3ce?w=800&q=80",
    image2: "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=800&q=80",
    image3: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    rent: 4500, city: "Mahabaleshwar", landMark: "Strawberry Farms", category: "farmHouse", ratings: 4.5
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");

    // Create a demo host user first
    const existingUser = await User.findOne({ email: "host@airbnb.com" });
    let hostUser;
    
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash("host123", 10);
      hostUser = await User.create({
        name: "Demo Host",
        email: "host@airbnb.com",
        password: hashedPassword
      });
      console.log("Created demo host user");
    } else {
      hostUser = existingUser;
      console.log("Using existing demo host user");
    }

    // Add sample listings
    const listingsWithHost = sampleListings.map(listing => ({
      ...listing,
      host: hostUser._id
    }));

    const createdListings = await Listing.insertMany(listingsWithHost);
    console.log(`Successfully added ${createdListings.length} sample listings!`);

    // Update host user with listings
    await User.findByIdAndUpdate(hostUser._id, {
      $push: { listing: { $each: createdListings.map(l => l._id) } }
    });

    console.log("\n=== Seeding Complete ===");
    console.log(`Host Email: host@airbnb.com`);
    console.log(`Host Password: host123`);
    console.log(`Total Listings: ${createdListings.length}`);
    console.log("\nCategories:");
    console.log("- Villas: 10");
    console.log("- Apartments: 11");
    console.log("- Pool Houses: 10");
    console.log("- Cabins: 10");
    console.log("- Rooms: 10");
    console.log("- Farm Houses: 10");
    
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
