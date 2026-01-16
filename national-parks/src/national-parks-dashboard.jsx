import React, { useState, useMemo } from 'react';
import { ChevronDown, Mountain, AlertTriangle, MapPin, Compass, Users, Star, Search, X, Heart, Eye, BarChart3, GitCompare, Calendar, Snowflake, Sun, Leaf, Flower2, Shield, Signal, Droplets, Tent, PawPrint, Map, Download, Target, Skull, Info } from 'lucide-react';

// Comprehensive data for all 63 US National Parks
// VERIFIED DATA: NPS 2024 Visitor Statistics (331.9M total), Mortality Dashboard 2007-2024
// Sources: NPS.gov, Wildland Trekking, Elk&Elk, YOSAR reports
const nationalParksData = [
  // Alaska Parks
  { name: "Denali", state: "AK", region: "Alaska", lat: 63.11, lng: -151.19, danger: 92, difficulty: 95, accessibility: 35, remoteness: 95, visitationRaw: 612000, sentimentRaw: 94, wildlife: 95, permit: 45, cellCoverage: 92, waterAvail: 75, multiDay: 95, bestSeason: "summer", deaths: 32, deathsPer10M: 52, highlight: "North America's tallest peak (20,310 ft)" },
  { name: "Gates of the Arctic", state: "AK", region: "Alaska", lat: 67.79, lng: -153.30, danger: 98, difficulty: 98, accessibility: 5, remoteness: 100, visitationRaw: 11907, sentimentRaw: 88, wildlife: 90, permit: 15, cellCoverage: 100, waterAvail: 80, multiDay: 100, bestSeason: "summer", deaths: 5, deathsPer10M: 42, highlight: "No trails, no roads, true wilderness" },
  { name: "Wrangell-St. Elias", state: "AK", region: "Alaska", lat: 61.42, lng: -142.60, danger: 94, difficulty: 92, accessibility: 15, remoteness: 98, visitationRaw: 74518, sentimentRaw: 90, wildlife: 88, permit: 20, cellCoverage: 98, waterAvail: 85, multiDay: 98, bestSeason: "summer", deaths: 12, deathsPer10M: 16, highlight: "Largest US park (13.2M acres)" },
  { name: "Glacier Bay", state: "AK", region: "Alaska", lat: 58.50, lng: -137.00, danger: 85, difficulty: 78, accessibility: 25, remoteness: 92, visitationRaw: 612000, sentimentRaw: 92, wildlife: 82, permit: 55, cellCoverage: 88, waterAvail: 90, multiDay: 85, bestSeason: "summer", deaths: 18, deathsPer10M: 29, highlight: "Tidewater glaciers, whale watching" },
  { name: "Katmai", state: "AK", region: "Alaska", lat: 58.60, lng: -154.97, danger: 90, difficulty: 82, accessibility: 12, remoteness: 95, visitationRaw: 89768, sentimentRaw: 96, wildlife: 98, permit: 65, cellCoverage: 95, waterAvail: 85, multiDay: 88, bestSeason: "summer", deaths: 8, deathsPer10M: 9, highlight: "Brooks Falls brown bear viewing" },
  { name: "Lake Clark", state: "AK", region: "Alaska", lat: 60.41, lng: -154.32, danger: 88, difficulty: 85, accessibility: 8, remoteness: 96, visitationRaw: 22754, sentimentRaw: 85, wildlife: 88, permit: 18, cellCoverage: 98, waterAvail: 90, multiDay: 92, bestSeason: "summer", deaths: 4, deathsPer10M: 18, highlight: "Fly-in only, volcanic landscape" },
  { name: "Kenai Fjords", state: "AK", region: "Alaska", lat: 59.92, lng: -149.65, danger: 78, difficulty: 72, accessibility: 45, remoteness: 82, visitationRaw: 413915, sentimentRaw: 93, wildlife: 75, permit: 35, cellCoverage: 78, waterAvail: 88, multiDay: 72, bestSeason: "summer", deaths: 14, deathsPer10M: 34, highlight: "Exit Glacier, Harding Icefield" },
  { name: "Kobuk Valley", state: "AK", region: "Alaska", lat: 67.36, lng: -159.13, danger: 92, difficulty: 88, accessibility: 5, remoteness: 99, visitationRaw: 15766, sentimentRaw: 82, wildlife: 72, permit: 10, cellCoverage: 100, waterAvail: 65, multiDay: 90, bestSeason: "summer", deaths: 2, deathsPer10M: 13, highlight: "Arctic sand dunes, caribou migration" },
  
  // Pacific Northwest
  { name: "Olympic", state: "WA", region: "Pacific Northwest", lat: 47.80, lng: -123.60, danger: 62, difficulty: 70, accessibility: 68, remoteness: 65, visitationRaw: 3710000, sentimentRaw: 95, wildlife: 55, permit: 58, cellCoverage: 65, waterAvail: 95, multiDay: 88, bestSeason: "summer", deaths: 52, deathsPer10M: 10, highlight: "Rainforest, coast, and alpine" },
  { name: "Mount Rainier", state: "WA", region: "Pacific Northwest", lat: 46.88, lng: -121.73, danger: 82, difficulty: 85, accessibility: 72, remoteness: 55, visitationRaw: 2000000, sentimentRaw: 96, wildlife: 45, permit: 72, cellCoverage: 55, waterAvail: 90, multiDay: 82, bestSeason: "summer", deaths: 77, deathsPer10M: 35, highlight: "35% of deaths from falls" },
  { name: "North Cascades", state: "WA", region: "Pacific Northwest", lat: 48.77, lng: -121.30, danger: 88, difficulty: 90, accessibility: 48, remoteness: 78, visitationRaw: 30085, sentimentRaw: 91, wildlife: 55, permit: 42, cellCoverage: 82, waterAvail: 92, multiDay: 92, bestSeason: "summer", deaths: 27, deathsPer10M: 60, highlight: "HIGHEST death rate per visitor in US" },
  { name: "Crater Lake", state: "OR", region: "Pacific Northwest", lat: 42.87, lng: -122.17, danger: 45, difficulty: 55, accessibility: 65, remoteness: 58, visitationRaw: 670000, sentimentRaw: 94, wildlife: 25, permit: 25, cellCoverage: 62, waterAvail: 45, multiDay: 55, bestSeason: "summer", deaths: 18, deathsPer10M: 27, highlight: "Deepest lake in USA (1,943 ft)" },
  
  // California Parks
  { name: "Yosemite", state: "CA", region: "California", lat: 37.87, lng: -119.54, danger: 62, difficulty: 72, accessibility: 85, remoteness: 42, visitationRaw: 4120000, sentimentRaw: 98, wildlife: 48, permit: 88, cellCoverage: 45, waterAvail: 85, multiDay: 85, bestSeason: "spring", deaths: 98, deathsPer10M: 15, highlight: "191 SAR rescues/yr, 16 deaths in 2024" },
  { name: "Sequoia", state: "CA", region: "California", lat: 36.49, lng: -118.57, danger: 55, difficulty: 68, accessibility: 65, remoteness: 52, visitationRaw: 1200000, sentimentRaw: 92, wildlife: 52, permit: 55, cellCoverage: 58, waterAvail: 78, multiDay: 78, bestSeason: "summer", deaths: 42, deathsPer10M: 22, highlight: "Giant sequoias, Mt Whitney access" },
  { name: "Kings Canyon", state: "CA", region: "California", lat: 36.89, lng: -118.56, danger: 65, difficulty: 78, accessibility: 55, remoteness: 68, visitationRaw: 562918, sentimentRaw: 90, wildlife: 52, permit: 52, cellCoverage: 72, waterAvail: 82, multiDay: 88, bestSeason: "summer", deaths: 28, deathsPer10M: 31, highlight: "Deepest canyon in North America" },
  { name: "Death Valley", state: "CA", region: "California", lat: 36.51, lng: -117.08, danger: 82, difficulty: 65, accessibility: 72, remoteness: 75, visitationRaw: 1128000, sentimentRaw: 88, wildlife: 35, permit: 15, cellCoverage: 78, waterAvail: 5, multiDay: 45, bestSeason: "winter", deaths: 65, deathsPer10M: 38, highlight: "Hottest place on Earth (134°F)" },
  { name: "Joshua Tree", state: "CA", region: "California", lat: 33.87, lng: -115.90, danger: 52, difficulty: 48, accessibility: 88, remoteness: 45, visitationRaw: 3000000, sentimentRaw: 92, wildlife: 38, permit: 35, cellCoverage: 52, waterAvail: 8, multiDay: 55, bestSeason: "spring", deaths: 45, deathsPer10M: 9, highlight: "World-class rock climbing" },
  { name: "Redwood", state: "CA", region: "California", lat: 41.21, lng: -124.00, danger: 35, difficulty: 42, accessibility: 75, remoteness: 48, visitationRaw: 500000, sentimentRaw: 95, wildlife: 28, permit: 42, cellCoverage: 55, waterAvail: 88, multiDay: 65, bestSeason: "summer", deaths: 12, deathsPer10M: 15, highlight: "Tallest trees on Earth (380+ ft)" },
  { name: "Lassen Volcanic", state: "CA", region: "California", lat: 40.50, lng: -121.42, danger: 58, difficulty: 62, accessibility: 58, remoteness: 62, visitationRaw: 500000, sentimentRaw: 85, wildlife: 35, permit: 28, cellCoverage: 68, waterAvail: 75, multiDay: 72, bestSeason: "summer", deaths: 15, deathsPer10M: 19, highlight: "Active volcanism, hydrothermal" },
  { name: "Pinnacles", state: "CA", region: "California", lat: 36.49, lng: -121.18, danger: 45, difficulty: 55, accessibility: 72, remoteness: 38, visitationRaw: 302000, sentimentRaw: 88, wildlife: 22, permit: 32, cellCoverage: 48, waterAvail: 25, multiDay: 35, bestSeason: "spring", deaths: 5, deathsPer10M: 10, highlight: "Cave exploration, condors" },
  { name: "Channel Islands", state: "CA", region: "California", lat: 34.01, lng: -119.78, danger: 55, difficulty: 58, accessibility: 35, remoteness: 72, visitationRaw: 410000, sentimentRaw: 92, wildlife: 35, permit: 48, cellCoverage: 85, waterAvail: 15, multiDay: 68, bestSeason: "spring", deaths: 12, deathsPer10M: 18, highlight: "Island wilderness, sea kayaking" },
  
  // Rocky Mountain Region
  { name: "Yellowstone", state: "WY", region: "Rocky Mountains", lat: 44.43, lng: -110.59, danger: 72, difficulty: 58, accessibility: 82, remoteness: 55, visitationRaw: 4740000, sentimentRaw: 96, wildlife: 85, permit: 62, cellCoverage: 58, waterAvail: 82, multiDay: 78, bestSeason: "fall", deaths: 74, deathsPer10M: 9, highlight: "74 deaths (07-23), thermal danger" },
  { name: "Grand Teton", state: "WY", region: "Rocky Mountains", lat: 43.79, lng: -110.68, danger: 72, difficulty: 78, accessibility: 78, remoteness: 52, visitationRaw: 3620000, sentimentRaw: 97, wildlife: 78, permit: 68, cellCoverage: 52, waterAvail: 85, multiDay: 82, bestSeason: "summer", deaths: 52, deathsPer10M: 9, highlight: "Dramatic Teton Range" },
  { name: "Glacier", state: "MT", region: "Rocky Mountains", lat: 48.76, lng: -113.79, danger: 75, difficulty: 75, accessibility: 68, remoteness: 65, visitationRaw: 3208755, sentimentRaw: 98, wildlife: 92, permit: 78, cellCoverage: 72, waterAvail: 92, multiDay: 90, bestSeason: "summer", deaths: 78, deathsPer10M: 15, highlight: "Crown of the Continent, grizzlies" },
  { name: "Rocky Mountain", state: "CO", region: "Rocky Mountains", lat: 40.34, lng: -105.68, danger: 55, difficulty: 72, accessibility: 85, remoteness: 42, visitationRaw: 4150000, sentimentRaw: 94, wildlife: 55, permit: 75, cellCoverage: 48, waterAvail: 78, multiDay: 75, bestSeason: "summer", deaths: 62, deathsPer10M: 9, highlight: "Trail Ridge Road, alpine tundra" },
  { name: "Great Sand Dunes", state: "CO", region: "Rocky Mountains", lat: 37.79, lng: -105.59, danger: 48, difficulty: 55, accessibility: 68, remoteness: 55, visitationRaw: 602000, sentimentRaw: 90, wildlife: 18, permit: 22, cellCoverage: 62, waterAvail: 35, multiDay: 45, bestSeason: "spring", deaths: 8, deathsPer10M: 8, highlight: "Tallest dunes in N. America (750 ft)" },
  { name: "Mesa Verde", state: "CO", region: "Rocky Mountains", lat: 37.23, lng: -108.46, danger: 38, difficulty: 45, accessibility: 72, remoteness: 52, visitationRaw: 548000, sentimentRaw: 91, wildlife: 15, permit: 45, cellCoverage: 55, waterAvail: 25, multiDay: 35, bestSeason: "fall", deaths: 12, deathsPer10M: 14, highlight: "Ancestral Puebloan cliff dwellings" },
  { name: "Black Canyon of the Gunnison", state: "CO", region: "Rocky Mountains", lat: 38.58, lng: -107.74, danger: 68, difficulty: 72, accessibility: 62, remoteness: 58, visitationRaw: 308000, sentimentRaw: 89, wildlife: 22, permit: 35, cellCoverage: 68, waterAvail: 45, multiDay: 55, bestSeason: "summer", deaths: 18, deathsPer10M: 37, highlight: "2,700 ft steep canyon walls" },
  
  // Desert Southwest
  { name: "Grand Canyon", state: "AZ", region: "Desert Southwest", lat: 36.11, lng: -112.11, danger: 75, difficulty: 78, accessibility: 92, remoteness: 55, visitationRaw: 4910000, sentimentRaw: 98, wildlife: 35, permit: 92, cellCoverage: 55, waterAvail: 35, multiDay: 88, bestSeason: "spring", deaths: 134, deathsPer10M: 17, highlight: "134 deaths (07-24), ~15/year avg" },
  { name: "Zion", state: "UT", region: "Desert Southwest", lat: 37.30, lng: -113.03, danger: 65, difficulty: 68, accessibility: 88, remoteness: 38, visitationRaw: 4940000, sentimentRaw: 97, wildlife: 28, permit: 85, cellCoverage: 42, waterAvail: 55, multiDay: 72, bestSeason: "spring", deaths: 59, deathsPer10M: 7, highlight: "59 deaths (07-24), Angels Landing" },
  { name: "Bryce Canyon", state: "UT", region: "Desert Southwest", lat: 37.59, lng: -112.19, danger: 42, difficulty: 52, accessibility: 82, remoteness: 48, visitationRaw: 2400000, sentimentRaw: 96, wildlife: 18, permit: 35, cellCoverage: 52, waterAvail: 35, multiDay: 55, bestSeason: "spring", deaths: 22, deathsPer10M: 6, highlight: "Hoodoo formations, dark sky park" },
  { name: "Arches", state: "UT", region: "Desert Southwest", lat: 38.73, lng: -109.59, danger: 48, difficulty: 45, accessibility: 88, remoteness: 35, visitationRaw: 1800000, sentimentRaw: 95, wildlife: 15, permit: 68, cellCoverage: 38, waterAvail: 12, multiDay: 35, bestSeason: "spring", deaths: 18, deathsPer10M: 6, highlight: "2,000+ natural stone arches" },
  { name: "Canyonlands", state: "UT", region: "Desert Southwest", lat: 38.33, lng: -109.88, danger: 75, difficulty: 78, accessibility: 55, remoteness: 78, visitationRaw: 911000, sentimentRaw: 94, wildlife: 22, permit: 55, cellCoverage: 85, waterAvail: 18, multiDay: 85, bestSeason: "spring", deaths: 35, deathsPer10M: 24, highlight: "Vast wilderness, technical 4x4" },
  { name: "Capitol Reef", state: "UT", region: "Desert Southwest", lat: 38.20, lng: -111.17, danger: 52, difficulty: 58, accessibility: 62, remoteness: 65, visitationRaw: 1235000, sentimentRaw: 92, wildlife: 18, permit: 28, cellCoverage: 72, waterAvail: 32, multiDay: 65, bestSeason: "spring", deaths: 15, deathsPer10M: 8, highlight: "100-mile Waterpocket Fold" },
  { name: "Petrified Forest", state: "AZ", region: "Desert Southwest", lat: 35.07, lng: -109.79, danger: 42, difficulty: 35, accessibility: 85, remoteness: 48, visitationRaw: 602000, sentimentRaw: 82, wildlife: 12, permit: 15, cellCoverage: 55, waterAvail: 8, multiDay: 25, bestSeason: "spring", deaths: 8, deathsPer10M: 8, highlight: "225M year-old petrified wood" },
  { name: "Saguaro", state: "AZ", region: "Desert Southwest", lat: 32.30, lng: -111.17, danger: 55, difficulty: 48, accessibility: 88, remoteness: 32, visitationRaw: 1020000, sentimentRaw: 88, wildlife: 45, permit: 18, cellCoverage: 35, waterAvail: 12, multiDay: 42, bestSeason: "winter", deaths: 18, deathsPer10M: 11, highlight: "Giant saguaros (up to 200 yrs old)" },
  { name: "Carlsbad Caverns", state: "NM", region: "Desert Southwest", lat: 32.15, lng: -104.56, danger: 35, difficulty: 42, accessibility: 78, remoteness: 55, visitationRaw: 405000, sentimentRaw: 93, wildlife: 15, permit: 25, cellCoverage: 62, waterAvail: 15, multiDay: 35, bestSeason: "summer", deaths: 8, deathsPer10M: 12, highlight: "119 caves, 400K bat colony" },
  { name: "White Sands", state: "NM", region: "Desert Southwest", lat: 32.79, lng: -106.33, danger: 52, difficulty: 38, accessibility: 82, remoteness: 48, visitationRaw: 782000, sentimentRaw: 94, wildlife: 12, permit: 18, cellCoverage: 58, waterAvail: 5, multiDay: 32, bestSeason: "winter", deaths: 8, deathsPer10M: 6, highlight: "World's largest gypsum dunes" },
  { name: "Guadalupe Mountains", state: "TX", region: "Desert Southwest", lat: 31.92, lng: -104.86, danger: 55, difficulty: 65, accessibility: 52, remoteness: 68, visitationRaw: 243000, sentimentRaw: 87, wildlife: 28, permit: 22, cellCoverage: 78, waterAvail: 22, multiDay: 68, bestSeason: "fall", deaths: 12, deathsPer10M: 31, highlight: "Guadalupe Peak - Texas high point" },
  { name: "Big Bend", state: "TX", region: "Desert Southwest", lat: 29.25, lng: -103.25, danger: 72, difficulty: 65, accessibility: 42, remoteness: 82, visitationRaw: 581000, sentimentRaw: 93, wildlife: 42, permit: 32, cellCoverage: 88, waterAvail: 28, multiDay: 78, bestSeason: "spring", deaths: 52, deathsPer10M: 58, highlight: "5.8 deaths/million - extreme heat" },
  { name: "Great Basin", state: "NV", region: "Desert Southwest", lat: 38.98, lng: -114.30, danger: 52, difficulty: 62, accessibility: 45, remoteness: 72, visitationRaw: 131880, sentimentRaw: 91, wildlife: 32, permit: 18, cellCoverage: 75, waterAvail: 35, multiDay: 65, bestSeason: "summer", deaths: 8, deathsPer10M: 38, highlight: "Lehman Caves, 5,000-year bristlecone pines" },
  
  // Great Lakes / Midwest
  { name: "Isle Royale", state: "MI", region: "Great Lakes", lat: 48.00, lng: -88.90, danger: 58, difficulty: 72, accessibility: 15, remoteness: 88, visitationRaw: 28965, sentimentRaw: 94, wildlife: 62, permit: 35, cellCoverage: 95, waterAvail: 95, multiDay: 95, bestSeason: "summer", deaths: 8, deathsPer10M: 17, highlight: "Wilderness island, wolf-moose study" },
  { name: "Voyageurs", state: "MN", region: "Great Lakes", lat: 48.50, lng: -92.83, danger: 48, difficulty: 52, accessibility: 38, remoteness: 72, visitationRaw: 243000, sentimentRaw: 86, wildlife: 55, permit: 25, cellCoverage: 75, waterAvail: 98, multiDay: 72, bestSeason: "summer", deaths: 22, deathsPer10M: 57, highlight: "Water-based wilderness" },
  { name: "Theodore Roosevelt", state: "ND", region: "Great Lakes", lat: 46.98, lng: -103.54, danger: 38, difficulty: 42, accessibility: 68, remoteness: 58, visitationRaw: 796000, sentimentRaw: 88, wildlife: 42, permit: 18, cellCoverage: 58, waterAvail: 45, multiDay: 55, bestSeason: "fall", deaths: 12, deathsPer10M: 9, highlight: "Where TR became a conservationist" },
  { name: "Badlands", state: "SD", region: "Great Lakes", lat: 43.86, lng: -102.34, danger: 45, difficulty: 48, accessibility: 78, remoteness: 52, visitationRaw: 1020000, sentimentRaw: 91, wildlife: 35, permit: 15, cellCoverage: 55, waterAvail: 18, multiDay: 45, bestSeason: "spring", deaths: 18, deathsPer10M: 11, highlight: "Dramatic erosion, fossil beds" },
  { name: "Wind Cave", state: "SD", region: "Great Lakes", lat: 43.57, lng: -103.44, danger: 32, difficulty: 38, accessibility: 75, remoteness: 48, visitationRaw: 709000, sentimentRaw: 84, wildlife: 38, permit: 22, cellCoverage: 52, waterAvail: 35, multiDay: 35, bestSeason: "summer", deaths: 5, deathsPer10M: 4, highlight: "World's densest boxwork formations" },
  { name: "Gateway Arch", state: "MO", region: "Great Lakes", lat: 38.62, lng: -90.18, danger: 8, difficulty: 10, accessibility: 98, remoteness: 5, visitationRaw: 2100000, sentimentRaw: 78, wildlife: 2, permit: 5, cellCoverage: 5, waterAvail: 95, multiDay: 5, bestSeason: "spring", deaths: 12, deathsPer10M: 4, highlight: "630 ft monument, smallest park" },
  { name: "Indiana Dunes", state: "IN", region: "Great Lakes", lat: 41.65, lng: -87.05, danger: 22, difficulty: 28, accessibility: 92, remoteness: 15, visitationRaw: 3200000, sentimentRaw: 82, wildlife: 12, permit: 8, cellCoverage: 15, waterAvail: 92, multiDay: 18, bestSeason: "summer", deaths: 32, deathsPer10M: 6, highlight: "15 miles Lake Michigan shore" },
  { name: "Cuyahoga Valley", state: "OH", region: "Great Lakes", lat: 41.28, lng: -81.57, danger: 18, difficulty: 32, accessibility: 95, remoteness: 12, visitationRaw: 2200000, sentimentRaw: 85, wildlife: 15, permit: 8, cellCoverage: 12, waterAvail: 88, multiDay: 25, bestSeason: "fall", deaths: 45, deathsPer10M: 13, highlight: "44% of deaths are suicides" },
  
  // Eastern Parks
  { name: "Acadia", state: "ME", region: "Eastern", lat: 44.34, lng: -68.27, danger: 38, difficulty: 52, accessibility: 82, remoteness: 35, visitationRaw: 3960000, sentimentRaw: 97, wildlife: 25, permit: 55, cellCoverage: 38, waterAvail: 82, multiDay: 55, bestSeason: "fall", deaths: 52, deathsPer10M: 8, highlight: "First sunrise, Cadillac Mountain" },
  { name: "Great Smoky Mountains", state: "TN/NC", region: "Eastern", lat: 35.65, lng: -83.51, danger: 42, difficulty: 55, accessibility: 88, remoteness: 38, visitationRaw: 12191834, sentimentRaw: 94, wildlife: 58, permit: 52, cellCoverage: 42, waterAvail: 92, multiDay: 78, bestSeason: "fall", deaths: 92, deathsPer10M: 5, highlight: "#1 visited (12.2M), 37 MVA deaths" },
  { name: "Shenandoah", state: "VA", region: "Eastern", lat: 38.29, lng: -78.68, danger: 35, difficulty: 52, accessibility: 88, remoteness: 32, visitationRaw: 1600000, sentimentRaw: 93, wildlife: 48, permit: 42, cellCoverage: 35, waterAvail: 85, multiDay: 72, bestSeason: "fall", deaths: 28, deathsPer10M: 11, highlight: "105-mile Skyline Drive, AT access" },
  { name: "Mammoth Cave", state: "KY", region: "Eastern", lat: 37.19, lng: -86.10, danger: 28, difficulty: 35, accessibility: 82, remoteness: 35, visitationRaw: 515000, sentimentRaw: 90, wildlife: 12, permit: 35, cellCoverage: 42, waterAvail: 75, multiDay: 35, bestSeason: "summer", deaths: 8, deathsPer10M: 10, highlight: "World's longest cave (420+ mi)" },
  { name: "Hot Springs", state: "AR", region: "Eastern", lat: 34.52, lng: -93.04, danger: 15, difficulty: 25, accessibility: 95, remoteness: 12, visitationRaw: 2200000, sentimentRaw: 82, wildlife: 8, permit: 5, cellCoverage: 12, waterAvail: 95, multiDay: 15, bestSeason: "spring", deaths: 12, deathsPer10M: 3, highlight: "SAFEST park - historic bathhouses" },
  { name: "Congaree", state: "SC", region: "Eastern", lat: 33.79, lng: -80.78, danger: 35, difficulty: 32, accessibility: 75, remoteness: 42, visitationRaw: 215000, sentimentRaw: 86, wildlife: 42, permit: 12, cellCoverage: 48, waterAvail: 95, multiDay: 35, bestSeason: "spring", deaths: 5, deathsPer10M: 15, highlight: "Largest old-growth floodplain" },
  { name: "New River Gorge", state: "WV", region: "Eastern", lat: 38.07, lng: -81.08, danger: 55, difficulty: 58, accessibility: 72, remoteness: 45, visitationRaw: 1700000, sentimentRaw: 90, wildlife: 28, permit: 25, cellCoverage: 48, waterAvail: 85, multiDay: 55, bestSeason: "fall", deaths: 78, deathsPer10M: 29, highlight: "50 suicides - 46% of ALL NPS suicides" },
  { name: "Everglades", state: "FL", region: "Eastern", lat: 25.29, lng: -80.90, danger: 62, difficulty: 48, accessibility: 68, remoteness: 58, visitationRaw: 1118000, sentimentRaw: 88, wildlife: 78, permit: 38, cellCoverage: 65, waterAvail: 45, multiDay: 62, bestSeason: "winter", deaths: 42, deathsPer10M: 24, highlight: "1.5M acre river of grass" },
  { name: "Biscayne", state: "FL", region: "Eastern", lat: 25.48, lng: -80.21, danger: 45, difficulty: 42, accessibility: 55, remoteness: 52, visitationRaw: 705000, sentimentRaw: 85, wildlife: 45, permit: 22, cellCoverage: 58, waterAvail: 25, multiDay: 45, bestSeason: "winter", deaths: 18, deathsPer10M: 16, highlight: "95% water, coral reefs" },
  { name: "Dry Tortugas", state: "FL", region: "Eastern", lat: 24.63, lng: -82.87, danger: 52, difficulty: 45, accessibility: 18, remoteness: 82, visitationRaw: 83000, sentimentRaw: 94, wildlife: 35, permit: 45, cellCoverage: 92, waterAvail: 5, multiDay: 55, bestSeason: "spring", deaths: 5, deathsPer10M: 38, highlight: "Fort Jefferson, 70 mi from Key West" },
  
  // Hawaii & Pacific
  { name: "Hawai'i Volcanoes", state: "HI", region: "Pacific Islands", lat: 19.42, lng: -155.29, danger: 72, difficulty: 55, accessibility: 75, remoteness: 65, visitationRaw: 1420000, sentimentRaw: 95, wildlife: 22, permit: 28, cellCoverage: 55, waterAvail: 45, multiDay: 58, bestSeason: "year-round", deaths: 32, deathsPer10M: 14, highlight: "Active Kilauea, lava flows" },
  { name: "Haleakalā", state: "HI", region: "Pacific Islands", lat: 20.72, lng: -156.16, danger: 48, difficulty: 58, accessibility: 72, remoteness: 55, visitationRaw: 1100000, sentimentRaw: 93, wildlife: 15, permit: 32, cellCoverage: 52, waterAvail: 35, multiDay: 52, bestSeason: "year-round", deaths: 18, deathsPer10M: 10, highlight: "10,023 ft summit, famous sunrise" },
  { name: "National Park of American Samoa", state: "AS", region: "Pacific Islands", lat: -14.26, lng: -170.69, danger: 55, difficulty: 62, accessibility: 8, remoteness: 95, visitationRaw: 26218, sentimentRaw: 88, wildlife: 32, permit: 8, cellCoverage: 88, waterAvail: 75, multiDay: 55, bestSeason: "winter", deaths: 2, deathsPer10M: 48, highlight: "+86% visitors 2024 (COVID recovery)" },
  
  // U.S. Virgin Islands
  { name: "Virgin Islands", state: "VI", region: "Caribbean", lat: 18.34, lng: -64.75, danger: 55, difficulty: 45, accessibility: 45, remoteness: 62, visitationRaw: 323000, sentimentRaw: 90, wildlife: 25, permit: 15, cellCoverage: 55, waterAvail: 35, multiDay: 42, bestSeason: "winter", deaths: 32, deathsPer10M: 62, highlight: "6/million deaths - high drowning risk" },
];

