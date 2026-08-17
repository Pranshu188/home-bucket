import React, { createContext, useState, useEffect } from 'react';
import { mockProperties } from '../data/properties';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation / Routing
  const [activePage, setActivePage] = useState('home');
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);

  // User Authentication
  const [currentUser, setCurrentUser] = useState({
    name: 'Siddharth Patel',
    email: 'siddharth.patel@bba.edu',
    role: 'Looking for Property',
    phone: '+91 98795 98795',
    savedCount: 3,
    scheduledVisits: 1
  });
  const [showLogin, setShowLogin] = useState(false);

  // Favorites (Stored in localStorage or initialized with defaults)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('hb_favorites');
    return saved ? JSON.parse(saved) : [1, 3, 5]; // Default favorites
  });

  // Comparison list (Max 3)
  const [compareList, setCompareList] = useState(() => {
    const saved = localStorage.getItem('hb_compare');
    return saved ? JSON.parse(saved) : [];
  });

  // Scheduled Visits
  const [visits, setVisits] = useState(() => {
    const saved = localStorage.getItem('hb_visits');
    return saved ? JSON.parse(saved) : [
      {
        id: 'v_init_1',
        propertyId: 1,
        propertyName: "Modern 2 BHK Skyline Apartment",
        location: "Satellite",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
        date: "2026-08-22",
        time: "10:00 AM",
        contactPerson: "Rajesh Patel (Owner)",
        status: "Scheduled"
      }
    ];
  });

  // User Listed Properties
  const [userListings, setUserListings] = useState(() => {
    const saved = localStorage.getItem('hb_user_listings');
    return saved ? JSON.parse(saved) : [];
  });

  // Global search filters
  const [searchFilters, setSearchFilters] = useState({
    purpose: 'Rent',
    location: 'Ahmedabad',
    type: 'Any',
    budgetMin: 0,
    budgetMax: 100000
  });

  // AI recommendations search trigger
  const [aiRecPreferences, setAiRecPreferences] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('hb_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('hb_compare', JSON.stringify(compareList));
  }, [compareList]);

  useEffect(() => {
    localStorage.setItem('hb_visits', JSON.stringify(visits));
  }, [visits]);

  useEffect(() => {
    localStorage.setItem('hb_user_listings', JSON.stringify(userListings));
  }, [userListings]);

  // Actions
  const toggleFavorite = (propertyId) => {
    setFavorites(prev => {
      if (prev.includes(propertyId)) {
        return prev.filter(id => id !== propertyId);
      } else {
        return [...prev, propertyId];
      }
    });
  };

  const addToCompare = (property) => {
    setCompareList(prev => {
      // Check if already in list
      if (prev.find(p => p.id === property.id)) {
        return prev.filter(p => p.id !== property.id); // Toggle out
      }
      if (prev.length >= 3) {
        alert("You can compare up to 3 properties side-by-side. Please remove one first.");
        return prev;
      }
      return [...prev, property];
    });
  };

  const removeFromCompare = (propertyId) => {
    setCompareList(prev => prev.filter(p => p.id !== propertyId));
  };

  const bookVisit = (property, date, time) => {
    const newVisit = {
      id: 'v_' + Date.now(),
      propertyId: property.id,
      propertyName: property.name,
      location: property.location,
      image: property.image,
      date,
      time,
      contactPerson: `${property.ownerName} (${property.ownerType})`,
      status: "Scheduled"
    };
    setVisits(prev => [...prev, newVisit]);
    return newVisit;
  };

  const cancelVisit = (visitId) => {
    setVisits(prev => prev.filter(v => v.id !== visitId));
  };

  const listNewProperty = (propertyData) => {
    const newProperty = {
      ...propertyData,
      id: 'user_' + Date.now(),
      city: "Ahmedabad",
      image: propertyData.image || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
      verifiedStatus: "Verification Pending",
      lastVerified: "Verification in progress",
      ownerName: currentUser ? currentUser.name : "Owner",
      ownerType: "Owner",
      ownerPhone: currentUser ? currentUser.phone : "+91 99999 99999",
      calculator: {
        maintenance: parseInt(propertyData.maintenance) || 1200,
        parking: parseInt(propertyData.parking) || 0,
        utilities: 2000,
        internet: 700
      },
      neighbourhood: {
        safety: 4.5,
        transit: 4.2,
        lifestyle: 4.3,
        connectivity: 4.4,
        places: [
          { name: "Local School", type: "School", distance: "1.0 km" },
          { name: "City Hospital", type: "Hospital", distance: "2.0 km" },
          { name: "Supermarket", type: "Supermarket", distance: "500 m" }
        ]
      }
    };
    setUserListings(prev => [newProperty, ...prev]);
    return newProperty;
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  // Combine mock properties and user listings
  const allProperties = [...userListings, ...mockProperties];

  return (
    <AppContext.Provider value={{
      activePage,
      setActivePage,
      selectedPropertyId,
      setSelectedPropertyId,
      currentUser,
      setCurrentUser,
      showLogin,
      setShowLogin,
      favorites,
      toggleFavorite,
      compareList,
      addToCompare,
      removeFromCompare,
      visits,
      bookVisit,
      cancelVisit,
      userListings,
      listNewProperty,
      searchFilters,
      setSearchFilters,
      aiRecPreferences,
      setAiRecPreferences,
      allProperties,
      handleLogin,
      handleLogout
    }}>
      {children}
    </AppContext.Provider>
  );
};
