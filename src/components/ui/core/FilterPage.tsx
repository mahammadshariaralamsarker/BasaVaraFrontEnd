"use client";

import { useGetAllListingTenantQuery } from "@/redux/apis/tenant.slice";
// If not exported, replace with the correct hook or function name from tenant.slice
import React, { useState } from "react";

const FilterPage = () => {
  const [location, setLocation] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [minRent, setminRent] = useState("");
  const [maxRent, setmaxRent] = useState("");

  const query = {
    location,
    bedrooms,
    minRent,
    maxRent,
  };

  const { data, refetch } = useGetAllListingTenantQuery(query, {
    skip: !query,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query) {
      refetch();
    }
  };
console.log(data);
  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6    ">
      <div className="flex justify-between">
      <div className=" ">
        <label htmlFor="location" className="text-gray-700 mr-4">
          Location:
        </label>
        <input
          id="location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border rounded-lg p-2"
          placeholder="Enter location"
        />
      </div>

      <div className="   ">
        <label htmlFor="bedrooms" className="text-gray-700  mr-4">
          Bedrooms:
        </label>
        <input
          id="bedrooms"
          type="number"
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
          className="border rounded-lg p-2"
          placeholder="Enter number of bedrooms"
        />
      </div>
    

      <div className="">
        <label htmlFor="rentGte" className="text-gray-700  mr-4">
          Rent (Minimum):
        </label>
        <input
          id="rentGte"
          type="number"
          value={minRent}
          onChange={(e) => setminRent(e.target.value)}
          className="border rounded-lg p-2"
          placeholder="Enter minimum rent"
        />
      </div>

      <div className=" ">
        <label htmlFor="rentLte" className="text-gray-700  mr-4">
          Rent (Maximum):
        </label>
        <input
          id="rentLte"
          type="number"
          value={maxRent}
          onChange={(e) => setmaxRent(e.target.value)}
          className="border rounded-lg p-2"
          placeholder="Enter maximum rent"
        />
      </div>
      
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white rounded-lg p-2 w-1/2 hover:bg-blue-700 transition"
      >
        Search Listings
      </button>
    </form>
  );
};

export default FilterPage;
