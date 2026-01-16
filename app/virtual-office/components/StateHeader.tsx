'use client'

import { ChevronRight, MapPin, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState, useRef, useEffect } from 'react'

interface City {
    name: string;
    url: string;
}

interface StateHeaderProps {
    state: string;
    stateSlug: string;
    cities: City[];
}

function StateHeader({ state, stateSlug, cities }: StateHeaderProps) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [selectedCity, setSelectedCity] = useState<City | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const filteredCities = cities
        .filter(city =>
            city.name.toLowerCase().includes(searchValue.toLowerCase())
        )
        .sort((a, b) => a.name.localeCompare(b.name));

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleCitySelect = (city: City) => {
        setSelectedCity(city);
        setSearchValue(city.name);
        setIsOpen(false);
        router.push(city.url);
    };

    const handleInputClick = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            inputRef.current?.focus();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        setIsOpen(true);
    };

    return (
        <div className='max-w-screen-xl mx-auto lg:pt-[140px] pt-[100px] px-[16px] lg:px-[32px] flex flex-col gap-[24px]'>
            <div className='flex flex-row items-center gap-[8px]'>
                <Link href={'/virtual-office/'} className='text-[#717680] font-inter font-semibold text-[14px] leading-[100%] tracking-[0]'>
                    Locations
                </Link>
                <ChevronRight className='w-[16px] h-[16px] min-w-[16px] min-h-[16px] text-[#A4A7AE]' />
                <span className='text-[#026AA2] font-inter font-semibold text-[14px] leading-[100%] tracking-[0]'>
                    {state}
                </span>
            </div>

            <div className='flex flex-col gap-[24px] '>
                <h1 className='text-[24px] lg:text-[36px] font-inter font-semibold leading-[120%] tracking-[-2%] text-[#101828]'>
                    Virtual Office Locations in {state}
                </h1>

                <div className='max-w-[514px] relative' ref={dropdownRef}>
                    <div
                        className='font-inter font-medium text-[25.7px] leading-[38.55px] text-[#101828] w-full lg:h-[71.13px] h-[56.13px] border-[1.61px] border-[#D0D5DD] rounded-[12.85px] px-[16.19px] py-[11.57px] lg:px-[22.49px] lg:py-[19.5px] gap-[12px] flex items-center cursor-pointer bg-white'
                        onClick={handleInputClick}
                    >
                        <MapPin className='lg:w-[32.13px] lg:h-[32.13px] lg:min-w-[32.13px] lg:min-h-[32.13px] w-[23.13px] h-[23.13px] min-w-[23.13px] min-h-[23.13px] text-[#667085] flex-shrink-0' />
                        <input
                            ref={inputRef}
                            type="text"
                            value={searchValue}
                            onChange={handleInputChange}
                            onFocus={() => setIsOpen(true)}
                            placeholder="Select Your City"
                            className='flex-1 text-start font-inter font-medium text-[20.82px] lg:text-[25.7px] leading-[38.55px] text-[#101828] outline-none bg-transparent placeholder:text-[#101828]'
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsOpen(true);
                            }}
                        />
                        <ChevronDown
                            className={`lg:w-[33px] lg:h-[33px] w-[23.13px] h-[23.13px] min-w-[33px] min-h-[33px] lg:min-w-[33px] lg:min-h-[33px] text-[#667085] flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        />
                    </div>
                    <div
                        className={`city-dropdown-scroll absolute top-full left-0 right-0 shadow-[0_10px_25px_rgba(0,0,0,0.2)] border border-[#caced1] py-[10px] mt-[10px] mb-[16px] bg-white rounded-[12.85px] z-50 max-h-[170px] overflow-y-auto transition-all duration-500 ease-out transform origin-center ${isOpen
                            ? 'opacity-100 scale-y-100 translate-y-0'
                            : 'opacity-0 scale-y-0 -translate-y-2 pointer-events-none'
                            }`}
                    >
                        {filteredCities.length > 0 ? (
                            filteredCities.map((city) => (
                                <div
                                    key={city.name}
                                    onClick={() => handleCitySelect(city)}
                                    className='pr-[26px] pl-[20px] py-[12px] mb-[6px] hover:bg-[#f5f7fa] cursor-pointer font-inter font-medium text-[18px] leading-[120%] text-[#101828] first:rounded-t-[12.85px] last:rounded-b-[12.85px]'
                                >
                                    {city.name}
                                </div>
                            ))
                        ) : (
                            <div className='px-[16.19px] lg:px-[22.49px] py-[12px] font-inter font-medium text-[20.82px] lg:text-[25.7px] leading-[38.55px] text-[#101828] text-center'>
                                No cities found
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StateHeader