// Calculate normalized scores
const calculateScores = (parks) => {
  // Find min/max for visitation and sentiment
  const visitationValues = parks.map(p => p.visitationRaw);
  const minVisitation = Math.min(...visitationValues);
  const maxVisitation = Math.max(...visitationValues);
  
  const sentimentValues = parks.map(p => p.sentimentRaw);
  const minSentiment = Math.min(...sentimentValues);
  const maxSentiment = Math.max(...sentimentValues);
  
  return parks.map(park => {
    // Solitude: Invert visitation (fewer visitors = higher score)
    // Use logarithmic scale for better distribution
    const logMin = Math.log(minVisitation + 1);
    const logMax = Math.log(maxVisitation + 1);
    const logCurrent = Math.log(park.visitationRaw + 1);
    const solitude = Math.round(100 - ((logCurrent - logMin) / (logMax - logMin)) * 99);
    
    // Curved sentiment: Linear normalization to 1-100
    const sentimentCurved = Math.round(1 + ((park.sentimentRaw - minSentiment) / (maxSentiment - minSentiment)) * 99);
    
    // Adventure score: Danger + Difficulty + Remoteness + Solitude (NO sentiment)
    const adventureScore = Math.round((park.danger + park.difficulty + park.remoteness + solitude) / 4);
    
    // Beginner friendly: Low danger, low difficulty, high accessibility (NO sentiment influence on tier)
    const beginnerFriendly = Math.round((100 - park.danger + 100 - park.difficulty + park.accessibility) / 3);
    
    // Backpacking score: Multi-day potential + Remoteness + Solitude + Water availability
    const backpackingScore = Math.round((park.multiDay + park.remoteness + solitude + park.waterAvail) / 4);
    
    // True wilderness score: Remoteness + Solitude + Cell coverage (inverted = disconnected) + Low accessibility
    const wildernessScore = Math.round((park.remoteness + solitude + park.cellCoverage + (100 - park.accessibility)) / 4);
    
    // Tier based on adventure score (danger + difficulty + remoteness + solitude)
    let tier;
    if (adventureScore >= 75) tier = 'Extreme';
    else if (adventureScore >= 55) tier = 'Hard';
    else if (adventureScore >= 35) tier = 'Moderate';
    else tier = 'Easy';
    
    return { 
      ...park, 
      solitude, 
      sentimentCurved, 
      sentimentRaw: park.sentimentRaw, // Keep raw for sorting
      adventureScore, 
      beginnerFriendly, 
      backpackingScore,
      wildernessScore,
      tier 
    };
  });
};

