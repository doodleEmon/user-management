'use client'

import { useRouter } from 'next/navigation';
import React from 'react'
import { HiArrowLongLeft } from 'react-icons/hi2'

export default function UserDetails() {
  const router = useRouter();
    
  return (
    <div className='bg-white p-6 rounded-lg'>
      <div className='flex items-center justify-between'>
        <button onClick={() => router.back()} className='flex items-center gap-x-1 px-4 py-2 bg-gray-200 cursor-pointer rounded-lg text-[17px] text-gray-800 hover:bg-gray-300'><HiArrowLongLeft /> Back to Users</button>
        <h3 className='text-3xl font-semibold'>User Details</h3>
      </div>
    </div>
  )
}
