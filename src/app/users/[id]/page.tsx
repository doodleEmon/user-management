'use client'

import { User } from '@/types/user';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { HiArrowLongLeft } from 'react-icons/hi2'

export default function UserDetails() {
  const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`);
      const data = await res.json();
      setUser(data);
    }
    fetchData();
  }, [])


  return (
    <div className='bg-white p-6 rounded-lg'>
      <div className='flex items-center justify-between gap-4'>
        <button onClick={() => router.back()} className='flex items-center gap-x-1 px-4 py-2 bg-gray-200 cursor-pointer rounded-lg text-[17px] text-gray-800 hover:bg-gray-300'><HiArrowLongLeft /> Back to Users</button>
        <h3 className='text-2xl md:text-3xl font-semibold'>User Details</h3>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
        <div className='bg-gray-50 p-6 rounded-lg flex flex-col gap-4'>
          <h3 className='text-xl font-bold capitalize text-gray-800'>Personal Information</h3>
          <div>
            <p className='text-gray-600 text-[14.5px]'>Name</p>
            <p className='font-medium text-lg text-gray-700'>{user?.name}</p>
          </div>
          <div>
            <p className='text-gray-600 text-[14.5px]'>Username</p>
            <p className='font-medium text-lg text-gray-700'>@{user?.username}</p>
          </div>
          <div>
            <p className='text-gray-600 text-[14.5px]'>Email</p>
            <p className='font-medium text-lg text-gray-700'>{user?.email}</p>
          </div>
          <div>
            <p className='text-gray-600 text-[14.5px]'>Phone</p>
            <p className='font-medium text-lg text-gray-700'>{user?.phone}</p>
          </div>
          <div>
            <p className='text-gray-600 text-[14.5px]'>Website</p>
            <a href={`http://${user?.website}`} className='font-medium text-lg text-blue-500 hover:underline' target='_blank'>{user?.website}</a>
          </div>
        </div>
        <div className='bg-gray-50 p-6 rounded-lg flex flex-col gap-4'>
          <h3 className='text-xl font-bold capitalize text-gray-800'>Address</h3>
          <div>
            <p className='text-gray-600 text-[14.5px]'>Street</p>
            <p className='font-medium text-lg text-gray-700'>{user?.address.street}</p>
          </div>
          <div>
            <p className='text-gray-600 text-[14.5px]'>Suite</p>
            <p className='font-medium text-lg text-gray-700'>{user?.address.suite}</p>
          </div>
          <div>
            <p className='text-gray-600 text-[14.5px]'>City</p>
            <p className='font-medium text-lg text-gray-700'>{user?.address.city}</p>
          </div>
          <div>
            <p className='text-gray-600 text-[14.5px]'>Zipcode</p>
            <p className='font-medium text-lg text-gray-700'>{user?.address.zipcode}</p>
          </div>
          <div>
            <p className='text-gray-600 text-[14.5px]'>Geo Location</p>
            <a className='font-medium text-lg text-gray-700'>{user?.address.geo.lat}, {user?.address.geo.lng}</a>
          </div>
        </div>
      </div>
      <div className='bg-gray-50 p-6 rounded-lg mt-6'>
        <h3 className='text-xl font-bold capitalize text-gray-800'>Company</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5'>
          <div>
            <p className='text-gray-600 text-[14.5px] capitalize'>Company Name</p>
            <p className='font-medium text-lg text-gray-700'>{user?.company.name}</p>
          </div>
          <div>
            <p className='text-gray-600 text-[14.5px] capitalize'>Catch Phrase</p>
            <p className='font-medium text-lg text-gray-700'>{user?.company.catchPhrase}</p>
          </div>
          <div>
            <p className='text-gray-600 text-[14.5px] capitalize'>Business</p>
            <p className='font-medium text-lg text-gray-700'>{user?.company.bs}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
