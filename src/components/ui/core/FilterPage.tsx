'use client' 
 
import { useGetAllListingTenantQuery } from '@/redux/apis/tenant.slice';
// If not exported, replace with the correct hook or function name from tenant.slice
import React, { useState } from 'react';

const FilterPage = () => {
  const [location, setLocation] = useState('update');
  const [bedrooms, setBedrooms] = useState('');
  const [minRent, setminRent] = useState('');
  const [maxRent, setmaxRent] = useState('');
  
  const { data } = useGetAllListingTenantQuery({
    location,
    bedrooms,
    minRent,
    maxRent,
  });
  console.log(data);
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = {
      location,
      bedrooms,
      minRent,maxRent

    };
    
    // Send the query parameters to the backend or API
    console.log('Query Parameters:', query);
    // filterTenantQuery()
    // Example: call an API here with the query parameters (e.g., axios)
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6">
      <div className="flex flex-col">
        <label htmlFor="location" className="text-gray-700">Location:</label>
        <input
          id="location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border rounded-lg p-2"
          placeholder="Enter location"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="bedrooms" className="text-gray-700">Bedrooms:</label>
        <input
          id="bedrooms"
          type="number"
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
          className="border rounded-lg p-2"
          placeholder="Enter number of bedrooms"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="rentGte" className="text-gray-700">Rent (Minimum):</label>
        <input
          id="rentGte"
          type="number"
          value={minRent}
          onChange={(e) => setminRent(e.target.value)}
          className="border rounded-lg p-2"
          placeholder="Enter minimum rent"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="rentLte" className="text-gray-700">Rent (Maximum):</label>
        <input
          id="rentLte"
          type="number"
          value={maxRent}
          onChange={(e) => setmaxRent(e.target.value)}
          className="border rounded-lg p-2"
          placeholder="Enter maximum rent"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white rounded-lg p-2 w-full hover:bg-blue-700 transition"
      >
        Search Listings
      </button>
    </form>
  );
};

export default FilterPage;
