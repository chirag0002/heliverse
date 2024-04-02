import { useSetRecoilState } from 'recoil';
import { filterAtoms } from '../atoms/atoms';
import { useState } from 'react';


export const InputBar = () => {
    const setFilters = useSetRecoilState(filterAtoms)
    const [filterValues, setFiltervalues] = useState({
        domain: '',
        gender: '',
        availability: '',
        search: ''
    })

    const handleDomainSelection = (domain: string) => {
        setFiltervalues(prev => {
            return {
                ...prev,
                domain: domain
            }
        });
    };

    const handleGenderSelection = (gender: string) => {
        setFiltervalues(prev => {
            return {
                ...prev,
                gender: gender
            }
        });
    };

    const handleAvailabilitySelection = (availability: string) => {
        setFiltervalues(prev => {
            return {
                ...prev,
                availability: availability
            }
        });
    };

    const handleSearch = (search: string) => {
        setFiltervalues(prev => {
            return {
                ...prev,
                search: search
            }
        });
    }

    const handleSearchSubmit = () => {
        setFilters(prev => {
            return {
                ...prev,
                domain: filterValues.domain,
                gender: filterValues.gender,
                availability: filterValues.availability,
                search: filterValues.search,
            }
        })
    }

    return <div className="flex justify-center m-5">
        <div className="flex flex-col sm:flex-row items-center space-x-4">
            <select
                value={filterValues.domain}
                onChange={(e) => handleDomainSelection(e.target.value)}
                className="border-2 border-gray-950 hover:bg-zinc-200 flex-shrink-0 z-10 items-center text-sm font-medium py-2.5 px-4 text-center rounded-s-lg"
            >
                <option value={''}>Select Domain</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="UI Designing">UI Designing</option>
                <option value="Business Development">Business Development</option>
                <option value="Finance">Finance</option>
                <option value="IT">IT</option>
                <option value="Management">Management</option>
            </select>

            <select
                value={filterValues.gender}
                onChange={(e) => handleGenderSelection(e.target.value)}
                className="my-2 border-2 border-gray-950 hover:bg-zinc-200 flex-shrink-0 z-10 items-center py-2.5 px-4 text-sm font-medium text-center rounded-s-lg"
            >
                <option value={''}>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>

            <select
                value={filterValues.availability}
                onChange={(e) => handleAvailabilitySelection(e.target.value)}
                className="my-2 border-2 border-gray-950 hover:bg-zinc-200 flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center rounded-s-lg"
            >
                <option value={''}>Select Availability</option>
                <option value="true">Open to collab</option>
                <option value="false">Occupied</option>
            </select>

            <div className="relative my-2">
                <input
                    type="search"
                    className=" block p-2.5 w-48 sm:w-auto text-sm rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-800 focus:border-blue-800 outline-none"
                    placeholder='Search Users....'
                    required
                    onChange={(e) => handleSearch(e.target.value)}
                />
                <button
                    type="submit"
                    className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    onClick={handleSearchSubmit}
                >
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                    <span className="sr-only">Search</span>
                </button>
            </div>
        </div>
    </div>
};