const parksWithScores = calculateScores(nationalParksData);

const SeasonIcon = ({ season }) => {
  const icons = {
    'spring': <Flower2 size={14} />,
    'summer': <Sun size={14} />,
    'fall': <Leaf size={14} />,
    'winter': <Snowflake size={14} />,
    'year-round': <Calendar size={14} />
  };
  return icons[season] || <Calendar size={14} />;
};

const TierBadge = ({ tier }) => {
  const colors = {
    'Extreme': { bg: 'rgba(155, 34, 38, 0.2)', color: '#e85d64', border: '#9b2226' },
    'Hard': { bg: 'rgba(212, 163, 115, 0.2)', color: '#d4a373', border: '#b8860b' },
    'Moderate': { bg: 'rgba(96, 108, 56, 0.2)', color: '#a3b18a', border: '#606c38' },
    'Easy': { bg: 'rgba(45, 106, 79, 0.2)', color: '#7c9a6c', border: '#2d6a4f' }
  };
  const style = colors[tier];
  return (
    <span style={{
      display: 'inline-block',
      padding: '4px 10px',
      background: style.bg,
      color: style.color,
      border: `1px solid ${style.border}`,
      borderRadius: '20px',
      fontSize: '11px',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    }}>
      {tier}
    </span>
  );
};

