import React from 'react'

export default function SearchBar() {
  return (
    <div className='mt-7 flex items-center gap-4'>
      <input type="text" className='border border-gray-300 focus:outline-blue-600 py-[10px] px-3 flex-1 rounded-lg' />
      <button className='p-2 bg-blue-600 text-white text-lg px-6 rounded'>Search</button>
    </div>
  )
}
