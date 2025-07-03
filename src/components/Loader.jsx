import React from 'react'

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative">
        {/* Outer Loader with Gradient */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-transparent border-t-blue-500 border-b-white shadow-xl"></div>

        {/* Inner Circle */}
        <div className="absolute top-2 left-2 h-12 w-12 bg-gradient-to-r from-blue-500 to-white rounded-full"></div>
      </div>
    </div>
  )
}