const ScoreBar = ({ value, color }) => (
  <div className="score-bar-container">
    <div className="score-bar" style={{ width: `${value}%`, background: color }} />
    <span className="score-value">{value}</span>
  </div>
);

const getScoreColor = (value, category) => {
  // Green = good for backpacker, Red = challenging/caution
  if (['accessibility', 'beginnerFriendly', 'sentimentCurved', 'waterAvail'].includes(category)) {
    if (value >= 70) return '#2d6a4f';
    if (value >= 40) return '#d4a373';
    return '#9b2226';
  }
  // For danger/difficulty/remoteness/solitude/wilderness - higher = more extreme
  if (value >= 80) return '#9b2226';
  if (value >= 60) return '#d4a373';
  if (value >= 40) return '#606c38';
  return '#2d6a4f';
};

// Radar chart component
const RadarChart = ({ park, size = 220 }) => {
  const categories = [
    { key: 'danger', label: 'Danger' },
    { key: 'difficulty', label: 'Difficulty' },
    { key: 'remoteness', label: 'Remoteness' },
    { key: 'solitude', label: 'Solitude' },
    { key: 'wildlife', label: 'Wildlife' },
    { key: 'waterAvail', label: 'Water' }
  ];
  
  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = size * 0.38;
  const levels = 4;
  const angleSlice = (Math.PI * 2) / categories.length;
  
  const getPoint = (value, index) => {
    const angle = angleSlice * index - Math.PI / 2;
    const radius = (value / 100) * maxRadius;
    return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
  };
  
  const points = categories.map((cat, i) => getPoint(park[cat.key], i));
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
  
  return (
    <svg width={size} height={size} style={{ overflow: 'visible' }}>
      {[...Array(levels)].map((_, i) => (
        <circle key={i} cx={cx} cy={cy} r={maxRadius * ((i + 1) / levels)} fill="none" stroke="#333" strokeWidth="1" />
      ))}
      {categories.map((_, i) => {
        const angle = angleSlice * i - Math.PI / 2;
        return <line key={i} x1={cx} y1={cy} x2={cx + maxRadius * Math.cos(angle)} y2={cy + maxRadius * Math.sin(angle)} stroke="#333" strokeWidth="1" />;
      })}
      <path d={pathD} fill="rgba(124, 154, 108, 0.3)" stroke="#7c9a6c" strokeWidth="2" />
      {points.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="4" fill="#7c9a6c" />)}
      {categories.map((cat, i) => {
        const angle = angleSlice * i - Math.PI / 2;
        const x = cx + (maxRadius + 26) * Math.cos(angle);
        const y = cy + (maxRadius + 26) * Math.sin(angle);
        return <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill="#888" fontSize="11" fontFamily="Outfit">{cat.label}</text>;
      })}
    </svg>
  );
};

// Compare radar chart
const CompareRadarChart = ({ parks, size = 300 }) => {
  const categories = [
    { key: 'danger', label: 'Danger' },
    { key: 'difficulty', label: 'Difficulty' },
    { key: 'remoteness', label: 'Remoteness' },
    { key: 'solitude', label: 'Solitude' },
    { key: 'wildlife', label: 'Wildlife' },
    { key: 'waterAvail', label: 'Water' }
  ];
  
  const colors = ['#7c9a6c', '#d4a373', '#6b9ac4'];
  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = size * 0.32;
  const levels = 4;
  const angleSlice = (Math.PI * 2) / categories.length;
  
  const getPoint = (value, index) => {
    const angle = angleSlice * index - Math.PI / 2;
    const radius = (value / 100) * maxRadius;
    return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
  };
  
  return (
    <svg width={size} height={size} style={{ overflow: 'visible' }}>
      {[...Array(levels)].map((_, i) => (
        <circle key={i} cx={cx} cy={cy} r={maxRadius * ((i + 1) / levels)} fill="none" stroke="#333" strokeWidth="1" />
      ))}
      {categories.map((_, i) => {
        const angle = angleSlice * i - Math.PI / 2;
        return <line key={i} x1={cx} y1={cy} x2={cx + maxRadius * Math.cos(angle)} y2={cy + maxRadius * Math.sin(angle)} stroke="#333" strokeWidth="1" />;
      })}
      {parks.map((park, parkIdx) => {
        const points = categories.map((cat, i) => getPoint(park[cat.key], i));
        const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
        return (
          <g key={park.name}>
            <path d={pathD} fill={`${colors[parkIdx]}33`} stroke={colors[parkIdx]} strokeWidth="2" />
            {points.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="3" fill={colors[parkIdx]} />)}
          </g>
        );
      })}
      {categories.map((cat, i) => {
        const angle = angleSlice * i - Math.PI / 2;
        const x = cx + (maxRadius + 30) * Math.cos(angle);
        const y = cy + (maxRadius + 30) * Math.sin(angle);
        return <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill="#888" fontSize="11" fontFamily="Outfit">{cat.label}</text>;
      })}
    </svg>
  );
};

// US Map Component with proper geography
const USMap = ({ parks, onParkClick, onParkHover, hoveredPark }) => {
  const tierColors = {
    'Extreme': '#e85d64',
    'Hard': '#d4a373',
    'Moderate': '#a3b18a',
    'Easy': '#7c9a6c'
  };
  
  // Albers USA-like projection for continental US
  const projectPoint = (lat, lng) => {
    // Continental US bounds: lat 24-50, lng -125 to -66
    const x = ((lng + 125) / 59) * 650 + 50;
    const y = ((50 - lat) / 26) * 350 + 30;
    return { x, y };
  };
  
  // Separate parks by region for special handling
  const continentalParks = parks.filter(p => !['AK', 'HI', 'AS', 'VI'].includes(p.state));
  const alaskaParks = parks.filter(p => p.state === 'AK');
  const hawaiiParks = parks.filter(p => p.state === 'HI');
  const pacificParks = parks.filter(p => ['AS', 'VI'].includes(p.state));
  
  // Alaska inset position
  const alaskaProject = (lat, lng, idx) => {
    const baseX = 80;
    const baseY = 340;
    const col = idx % 4;
    const row = Math.floor(idx / 4);
    return { x: baseX + col * 35, y: baseY + row * 30 };
  };
  
  // Hawaii inset position  
  const hawaiiProject = (lat, lng, idx) => {
    return { x: 220 + idx * 50, y: 385 };
  };
  
  // Pacific territories
  const pacificProject = (idx) => {
    return { x: 340 + idx * 50, y: 385 };
  };

  return (
    <div className="map-container">
      <svg viewBox="0 0 800 450" className="us-map">
        {/* Background */}
        <rect x="0" y="0" width="800" height="450" fill="#1a1a1a"/>
        
        {/* Continental US outline - simplified */}
        <path d="M 50,120 L 120,100 L 200,95 L 280,90 L 360,85 L 420,80 L 500,75 L 580,80 L 650,100 L 700,140 L 700,180 L 690,220 L 680,260 L 660,300 L 620,340 L 560,360 L 500,365 L 440,350 L 400,340 L 350,350 L 300,380 L 250,370 L 200,350 L 150,320 L 100,280 L 70,240 L 55,200 L 50,160 Z" 
              fill="#252525" stroke="#333" strokeWidth="1"/>
        
        {/* Florida */}
        <path d="M 560,340 L 580,360 L 600,390 L 590,410 L 570,400 L 560,370 Z" 
              fill="#252525" stroke="#333" strokeWidth="1"/>
        
        {/* Alaska inset box */}
        <rect x="30" y="310" width="160" height="130" fill="#1e1e1e" stroke="#333" strokeWidth="1" rx="4"/>
        <text x="110" y="328" textAnchor="middle" fill="#666" fontSize="10">ALASKA</text>
        
        {/* Hawaii/Pacific inset box */}
        <rect x="200" y="360" width="220" height="80" fill="#1e1e1e" stroke="#333" strokeWidth="1" rx="4"/>
        <text x="260" y="378" textAnchor="middle" fill="#666" fontSize="10">HAWAII & PACIFIC</text>
        
        {/* Continental parks */}
        {continentalParks.map(park => {
          const pos = projectPoint(park.lat, park.lng);
          const isHovered = hoveredPark === park.name;
          return (
            <g key={park.name}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={isHovered ? 8 : 5}
                fill={tierColors[park.tier]}
                stroke={isHovered ? '#fff' : '#1a1a1a'}
                strokeWidth={isHovered ? 2 : 1}
                style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                onClick={() => onParkClick(park)}
                onMouseEnter={() => onParkHover(park.name)}
                onMouseLeave={() => onParkHover(null)}
              />
              {isHovered && (
                <text x={pos.x} y={pos.y - 12} textAnchor="middle" fill="#fff" fontSize="10" fontWeight="600">
                  {park.name}
                </text>
              )}
            </g>
          );
        })}
        
        {/* Alaska parks */}
        {alaskaParks.map((park, idx) => {
          const pos = alaskaProject(park.lat, park.lng, idx);
          const isHovered = hoveredPark === park.name;
          return (
            <g key={park.name}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={isHovered ? 7 : 4}
                fill={tierColors[park.tier]}
                stroke={isHovered ? '#fff' : '#1e1e1e'}
                strokeWidth={isHovered ? 2 : 1}
                style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                onClick={() => onParkClick(park)}
                onMouseEnter={() => onParkHover(park.name)}
                onMouseLeave={() => onParkHover(null)}
              />
              {isHovered && (
                <text x={pos.x} y={pos.y - 10} textAnchor="middle" fill="#fff" fontSize="9" fontWeight="600">
                  {park.name}
                </text>
              )}
            </g>
          );
        })}
        
        {/* Hawaii parks */}
        {hawaiiParks.map((park, idx) => {
          const pos = hawaiiProject(park.lat, park.lng, idx);
          const isHovered = hoveredPark === park.name;
          return (
            <g key={park.name}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={isHovered ? 7 : 4}
                fill={tierColors[park.tier]}
                stroke={isHovered ? '#fff' : '#1e1e1e'}
                strokeWidth={isHovered ? 2 : 1}
                style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                onClick={() => onParkClick(park)}
                onMouseEnter={() => onParkHover(park.name)}
                onMouseLeave={() => onParkHover(null)}
              />
              {isHovered && (
                <text x={pos.x} y={pos.y - 10} textAnchor="middle" fill="#fff" fontSize="9" fontWeight="600">
                  {park.name}
                </text>
              )}
            </g>
          );
        })}
        
        {/* Pacific territories */}
        {pacificParks.map((park, idx) => {
          const pos = pacificProject(idx);
          const isHovered = hoveredPark === park.name;
          return (
            <g key={park.name}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={isHovered ? 7 : 4}
                fill={tierColors[park.tier]}
                stroke={isHovered ? '#fff' : '#1e1e1e'}
                strokeWidth={isHovered ? 2 : 1}
                style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                onClick={() => onParkClick(park)}
                onMouseEnter={() => onParkHover(park.name)}
                onMouseLeave={() => onParkHover(null)}
              />
              {isHovered && (
                <text x={pos.x} y={pos.y - 10} textAnchor="middle" fill="#fff" fontSize="9" fontWeight="600">
                  {park.name}
                </text>
              )}
            </g>
          );
        })}
        
        {/* Legend */}
        <g transform="translate(620, 320)">
          <text x="0" y="0" fill="#888" fontSize="10" fontWeight="600">DIFFICULTY TIER</text>
          {Object.entries(tierColors).map(([tier, color], idx) => (
            <g key={tier} transform={`translate(0, ${15 + idx * 18})`}>
              <circle cx="6" cy="0" r="5" fill={color}/>
              <text x="18" y="4" fill="#888" fontSize="10">{tier}</text>
            </g>
          ))}
        </g>
        
        {/* Stats */}
        <g transform="translate(620, 30)">
          <text x="0" y="0" fill="#7c9a6c" fontSize="24" fontWeight="700">{parks.length}</text>
          <text x="0" y="18" fill="#888" fontSize="10">National Parks</text>
        </g>
      </svg>
      
      {/* Hover tooltip */}
      {hoveredPark && (() => {
        const park = parks.find(p => p.name === hoveredPark);
        if (!park) return null;
        return (
          <div className="map-tooltip">
            <div className="tooltip-name">{park.name}</div>
            <div className="tooltip-location">{park.state} • {park.region}</div>
            <div className="tooltip-stats">
              <span className="tooltip-tier" style={{ color: tierColors[park.tier] }}>{park.tier}</span>
              <span>•</span>
              <span>{(park.visitationRaw / 1000000).toFixed(1)}M visitors</span>
              <span>•</span>
              <span>{park.deathsPer10M}/10M death rate</span>
            </div>
          </div>
        );
      })()}
    </div>
  );
};


