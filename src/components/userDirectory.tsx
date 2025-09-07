'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { User } from '@/types/user'
import { useRouter } from 'next/navigation';

export default function UserDirectory() {
    const [inputValue, setInputValue] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await res.json();
            data.length > 0 && setIsLoading(false);
            setUsers(data);
        };
        fetchData();
    }, []);

    const filteredUsers = useMemo(() => {
        if (!searchQuery) return users;

        return users.filter((user: User) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.username.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [users, searchQuery]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setSearchQuery(inputValue.trim());
        }
    };

    const handleSearch = () => {
        setSearchQuery(inputValue.trim());
    };

    useEffect(() => {
        if (inputValue === "") {
            setSearchQuery("");
        }
    }, [inputValue]);

    return (
        <div className='mt-7'>
            {/* search bar */}
            <div className='flex items-center gap-4'>
                <div className='flex-1 relative'>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className='border border-gray-300 focus:outline-blue-600 py-[10px] px-3 w-full rounded-lg'
                        placeholder='Search by name or email'
                        required
                    />
                    {
                        inputValue !== "" &&
                        <button onClick={() => (
                            setSearchQuery(""),
                            setInputValue("")
                        )} className='absolute right-4 top-1/2 -translate-y-1/2 bg-gray-500 text-white size-6 rounded-full cursor-pointer z-50'>X</button>
                    }
                </div>
                <button
                    type='button'
                    onClick={handleSearch}
                    className='bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-2 rounded-lg cursor-pointer'
                >
                    Search
                </button>
            </div>

            {/* user table */}
            {
                filteredUsers.length === 0 ? (<div className='w-full mt-8 text-center text-lg font-medium'>No data found!</div>) : (<table className='w-full mt-8'>
                    <thead>
                        <tr className='bg-gray-100'>
                            <th className='text-start px-5 py-2 font-normal text-gray-600 uppercase text-sm'>Name</th>
                            <th className='text-start px-5 py-2 font-normal text-gray-600 uppercase text-sm'>Email</th>
                            <th className='text-start px-5 py-2 font-normal text-gray-600 uppercase text-sm'>Phone</th>
                            <th className='text-start px-5 py-2 font-normal text-gray-600 uppercase text-sm'>Company</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user: User, index: number) => (
                            <tr
                            onClick={() => router.push(`/users/${user.id}`)}
                                key={index}
                                className={`hover:bg-gray-100 cursor-pointer ${index !== filteredUsers.length - 1 ? 'border-b border-b-gray-200' : ''}`}
                            >
                                <td className='text-start px-5 py-3.5 font-normal text-[14.5px] text-gray-800'>
                                    <p>{user.name}</p>
                                    <p className='text-gray-600'>@{user.username}</p>
                                </td>
                                <td className='text-start px-5 py-3.5 font-normal text-[14.5px] text-gray-800'>{user.email}</td>
                                <td className='text-start px-5 py-3.5 font-normal text-[14.5px] text-gray-800'>{user.phone}</td>
                                <td className='text-start px-5 py-3.5 font-normal text-[14.5px] text-gray-800'>{user.company.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>)
            }
        </div>
    )
}
