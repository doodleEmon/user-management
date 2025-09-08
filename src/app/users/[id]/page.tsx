'use client'

import LoadingSpinner from '@/components/loader';
import { User } from '@/types/user';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { HiArrowLongLeft } from 'react-icons/hi2'
import { motion } from "motion/react"

export default function UserDetails() {
  const router = useRouter();
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [id])


  return (
    <div className='bg-white p-6 rounded-lg'>
      <div className='flex items-center justify-between gap-4'>
        <motion.button
          onClick={() => router.back()}
          className='flex items-center gap-x-1 px-4 py-2 bg-gray-200 cursor-pointer rounded-lg text-[17px] text-gray-800 relative overflow-hidden group'
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-gray-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-400 ease-out"></div>

          <motion.div
            className="relative z-10 flex items-center gap-x-1"
            whileHover={{ x: -2 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              whileHover={{ x: -3 }}
              transition={{ duration: 0.2 }}
            >
              <HiArrowLongLeft />
            </motion.div>
            Back to Users
          </motion.div>
        </motion.button>
        <h3 className='text-2xl md:text-3xl font-semibold'>User Details</h3>
      </div>
      {
        isLoading ? <LoadingSpinner /> : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {/* Personal Information Card */}
              <motion.div
                className='bg-gray-50 p-6 rounded-lg flex flex-col gap-4 hover:shadow-md transition-shadow duration-300'
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.h3
                  className='text-xl font-bold capitalize text-gray-800'
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  Personal Information
                </motion.h3>

                {[
                  { label: 'Name', value: user?.name },
                  { label: 'Username', value: `@${user?.username}` },
                  { label: 'Email', value: user?.email },
                  { label: 'Phone', value: user?.phone }
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + (index * 0.1) }}
                  >
                    <p className='text-gray-600 text-[14.5px]'>{item.label}</p>
                    <p className='font-medium text-lg text-gray-700'>{item.value}</p>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                >
                  <p className='text-gray-600 text-[14.5px]'>Website</p>
                  <Link
                    href={`http://${user?.website}`}
                    className='font-medium text-lg text-blue-500 hover:underline hover:text-blue-600 transition-colors duration-200'
                    target='_blank'
                  >
                    {user?.website}
                  </Link>
                </motion.div>
              </motion.div>

              {/* Address Card */}
              <motion.div
                className='bg-gray-50 p-6 rounded-lg flex flex-col gap-4 hover:shadow-md transition-shadow duration-300'
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <motion.h3
                  className='text-xl font-bold capitalize text-gray-800'
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  Address
                </motion.h3>

                {[
                  { label: 'Street', value: user?.address.street },
                  { label: 'Suite', value: user?.address.suite },
                  { label: 'City', value: user?.address.city },
                  { label: 'Zipcode', value: user?.address.zipcode },
                  { label: 'Geo Location', value: `${user?.address.geo.lat}, ${user?.address.geo.lng}` }
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + (index * 0.1) }}
                  >
                    <p className='text-gray-600 text-[14.5px]'>{item.label}</p>
                    <p className='font-medium text-lg text-gray-700'>{item.value}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Company Card */}
            <motion.div
              className='bg-gray-50 p-6 rounded-lg mt-6 hover:shadow-md transition-shadow duration-300'
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.h3
                className='text-xl font-bold capitalize text-gray-800'
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 }}
              >
                Company
              </motion.h3>

              <motion.div
                className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                {[
                  { label: 'Company Name', value: user?.company.name },
                  { label: 'Catch Phrase', value: user?.company.catchPhrase },
                  { label: 'Business', value: user?.company.bs }
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.9 + (index * 0.15) }}
                  >
                    <p className='text-gray-600 text-[14.5px] capitalize'>{item.label}</p>
                    <p className='font-medium text-lg text-gray-700'>{item.value}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )
      }
    </div>
  )
}