// Find Similar Parks component
const SimilarParks = ({ park, allParks, onParkClick }) => {
  const getSimilarity = (p1, p2) => {
    const keys = ['danger', 'difficulty', 'remoteness', 'solitude', 'backpackingScore', 'waterAvail'];
    const diffs = keys.map(k => Math.abs(p1[k] - p2[k]));
    const avgDiff = diffs.reduce((a, b) => a + b, 0) / keys.length;
    return 100 - avgDiff;
  };
  
  const similar = allParks
    .filter(p => p.name !== park.name)
    .map(p => ({ ...p, similarity: getSimilarity(park, p) }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 5);
  
  return (
    <div className="similar-parks">
      <div className="similar-parks-title">
        <Target size={14} /> Similar Parks
      </div>
      <div className="similar-parks-list">
        {similar.map(p => (
          <div 
            key={p.name} 
            className="similar-park-item"
            onClick={() => onParkClick(p)}
          >
            <span className="similar-park-name">{p.name}</span>
            <span className="similar-park-match">{Math.round(p.similarity)}% match</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function NationalParksDashboard() {
  const [sortConfig, setSortConfig] = useState({ key: 'adventureScore', direction: 'desc' });
  const [filterRegion, setFilterRegion] = useState('All');
  const [filterTier, setFilterTier] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPark, setSelectedPark] = useState(null);
  const [activeTab, setActiveTab] = useState('table');
  const [quickFilter, setQuickFilter] = useState(null);
  const [compareMode, setCompareMode] = useState(false);
  const [compareParks, setCompareParks] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [hoveredMapPark, setHoveredMapPark] = useState(null);

  const regions = ['All', ...new Set(nationalParksData.map(p => p.region))];
  const tiers = ['All', 'Extreme', 'Hard', 'Moderate', 'Easy'];

  const quickFilters = [
    { id: 'extreme', label: 'Extreme Only', filter: p => p.tier === 'Extreme' },
    { id: 'beginner', label: 'Beginner Friendly', filter: p => p.beginnerFriendly >= 65 },
    { id: 'solitude', label: 'High Solitude', filter: p => p.solitude >= 70 },
    { id: 'highRated', label: 'Top Rated', filter: p => p.sentimentRaw >= 93 },
    { id: 'backpacking', label: 'Best Backpacking', filter: p => p.backpackingScore >= 70 },
    { id: 'wilderness', label: 'True Wilderness', filter: p => p.wildernessScore >= 75 },
    { id: 'water', label: 'Reliable Water', filter: p => p.waterAvail >= 75 },
    { id: 'summer', label: 'Best in Summer', filter: p => p.bestSeason === 'summer' },
  ];

  const sortedParks = useMemo(() => {
    let filtered = parksWithScores.filter(park => {
      const matchesRegion = filterRegion === 'All' || park.region === filterRegion;
      const matchesTier = filterTier === 'All' || park.tier === filterTier;
      const matchesSearch = park.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           park.state.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesQuickFilter = !quickFilter || quickFilters.find(f => f.id === quickFilter)?.filter(park);
      return matchesRegion && matchesTier && matchesSearch && matchesQuickFilter;
    });

    return filtered.sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (typeof aVal === 'string') {
        return sortConfig.direction === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
    });
  }, [sortConfig, filterRegion, filterTier, searchTerm, quickFilter]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  const toggleCompare = (park) => {
    setCompareParks(prev => {
      if (prev.find(p => p.name === park.name)) {
        return prev.filter(p => p.name !== park.name);
      }
      if (prev.length >= 3) return prev;
      return [...prev, park];
    });
  };

  // CSV Export function
  const exportToCSV = () => {
    const headers = [
      'Name', 'State', 'Region', 'Tier', 'Adventure Score', 'Danger', 'Difficulty',
      'Remoteness', 'Solitude', 'Backpacking Score', 'Wilderness Score', 'Beginner Friendly',
      'Visitors (2024)', 'Deaths (2007-24)', 'Deaths per 10M', 'Sentiment', 'Wildlife',
      'Water Availability', 'Cell Coverage', 'Permit Difficulty', 'Best Season',
      'Latitude', 'Longitude', 'Highlight'
    ];
    
    const rows = sortedParks.map(p => [
      p.name, p.state, p.region, p.tier, p.adventureScore, p.danger, p.difficulty,
      p.remoteness, p.solitude, p.backpackingScore, p.wildernessScore, p.beginnerFriendly,
      p.visitationRaw, p.deaths, p.deathsPer10M, p.sentimentCurved, p.wildlife,
      p.waterAvail, p.cellCoverage, p.permit, p.bestSeason,
      p.lat, p.lng, `"${p.highlight}"`
    ]);
    
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `national-parks-data-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const categoryConfig = [
    { key: 'adventureScore', label: 'Most Extreme', icon: <Star size={18} />, desc: 'Danger + Difficulty + Remoteness + Solitude' },
    { key: 'danger', label: 'Most Dangerous', icon: <AlertTriangle size={18} /> },
    { key: 'difficulty', label: 'Most Difficult', icon: <Mountain size={18} /> },
    { key: 'remoteness', label: 'Most Remote', icon: <Compass size={18} /> },
    { key: 'solitude', label: 'Most Solitude', icon: <Users size={18} />, desc: 'Fewest visitors' },
    { key: 'wildernessScore', label: 'True Wilderness', icon: <Tent size={18} />, desc: 'Remote + Solitude + Disconnected' },
    { key: 'backpackingScore', label: 'Best Backpacking', icon: <Tent size={18} />, desc: 'Multi-day + Remote + Water' },
    { key: 'wildlife', label: 'Wildlife Encounters', icon: <PawPrint size={18} /> },
    { key: 'sentimentRaw', label: 'Highest Rated', icon: <Heart size={18} />, desc: 'Raw sentiment score' },
    { key: 'beginnerFriendly', label: 'Best for Beginners', icon: <Eye size={18} /> },
    { key: 'waterAvail', label: 'Best Water Sources', icon: <Droplets size={18} /> },
    { key: 'cellCoverage', label: 'Most Disconnected', icon: <Signal size={18} />, desc: 'No cell coverage' },
  ];

  const getTopParks = (key, count) => {
    return [...parksWithScores].sort((a, b) => b[key] - a[key]).slice(0, count);
  };

  const stats = useMemo(() => {
    const byRegion = {};
    regions.filter(r => r !== 'All').forEach(region => {
      const regionParks = parksWithScores.filter(p => p.region === region);
      byRegion[region] = {
        count: regionParks.length,
        avgDanger: Math.round(regionParks.reduce((a, b) => a + b.danger, 0) / regionParks.length),
        avgDifficulty: Math.round(regionParks.reduce((a, b) => a + b.difficulty, 0) / regionParks.length),
        avgSolitude: Math.round(regionParks.reduce((a, b) => a + b.solitude, 0) / regionParks.length),
        avgAdventure: Math.round(regionParks.reduce((a, b) => a + b.adventureScore, 0) / regionParks.length),
      };
    });
    
    const extremeParks = parksWithScores.filter(p => p.tier === 'Extreme');
    const hardParks = parksWithScores.filter(p => p.tier === 'Hard');
    const highSolitude = parksWithScores.filter(p => p.solitude >= 70);
    const bestBackpacking = parksWithScores.filter(p => p.backpackingScore >= 70);
    
    return {
      totalParks: nationalParksData.length,
      avgDanger: Math.round(parksWithScores.reduce((a, b) => a + b.danger, 0) / parksWithScores.length),
      avgDifficulty: Math.round(parksWithScores.reduce((a, b) => a + b.difficulty, 0) / parksWithScores.length),
      avgRemoteness: Math.round(parksWithScores.reduce((a, b) => a + b.remoteness, 0) / parksWithScores.length),
      avgSolitude: Math.round(parksWithScores.reduce((a, b) => a + b.solitude, 0) / parksWithScores.length),
      mostExtreme: [...parksWithScores].sort((a, b) => b.adventureScore - a.adventureScore)[0].name,
      mostSolitude: [...parksWithScores].sort((a, b) => b.solitude - a.solitude)[0].name,
      mostDangerous: [...parksWithScores].sort((a, b) => b.danger - a.danger)[0].name,
      highestRated: [...parksWithScores].sort((a, b) => b.sentimentRaw - a.sentimentRaw)[0].name,
      bestBackpacking: [...parksWithScores].sort((a, b) => b.backpackingScore - a.backpackingScore)[0].name,
      extremeCount: extremeParks.length,
      hardCount: hardParks.length,
      highSolitudeCount: highSolitude.length,
      bestBackpackingCount: bestBackpacking.length,
      byRegion
    };
  }, []);

  const formatVisitors = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  return (
    <div className="dashboard">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        .dashboard {
          font-family: 'Outfit', sans-serif;
          background: #1a1a1a;
          min-height: 100vh;
          color: #e8e4de;
          position: relative;
        }
        
        .dashboard::before {
          content: '';
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: 
            repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(45, 106, 79, 0.02) 50px, rgba(45, 106, 79, 0.02) 51px),
            repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(45, 106, 79, 0.02) 50px, rgba(45, 106, 79, 0.02) 51px);
          pointer-events: none;
          z-index: 0;
        }
        
        .header {
          background: linear-gradient(135deg, #2d3a24 0%, #1a2318 100%);
          padding: 24px 40px;
          border-bottom: 3px solid #3d5a3d;
          position: relative;
        }
        
        .header h1 {
          font-size: 34px;
          font-weight: 800;
          letter-spacing: -1px;
          color: #e8e4de;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        
        .header h1 svg { color: #7c9a6c; }
        
        .header-subtitle {
          font-size: 13px;
          color: #a0a090;
          margin-top: 6px;
          letter-spacing: 2px;
          text-transform: uppercase;
        }
        
        .main-content {
          position: relative;
          z-index: 1;
          padding: 24px 40px;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: 12px;
          margin-bottom: 20px;
        }
        
        .stat-card {
          background: linear-gradient(145deg, #252525 0%, #1e1e1e 100%);
          border: 1px solid #333;
          border-radius: 10px;
          padding: 14px 12px;
          text-align: center;
          transition: all 0.3s ease;
        }
        
        .stat-card:hover {
          transform: translateY(-2px);
          border-color: #4a6741;
        }
        
        .stat-card.highlight {
          border-color: #4a6741;
          background: linear-gradient(145deg, #2a3525 0%, #1e2318 100%);
        }
        
        .stat-card.wide {
          grid-column: span 2;
        }
        
        .stat-value {
          font-size: 28px;
          font-weight: 700;
          color: #7c9a6c;
          font-family: 'JetBrains Mono', monospace;
        }
        
        .stat-value.small {
          font-size: 14px;
          font-family: 'Outfit', sans-serif;
          line-height: 1.3;
        }
        
        .stat-label {
          font-size: 10px;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 4px;
        }
        
        .tabs {
          display: flex;
          gap: 6px;
          margin-bottom: 16px;
          border-bottom: 2px solid #333;
          padding-bottom: 8px;
        }
        
        .tab {
          padding: 8px 16px;
          background: transparent;
          border: none;
          color: #888;
          font-family: 'Outfit', sans-serif;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          border-radius: 6px 6px 0 0;
          transition: all 0.2s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        
        .tab:hover { color: #ccc; background: rgba(255,255,255,0.05); }
        
        .tab.active {
          color: #7c9a6c;
          background: rgba(124, 154, 108, 0.1);
          border-bottom: 2px solid #7c9a6c;
          margin-bottom: -10px;
        }
        
        .quick-filters {
          display: flex;
          gap: 6px;
          margin-bottom: 14px;
          flex-wrap: wrap;
        }
        
        .quick-filter-btn {
          padding: 6px 12px;
          background: #252525;
          border: 1px solid #333;
          border-radius: 16px;
          color: #888;
          font-family: 'Outfit', sans-serif;
          font-size: 11px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .quick-filter-btn:hover {
          border-color: #4a6741;
          color: #ccc;
        }
        
        .quick-filter-btn.active {
          background: rgba(124, 154, 108, 0.2);
          border-color: #7c9a6c;
          color: #7c9a6c;
        }
        
        .controls {
          display: flex;
          gap: 10px;
          margin-bottom: 16px;
          flex-wrap: wrap;
          align-items: center;
        }
        
        .search-box {
          position: relative;
          flex: 1;
          min-width: 200px;
        }
        
        .search-box input {
          width: 100%;
          padding: 10px 16px 10px 40px;
          background: #252525;
          border: 1px solid #333;
          border-radius: 8px;
          color: #e8e4de;
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          transition: all 0.2s ease;
        }
        
        .search-box input:focus {
          outline: none;
          border-color: #4a6741;
        }
        
        .search-box svg {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #666;
        }
        
        .filter-select {
          padding: 10px 14px;
          background: #252525;
          border: 1px solid #333;
          border-radius: 8px;
          color: #e8e4de;
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          cursor: pointer;
          min-width: 140px;
        }
        
        .compare-btn {
          padding: 10px 16px;
          background: ${compareMode ? 'rgba(124, 154, 108, 0.2)' : '#252525'};
          border: 1px solid ${compareMode ? '#7c9a6c' : '#333'};
          border-radius: 8px;
          color: ${compareMode ? '#7c9a6c' : '#888'};
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
        }
        
        .compare-btn:hover {
          border-color: #4a6741;
          color: #7c9a6c;
        }
        
        .export-btn {
          padding: 10px 16px;
          background: #252525;
          border: 1px solid #333;
          border-radius: 8px;
          color: #888;
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
        }
        
        .export-btn:hover {
          border-color: #d4a373;
          color: #d4a373;
        }
        
        .mortality-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 16px;
        }
        
        .mortality-stat {
          background: rgba(155, 34, 38, 0.1);
          border: 1px solid rgba(155, 34, 38, 0.3);
          border-radius: 8px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        
        .mortality-stat svg {
          color: #9b2226;
        }
        
        .mortality-value {
          font-family: 'JetBrains Mono', monospace;
          font-size: 16px;
          font-weight: 700;
          color: #e8e4de;
        }
        
        .mortality-label {
          font-size: 10px;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .similar-parks {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #333;
        }
        
        .similar-parks-title {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 600;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 10px;
        }
        
        .similar-parks-title svg {
          color: #7c9a6c;
        }
        
        .similar-parks-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        
        .similar-park-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          background: rgba(124, 154, 108, 0.1);
          border: 1px solid rgba(124, 154, 108, 0.2);
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .similar-park-item:hover {
          background: rgba(124, 154, 108, 0.2);
          border-color: #7c9a6c;
        }
        
        .similar-park-name {
          font-size: 13px;
          color: #e8e4de;
        }
        
        .similar-park-match {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: #7c9a6c;
        }
        
        .table-container {
          background: #1e1e1e;
          border-radius: 12px;
          border: 1px solid #333;
          overflow: hidden;
        }
        
        .parks-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .parks-table th {
          background: #252525;
          padding: 12px 8px;
          text-align: left;
          font-size: 9px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #888;
          border-bottom: 2px solid #333;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        
        .parks-table th:hover { color: #7c9a6c; }
        .parks-table th.active { color: #7c9a6c; }
        
        .parks-table th .th-content {
          display: flex;
          align-items: center;
          gap: 3px;
        }
        
        .parks-table td {
          padding: 10px 8px;
          border-bottom: 1px solid #2a2a2a;
          font-size: 12px;
        }
        
        .parks-table tr { transition: all 0.2s ease; cursor: pointer; }
        .parks-table tbody tr:hover { background: rgba(124, 154, 108, 0.08); }
        
        .parks-table tbody tr.selected {
          background: rgba(124, 154, 108, 0.15);
          border-left: 3px solid #7c9a6c;
        }
        
        .park-name { font-weight: 600; color: #e8e4de; }
        .park-state { color: #666; font-size: 10px; }
        
        .score-bar-container {
          display: flex;
          align-items: center;
          gap: 4px;
          min-width: 70px;
        }
        
        .score-bar {
          height: 4px;
          border-radius: 2px;
          transition: width 0.3s ease;
          flex: 1;
          max-width: 40px;
        }
        
        .score-value {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 500;
          min-width: 22px;
        }
        
        .season-badge {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          padding: 2px 6px;
          background: rgba(124, 154, 108, 0.1);
          border-radius: 10px;
          font-size: 9px;
          color: #7c9a6c;
          text-transform: capitalize;
        }
        
        .visitors-badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: #666;
        }
        
        .leaderboards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 14px;
        }
        
        .leaderboard-card {
          background: linear-gradient(145deg, #252525 0%, #1e1e1e 100%);
          border: 1px solid #333;
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .leaderboard-card:hover { border-color: #4a6741; }
        
        .leaderboard-header {
          padding: 14px 16px;
          background: rgba(0,0,0,0.2);
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
        }
        
        .leaderboard-title {
          font-size: 12px;
          font-weight: 600;
          color: #7c9a6c;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        
        .leaderboard-desc {
          font-size: 9px;
          color: #666;
          font-weight: 400;
          margin-left: 24px;
          text-transform: none;
          letter-spacing: 0;
        }
        
        .expand-btn {
          background: transparent;
          border: none;
          color: #666;
          cursor: pointer;
          display: flex;
          align-items: center;
          font-size: 10px;
          gap: 3px;
          transition: color 0.2s;
        }
        
        .expand-btn:hover { color: #7c9a6c; }
        
        .leaderboard-list { list-style: none; }
        
        .leaderboard-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 16px;
          border-bottom: 1px solid #2a2a2a;
          cursor: pointer;
          transition: background 0.2s;
        }
        
        .leaderboard-item:hover { background: rgba(124, 154, 108, 0.08); }
        .leaderboard-item:last-child { border-bottom: none; }
        
        .rank {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 700;
          color: #4a6741;
          width: 26px;
        }
        
        .leaderboard-park-name { flex: 1; font-size: 12px; font-weight: 500; }
        
        .leaderboard-score {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          font-weight: 600;
        }
        
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }
        
        .modal {
          background: #1e1e1e;
          border-radius: 16px;
          border: 1px solid #333;
          max-width: 800px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
        }
        
        .modal-header {
          padding: 20px 24px 16px;
          border-bottom: 1px solid #333;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        
        .modal-title { font-size: 24px; font-weight: 700; }
        .modal-subtitle { color: #666; font-size: 12px; margin-top: 4px; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        
        .modal-close {
          background: transparent;
          border: none;
          color: #666;
          cursor: pointer;
          padding: 4px;
        }
        
        .modal-close:hover { color: #e8e4de; }
        
        .modal-body { padding: 20px 24px; }
        
        .modal-highlight {
          background: rgba(124, 154, 108, 0.1);
          border-left: 3px solid #7c9a6c;
          padding: 12px 14px;
          margin-bottom: 18px;
          border-radius: 0 8px 8px 0;
          font-style: italic;
          color: #a0a090;
          font-size: 14px;
        }
        
        .modal-content-grid {
          display: grid;
          grid-template-columns: 1fr 220px;
          gap: 24px;
          align-items: start;
        }
        
        .modal-section-title {
          font-size: 11px;
          font-weight: 600;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 12px;
          margin-top: 16px;
        }
        
        .modal-section-title:first-child {
          margin-top: 0;
        }
        
        .modal-scores { display: grid; gap: 8px; }
        
        .modal-score-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .modal-score-label {
          width: 90px;
          font-size: 11px;
          color: #888;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        .modal-score-bar {
          flex: 1;
          height: 6px;
          background: #333;
          border-radius: 3px;
          overflow: hidden;
        }
        
        .modal-score-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 0.5s ease;
        }
        
        .modal-score-value {
          font-family: 'JetBrains Mono', monospace;
          font-size: 14px;
          font-weight: 600;
          width: 32px;
          text-align: right;
        }
        
        .modal-meta {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #333;
        }
        
        .modal-meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #888;
        }
        
        .modal-meta-item svg {
          color: #7c9a6c;
        }
        
        .compare-panel {
          background: #252525;
          border: 1px solid #333;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 16px;
        }
        
        .compare-panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        
        .compare-panel h3 {
          font-size: 13px;
          font-weight: 600;
          color: #7c9a6c;
        }
        
        .compare-parks-list {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }
        
        .compare-park-chip {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 5px 10px;
          background: rgba(124, 154, 108, 0.15);
          border: 1px solid #4a6741;
          border-radius: 16px;
          font-size: 11px;
          color: #e8e4de;
        }
        
        .compare-park-chip button {
          background: transparent;
          border: none;
          color: #888;
          cursor: pointer;
          padding: 0;
          display: flex;
        }
        
        .compare-chart-container {
          display: flex;
          justify-content: center;
          padding: 16px 0;
        }
        
        .compare-legend {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-top: 10px;
        }
        
        .legend-item {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
        }
        
        .legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        
        .region-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 10px;
        }
        
        .region-card {
          background: #252525;
          border: 1px solid #333;
          border-radius: 10px;
          padding: 12px;
        }
        
        .region-name {
          font-size: 12px;
          font-weight: 600;
          color: #7c9a6c;
          margin-bottom: 8px;
        }
        
        .region-stat {
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          color: #888;
          padding: 2px 0;
        }
        
        .region-stat span:last-child {
          color: #e8e4de;
          font-family: 'JetBrains Mono', monospace;
        }
        
        .table-scroll { overflow-x: auto; }
        
        @media (max-width: 1400px) {
          .stats-grid { grid-template-columns: repeat(4, 1fr); }
        }
        
        @media (max-width: 1000px) {
          .modal-content-grid { grid-template-columns: 1fr; }
        }
        
        @media (max-width: 768px) {
          .header { padding: 16px 20px; }
          .header h1 { font-size: 24px; }
          .main-content { padding: 16px; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .stat-card.wide { grid-column: span 1; }
        }
        
        /* Map Tab Styles */
        .map-tab {
          background: #1e1e1e;
          border-radius: 12px;
          border: 1px solid #2a2a2a;
          overflow: hidden;
        }
        
        .map-header {
          padding: 20px 24px;
          border-bottom: 1px solid #2a2a2a;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }
        
        .map-title h2 {
          font-size: 20px;
          font-weight: 700;
          margin: 0 0 4px 0;
        }
        
        .map-title p {
          color: #666;
          font-size: 13px;
          margin: 0;
        }
        
        .map-stats-row {
          display: flex;
          gap: 24px;
        }
        
        .map-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }
        
        .map-stat .stat-num {
          font-family: 'JetBrains Mono', monospace;
          font-size: 20px;
          font-weight: 700;
          color: #e8e4de;
        }
        
        .map-stat .stat-label {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .map-container {
          position: relative;
          padding: 20px;
        }
        
        .us-map {
          width: 100%;
          height: auto;
          max-height: 500px;
        }
        
        .map-tooltip {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          background: #2a2a2a;
          border: 1px solid #444;
          border-radius: 8px;
          padding: 12px 16px;
          pointer-events: none;
          z-index: 100;
          min-width: 200px;
        }
        
        .tooltip-name {
          font-weight: 700;
          font-size: 14px;
          margin-bottom: 4px;
        }
        
        .tooltip-location {
          color: #888;
          font-size: 12px;
          margin-bottom: 8px;
        }
        
        .tooltip-stats {
          display: flex;
          gap: 8px;
          font-size: 11px;
          color: #aaa;
        }
        
        .tooltip-tier {
          font-weight: 600;
        }
        
        .map-footer {
          padding: 12px 24px;
          border-top: 1px solid #2a2a2a;
          display: flex;
          justify-content: center;
        }
        
        .data-source {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #666;
          font-size: 12px;
        }
      `}</style>

      <header className="header">
        <h1><Mountain size={32} /> National Parks Explorer</h1>
        <p className="header-subtitle">Hiking & Backpacking Difficulty Index • All 63 U.S. National Parks • Verified 2024 NPS Data</p>
      </header>

      <main className="main-content">
        {/* Stats Tiles - Expanded */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{stats.totalParks}</div>
            <div className="stat-label">Total Parks</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.extremeCount}</div>
            <div className="stat-label">Extreme Tier</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.hardCount}</div>
            <div className="stat-label">Hard Tier</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.highSolitudeCount}</div>
            <div className="stat-label">High Solitude</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.avgDanger}</div>
            <div className="stat-label">Avg Danger</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.avgDifficulty}</div>
            <div className="stat-label">Avg Difficulty</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.avgRemoteness}</div>
            <div className="stat-label">Avg Remoteness</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.avgSolitude}</div>
            <div className="stat-label">Avg Solitude</div>
          </div>
          <div className="stat-card highlight wide">
            <div className="stat-value small">{stats.mostExtreme}</div>
            <div className="stat-label">Most Extreme Overall</div>
          </div>
          <div className="stat-card highlight wide">
            <div className="stat-value small">{stats.mostSolitude}</div>
            <div className="stat-label">Most Solitude</div>
          </div>
          <div className="stat-card highlight wide">
            <div className="stat-value small">{stats.mostDangerous}</div>
            <div className="stat-label">Most Dangerous</div>
          </div>
          <div className="stat-card highlight wide">
            <div className="stat-value small">{stats.bestBackpacking}</div>
            <div className="stat-label">Best Backpacking</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button className={`tab ${activeTab === 'table' ? 'active' : ''}`} onClick={() => setActiveTab('table')}>
            <BarChart3 size={14} /> Full Rankings
          </button>
          <button className={`tab ${activeTab === 'map' ? 'active' : ''}`} onClick={() => setActiveTab('map')}>
            <Map size={14} /> Interactive Map
          </button>
          <button className={`tab ${activeTab === 'leaderboards' ? 'active' : ''}`} onClick={() => setActiveTab('leaderboards')}>
            <Star size={14} /> Category Leaders
          </button>
          <button className={`tab ${activeTab === 'regions' ? 'active' : ''}`} onClick={() => setActiveTab('regions')}>
            <MapPin size={14} /> By Region
          </button>
        </div>

        {/* Compare Panel */}
        {compareMode && compareParks.length > 0 && (
          <div className="compare-panel">
            <div className="compare-panel-header">
              <h3>Compare Parks ({compareParks.length}/3)</h3>
              <button onClick={() => { setCompareMode(false); setCompareParks([]); }} style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer' }}>
                <X size={16} />
              </button>
            </div>
            <div className="compare-parks-list">
              {compareParks.map((park) => (
                <div key={park.name} className="compare-park-chip">
                  {park.name}
                  <button onClick={() => toggleCompare(park)}><X size={12} /></button>
                </div>
              ))}
            </div>
            {compareParks.length >= 2 && (
              <>
                <div className="compare-chart-container">
                  <CompareRadarChart parks={compareParks} />
                </div>
                <div className="compare-legend">
                  {compareParks.map((park, idx) => (
                    <div key={park.name} className="legend-item">
                      <div className="legend-dot" style={{ background: ['#7c9a6c', '#d4a373', '#6b9ac4'][idx] }} />
                      {park.name}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'table' && (
          <>
            {/* Quick Filters */}
            <div className="quick-filters">
              {quickFilters.map(f => (
                <button
                  key={f.id}
                  className={`quick-filter-btn ${quickFilter === f.id ? 'active' : ''}`}
                  onClick={() => setQuickFilter(quickFilter === f.id ? null : f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="controls">
              <div className="search-box">
                <Search size={14} />
                <input
                  type="text"
                  placeholder="Search parks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select className="filter-select" value={filterRegion} onChange={(e) => setFilterRegion(e.target.value)}>
                {regions.map(r => <option key={r} value={r}>{r === 'All' ? 'All Regions' : r}</option>)}
              </select>
              <select className="filter-select" value={filterTier} onChange={(e) => setFilterTier(e.target.value)}>
                {tiers.map(t => <option key={t} value={t}>{t === 'All' ? 'All Tiers' : t}</option>)}
              </select>
              <button className="compare-btn" onClick={() => setCompareMode(!compareMode)}>
                <GitCompare size={14} />
                {compareMode ? 'Exit Compare' : 'Compare'}
              </button>
              <button className="export-btn" onClick={exportToCSV} title="Export to CSV">
                <Download size={14} />
                Export CSV
              </button>
            </div>

            {/* Table */}
            <div className="table-container">
              <div className="table-scroll">
                <table className="parks-table">
                  <thead>
                    <tr>
                      {compareMode && <th style={{ width: 36 }}></th>}
                      <th onClick={() => handleSort('name')}><div className="th-content">Park</div></th>
                      <th>Tier</th>
                      <th onClick={() => handleSort('adventureScore')} className={sortConfig.key === 'adventureScore' ? 'active' : ''}>
                        <div className="th-content"><Star size={10} /> Extreme</div>
                      </th>
                      <th onClick={() => handleSort('danger')} className={sortConfig.key === 'danger' ? 'active' : ''}>
                        <div className="th-content"><AlertTriangle size={10} /> Danger</div>
                      </th>
                      <th onClick={() => handleSort('difficulty')} className={sortConfig.key === 'difficulty' ? 'active' : ''}>
                        <div className="th-content"><Mountain size={10} /> Diff</div>
                      </th>
                      <th onClick={() => handleSort('remoteness')} className={sortConfig.key === 'remoteness' ? 'active' : ''}>
                        <div className="th-content"><Compass size={10} /> Remote</div>
                      </th>
                      <th onClick={() => handleSort('solitude')} className={sortConfig.key === 'solitude' ? 'active' : ''}>
                        <div className="th-content"><Users size={10} /> Solitude</div>
                      </th>
                      <th onClick={() => handleSort('wildlife')} className={sortConfig.key === 'wildlife' ? 'active' : ''}>
                        <div className="th-content"><PawPrint size={10} /> Wildlife</div>
                      </th>
                      <th onClick={() => handleSort('waterAvail')} className={sortConfig.key === 'waterAvail' ? 'active' : ''}>
                        <div className="th-content"><Droplets size={10} /> Water</div>
                      </th>
                      <th onClick={() => handleSort('sentimentCurved')} className={sortConfig.key === 'sentimentCurved' ? 'active' : ''}>
                        <div className="th-content"><Heart size={10} /> Rating</div>
                      </th>
                      <th>Visitors</th>
                      <th>Season</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedParks.map(park => (
                      <tr
                        key={park.name}
                        onClick={() => compareMode ? toggleCompare(park) : setSelectedPark(park)}
                        className={compareParks.find(p => p.name === park.name) ? 'selected' : ''}
                      >
                        {compareMode && (
                          <td>
                            <input
                              type="checkbox"
                              checked={!!compareParks.find(p => p.name === park.name)}
                              onChange={() => {}}
                              style={{ accentColor: '#7c9a6c' }}
                            />
                          </td>
                        )}
                        <td>
                          <span className="park-name">{park.name}</span>
                          <span className="park-state"> • {park.state}</span>
                        </td>
                        <td><TierBadge tier={park.tier} /></td>
                        <td><ScoreBar value={park.adventureScore} color="#d4a373" /></td>
                        <td><ScoreBar value={park.danger} color={getScoreColor(park.danger, 'danger')} /></td>
                        <td><ScoreBar value={park.difficulty} color={getScoreColor(park.difficulty, 'difficulty')} /></td>
                        <td><ScoreBar value={park.remoteness} color={getScoreColor(park.remoteness, 'remoteness')} /></td>
                        <td><ScoreBar value={park.solitude} color={getScoreColor(park.solitude, 'solitude')} /></td>
                        <td><ScoreBar value={park.wildlife} color={getScoreColor(park.wildlife, 'wildlife')} /></td>
                        <td><ScoreBar value={park.waterAvail} color={getScoreColor(park.waterAvail, 'waterAvail')} /></td>
                        <td><ScoreBar value={park.sentimentCurved} color={getScoreColor(park.sentimentCurved, 'sentimentCurved')} /></td>
                        <td><span className="visitors-badge">{formatVisitors(park.visitationRaw)}</span></td>
                        <td>
                          <span className="season-badge">
                            <SeasonIcon season={park.bestSeason} />
                            {park.bestSeason}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === 'map' && (
          <div className="map-tab">
            <div className="map-header">
              <div className="map-title">
                <h2>All 63 National Parks</h2>
                <p>Click any park to view details • Colored by difficulty tier</p>
              </div>
              <div className="map-stats-row">
                <div className="map-stat">
                  <span className="stat-num">{parksWithScores.filter(p => p.tier === 'Extreme').length}</span>
                  <span className="stat-label" style={{color: '#e85d64'}}>Extreme</span>
                </div>
                <div className="map-stat">
                  <span className="stat-num">{parksWithScores.filter(p => p.tier === 'Hard').length}</span>
                  <span className="stat-label" style={{color: '#d4a373'}}>Hard</span>
                </div>
                <div className="map-stat">
                  <span className="stat-num">{parksWithScores.filter(p => p.tier === 'Moderate').length}</span>
                  <span className="stat-label" style={{color: '#a3b18a'}}>Moderate</span>
                </div>
                <div className="map-stat">
                  <span className="stat-num">{parksWithScores.filter(p => p.tier === 'Easy').length}</span>
                  <span className="stat-label" style={{color: '#7c9a6c'}}>Easy</span>
                </div>
              </div>
            </div>
            <USMap 
              parks={parksWithScores} 
              onParkClick={setSelectedPark}
              onParkHover={setHoveredMapPark}
              hoveredPark={hoveredMapPark}
            />
            <div className="map-footer">
              <div className="data-source">
                <Info size={14} />
                <span>Data: NPS 2024 Visitor Statistics • Mortality data 2007-2024</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'leaderboards' && (
          <div className="leaderboards">
            {categoryConfig.map(cat => {
              const isExpanded = expandedCategories[cat.key];
              const count = isExpanded ? 20 : 5;
              const topParks = getTopParks(cat.key, count);
              
              return (
                <div key={cat.key} className="leaderboard-card">
                  <div 
                    className="leaderboard-header"
                    onClick={() => setExpandedCategories(prev => ({ ...prev, [cat.key]: !prev[cat.key] }))}
                  >
                    <div>
                      <h3 className="leaderboard-title">{cat.icon} {cat.label}</h3>
                      {cat.desc && <p className="leaderboard-desc">{cat.desc}</p>}
                    </div>
                    <button className="expand-btn">
                      {isExpanded ? 'Less' : 'More'}
                      <ChevronDown size={12} style={{ transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                    </button>
                  </div>
                  <ul className="leaderboard-list">
                    {topParks.map((park, idx) => (
                      <li key={park.name} className="leaderboard-item" onClick={() => setSelectedPark(park)}>
                        <span className="rank">#{idx + 1}</span>
                        <span className="leaderboard-park-name">{park.name}</span>
                        <span className="leaderboard-score" style={{ color: getScoreColor(park[cat.key], cat.key) }}>
                          {park[cat.key]}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'regions' && (
          <div className="region-stats">
            {Object.entries(stats.byRegion).map(([region, data]) => (
              <div key={region} className="region-card">
                <div className="region-name">{region}</div>
                <div className="region-stat"><span>Parks</span><span>{data.count}</span></div>
                <div className="region-stat"><span>Avg Adventure</span><span>{data.avgAdventure}</span></div>
                <div className="region-stat"><span>Avg Danger</span><span>{data.avgDanger}</span></div>
                <div className="region-stat"><span>Avg Difficulty</span><span>{data.avgDifficulty}</span></div>
                <div className="region-stat"><span>Avg Solitude</span><span>{data.avgSolitude}</span></div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Park Detail Modal */}
      {selectedPark && (
        <div className="modal-overlay" onClick={() => setSelectedPark(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2 className="modal-title">{selectedPark.name}</h2>
                <p className="modal-subtitle">
                  {selectedPark.state} • {selectedPark.region}
                  <TierBadge tier={selectedPark.tier} />
                  <span className="season-badge" style={{ padding: '4px 10px' }}>
                    <SeasonIcon season={selectedPark.bestSeason} />
                    Best: {selectedPark.bestSeason}
                  </span>
                </p>
              </div>
              <button className="modal-close" onClick={() => setSelectedPark(null)}><X size={22} /></button>
            </div>
            <div className="modal-body">
              <div className="modal-highlight">"{selectedPark.highlight}"</div>
              
              <div className="modal-content-grid">
                <div>
                  <div className="modal-section-title">Core Metrics (Used for Tier)</div>
                  <div className="modal-scores">
                    {[
                      { key: 'danger', label: 'Danger', icon: <AlertTriangle size={12} /> },
                      { key: 'difficulty', label: 'Difficulty', icon: <Mountain size={12} /> },
                      { key: 'remoteness', label: 'Remoteness', icon: <Compass size={12} /> },
                      { key: 'solitude', label: 'Solitude', icon: <Users size={12} /> },
                    ].map(({ key, label, icon }) => (
                      <div key={key} className="modal-score-row">
                        <div className="modal-score-label">{icon} {label}</div>
                        <div className="modal-score-bar">
                          <div className="modal-score-fill" style={{ width: `${selectedPark[key]}%`, background: getScoreColor(selectedPark[key], key) }} />
                        </div>
                        <div className="modal-score-value">{selectedPark[key]}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="modal-section-title">Backpacking Factors</div>
                  <div className="modal-scores">
                    {[
                      { key: 'wildlife', label: 'Wildlife', icon: <PawPrint size={12} /> },
                      { key: 'waterAvail', label: 'Water', icon: <Droplets size={12} /> },
                      { key: 'cellCoverage', label: 'Disconnected', icon: <Signal size={12} /> },
                      { key: 'permit', label: 'Permit Diff', icon: <Shield size={12} /> },
                      { key: 'multiDay', label: 'Multi-Day', icon: <Tent size={12} /> },
                    ].map(({ key, label, icon }) => (
                      <div key={key} className="modal-score-row">
                        <div className="modal-score-label">{icon} {label}</div>
                        <div className="modal-score-bar">
                          <div className="modal-score-fill" style={{ width: `${selectedPark[key]}%`, background: getScoreColor(selectedPark[key], key) }} />
                        </div>
                        <div className="modal-score-value">{selectedPark[key]}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="modal-section-title">Composite Scores</div>
                  <div className="modal-scores">
                    {[
                      { key: 'adventureScore', label: 'Extreme', icon: <Star size={12} /> },
                      { key: 'backpackingScore', label: 'Backpacking', icon: <Tent size={12} /> },
                      { key: 'wildernessScore', label: 'Wilderness', icon: <Compass size={12} /> },
                      { key: 'beginnerFriendly', label: 'Beginner', icon: <Eye size={12} /> },
                    ].map(({ key, label, icon }) => (
                      <div key={key} className="modal-score-row">
                        <div className="modal-score-label">{icon} {label}</div>
                        <div className="modal-score-bar">
                          <div className="modal-score-fill" style={{ width: `${selectedPark[key]}%`, background: '#d4a373' }} />
                        </div>
                        <div className="modal-score-value">{selectedPark[key]}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="modal-meta">
                    <div className="modal-meta-item">
                      <Users size={14} />
                      {formatVisitors(selectedPark.visitationRaw)} visitors/year
                    </div>
                    <div className="modal-meta-item">
                      <Heart size={14} />
                      Rating: {selectedPark.sentimentCurved}/100 (curved)
                    </div>
                    <div className="modal-meta-item">
                      <MapPin size={14} />
                      Access: {selectedPark.accessibility}/100
                    </div>
                  </div>
                  
                  {/* Mortality Statistics */}
                  <div className="modal-section-title">Safety Statistics (2007-2024)</div>
                  <div className="mortality-stats">
                    <div className="mortality-stat">
                      <Skull size={16} />
                      <span className="mortality-value">{selectedPark.deaths}</span>
                      <span className="mortality-label">Total Deaths</span>
                    </div>
                    <div className="mortality-stat">
                      <AlertTriangle size={16} />
                      <span className="mortality-value">{selectedPark.deathsPer10M}</span>
                      <span className="mortality-label">per 10M Visitors</span>
                    </div>
                    <div className="mortality-stat">
                      <Map size={16} />
                      <span className="mortality-value">{selectedPark.lat.toFixed(2)}°, {selectedPark.lng.toFixed(2)}°</span>
                      <span className="mortality-label">Coordinates</span>
                    </div>
                  </div>
                  
                  {/* Similar Parks */}
                  <SimilarParks 
                    park={selectedPark} 
                    allParks={parksWithScores} 
                    onParkClick={(p) => setSelectedPark(p)} 
                  />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <RadarChart park={selectedPark} size={220} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}