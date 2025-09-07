'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { User } from '@/types/user'
import { useRouter } from 'next/navigation';
import { HiArrowLongLeft, HiArrowLongRight } from 'react-icons/hi2'
import { motion, AnimatePresence } from 'motion/react'
import LoadingSpinner from './loader';

export default function UserDirectory() {
    const [inputValue, setInputValue] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [users, setUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [showError, setShowError] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await fetch('https://jsonplaceholder.typicode.com/users');
                const data = await res.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredUsers = useMemo(() => {
        if (!searchQuery) return users;

        return users.filter((user: User) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [users, searchQuery]);

    // pagination //
    const userPerPage = 10;
    const lastUserIndex = currentPage * userPerPage;
    const firstUserIndex = lastUserIndex - userPerPage;
    const currentPageUsers = filteredUsers.slice(firstUserIndex, lastUserIndex);
    const totalUsers = filteredUsers.length;
    const totalPages = Math.ceil(filteredUsers.length / userPerPage);
    const start = totalUsers === 0 ? 0 : firstUserIndex + 1;
    const end = totalUsers === 0 ? 0 : Math.min(lastUserIndex, totalUsers);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (inputValue.trim() === "") {
                setShowError(true);
                return;
            }
            setShowError(false);
            setSearchQuery(inputValue.trim());
            setCurrentPage(1);
        }
    };

    const handleSearch = () => {
        if (inputValue.trim() === "") {
            setShowError(true);
            return;
        }
        setShowError(false);
        setIsLoading(true);
        setSearchQuery(inputValue.trim());
        setIsLoading(false);
        setCurrentPage(1);
    };

    useEffect(() => {
        if (inputValue === "") {
            setSearchQuery("");
            setShowError(false);
        }
    }, [inputValue]);

    return (
        <div className='mt-7'>
            {/* search bar */}
            <div className='flex flex-col md:flex-row items-center gap-4'>
                <div className='w-full md:flex-1 relative'>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            if (showError && e.target.value.trim() !== "") {
                                setShowError(false);
                            }
                        }}
                        onKeyDown={handleKeyDown}
                        className={`border ${showError ? 'border-red-500 focus:outline-red-500' : 'border-gray-300 focus:outline-blue-600'
                            } py-2 md:py-[10px] px-3 w-full rounded-lg transition-colors duration-200`}
                        placeholder='Search by name or email'
                        disabled={isLoading}
                    />
                    <AnimatePresence>
                        {showError && (
                            <motion.p
                                className="absolute left-3 -bottom-6 text-red-500 text-sm"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                Please enter a search term
                            </motion.p>
                        )}
                    </AnimatePresence>
                    {inputValue !== "" && (
                        <button
                            onClick={() => (
                                setSearchQuery(""),
                                setInputValue(""),
                                setShowError(false)
                            )}
                            className='absolute right-4 top-1/2 -translate-y-1/2 bg-gray-500 hover:bg-gray-600 text-white size-6 rounded-full cursor-pointer z-50 transition-colors duration-200'
                        >
                            X
                        </button>
                    )}
                </div>
                <motion.button
                    type='button'
                    onClick={handleSearch}
                    disabled={isLoading}
                    className={`text-white text-base w-full ${isLoading ? 'md:w-28' : 'md:w-24'} h-10 md:h-11 rounded-lg transition-all duration-200 ${isLoading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                        }`}
                    whileTap={{ scale: 0.9, rotate: 3 }}
                >
                    {isLoading ? 'Searching...' : 'Search'}
                </motion.button>
            </div>

            {/* user table */}
            <div className="w-full mt-8 overflow-x-auto">
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                        >
                            <LoadingSpinner />
                        </motion.div>
                    ) : currentPageUsers.length === 0 ? (
                        <motion.div
                            key="no-data"
                            className="max-w-full text-center text-lg font-medium"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                        >
                            No data found!
                        </motion.div>
                    ) : (
                        <motion.table
                            key="table"
                            className="min-w-full border-collapse"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                        >
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="text-start px-5 py-2 font-normal text-gray-600 uppercase text-sm whitespace-nowrap">
                                        Name
                                    </th>
                                    <th className="text-start px-5 py-2 font-normal text-gray-600 uppercase text-sm whitespace-nowrap">
                                        Email
                                    </th>
                                    <th className="text-start px-5 py-2 font-normal text-gray-600 uppercase text-sm whitespace-nowrap">
                                        Phone
                                    </th>
                                    <th className="text-start px-5 py-2 font-normal text-gray-600 uppercase text-sm whitespace-nowrap">
                                        Company
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentPageUsers.map((user: User, index: number) => (
                                    <tr
                                        key={user.id}
                                        onClick={() => router.push(`/users/${user.id}`)}
                                        className={`hover:bg-gray-50 cursor-pointer transition-colors duration-150 ${index !== currentPageUsers.length - 1
                                            ? "border-b border-b-gray-200"
                                            : ""
                                            }`}
                                    >
                                        <td className="text-start px-5 py-3.5 font-normal text-[14.5px] text-gray-800 whitespace-nowrap">
                                            <p>{user.name}</p>
                                            <p className="text-gray-600">@{user.username}</p>
                                        </td>
                                        <td className="text-start px-5 py-3.5 font-normal text-[14.5px] text-gray-800 whitespace-nowrap">
                                            {user.email}
                                        </td>
                                        <td className="text-start px-5 py-3.5 font-normal text-[14.5px] text-gray-800 whitespace-nowrap">
                                            {user.phone}
                                        </td>
                                        <td className="text-start px-5 py-3.5 font-normal text-[14.5px] text-gray-800 whitespace-nowrap">
                                            {user.company.name}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </motion.table>
                    )}
                </AnimatePresence>
            </div>

            {!isLoading && (
                <div className='flex items-center justify-between gap-4 mt-5'>
                    <p className={`text-gray-600 ${filteredUsers.length === 0 ? 'invisible' : ''}`}>
                        Showing <span className='font-medium'>{start}</span> to <span className='font-medium'>{end}</span> of <span className='font-medium'>{totalUsers}</span>
                    </p>
                    <div className={`flex items-center gap-2 ${filteredUsers.length < userPerPage + 1 ? 'invisible' : ''}`}>
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                            className={`${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-500 hover:bg-gray-600 cursor-pointer'} text-white px-3 py-2 rounded-md text-lg transition-colors duration-200`}
                        >
                            <HiArrowLongLeft />
                        </button>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                            className={`${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-500 hover:bg-gray-600 cursor-pointer'} text-white px-3 py-2 rounded-md text-lg transition-colors duration-200`}
                        >
                            <HiArrowLongRight />
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}