'use client'
import { useDeleteListingByAdminMutation, useGetAllListingsQuery } from '@/redux/apis/admin.slice'
import Image from 'next/image'
import React from 'react'

export default function Page() {
  const { data, isLoading, error } = useGetAllListingsQuery({})
  const [deleteByAdmin] = useDeleteListingByAdminMutation()
  
  if (isLoading) return <div className="text-center py-8">Loading listings...</div>
  if (error) return <div className="text-center py-8 text-red-500">Error loading listings</div>
  if (!data?.data?.length) return <div className="text-center py-8">No listings available</div>
  
  const handleDeleteListing = (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Landlord?"
    );
    if (confirmDelete) {
      console.log("Delete user with ID:", id);
      // deleteByAdmin(id);
      deleteByAdmin(id)
    } 


  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Property Listings</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rent</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bedrooms</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.data.map((listing: any) => (
              <tr key={listing._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <Image
                    src={listing.imageUrls || '/placeholder.jpg'}
                    alt="Property"
                    className="border-2 border-gray-300 rounded-lg"
                    width={64}
                    height={64}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{listing.location}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-gray-600 max-w-xs truncate">{listing.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {listing.rent}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-900">{listing.bedrooms}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    className="text-blue-600 hover:text-blue-900 mr-4"
                    onClick={() => handleUpdate(listing._id)}
                  >
                    Update
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDeleteListing(listing._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-sm text-gray-500">
        Showing {data.data.length} {data.data.length === 1 ? 'listing' : 'listings'}
      </div>
    </div>
  )

  function handleUpdate(id: string) {
    console.log('Update listing with ID:', id)
    // Add your update logic here
  }

  function handleDelete(id: string) {
    console.log('Delete listing with ID:', id)
    // Add your delete logic here
  }
}