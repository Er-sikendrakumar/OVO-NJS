'use client'

import { ChevronDown, MapPin } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from "next/image";
import React, { useEffect, useRef, useState } from 'react'

type StateItem = {
  state_id: string
  state_abbr: string
  state_name: string
  timezone: string
}

interface StateSelectorProps {
  states: StateItem[]
  placeholder?: string
  basePath?: string // e.g. "/virtual-office"
}

function StateSelector({
  states,
  placeholder = 'Select Your State',
  basePath = '/business-address',
}: StateSelectorProps) {
  const router = useRouter()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [isOpen, setIsOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [selectedState, setSelectedState] = useState<StateItem | null>(null)

  const filteredStates = states
    .filter(state =>
      state.state_name.toLowerCase().includes(searchValue.toLowerCase())
    )
    .sort((a, b) => a.state_name.localeCompare(b.state_name))

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleStateSelect = (state: StateItem) => {
    setSelectedState(state)
    setSearchValue(state.state_name)
    setIsOpen(false)

    // Example route: /virtual-office/california
    router.push(`${basePath}/${state.state_name}`)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    setIsOpen(true)
  }

  return (
    <div className="max-w-[514px] relative" ref={dropdownRef}>
      <div
        className="font-inter font-medium text-[25.7px] leading-[38.55px] text-[#101828] w-full lg:h-[71.13px] h-[56.13px] border-[1.61px] border-[#D0D5DD] rounded-[12.85px] px-[16.19px] py-[11.57px] lg:px-[22.49px] lg:py-[19.5px] gap-[12px] flex items-center cursor-pointer bg-white"
        onClick={() => {
          setIsOpen(!isOpen)
          inputRef.current?.focus()
        }}
      >
        <MapPin className="lg:w-[32.13px] lg:h-[32.13px] w-[23.13px] h-[23.13px] text-[#667085] flex-shrink-0" />

        <input
          ref={inputRef}
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="flex-1 font-inter font-medium text-[20.82px] lg:text-[25.7px] leading-[38.55px] text-[#101828] outline-none bg-transparent placeholder:text-[#101828]"
          onClick={e => {
            e.stopPropagation()
            setIsOpen(true)
          }}
        />

        <ChevronDown
          className={`lg:w-[33px] lg:h-[33px] w-[23.13px] h-[23.13px] text-[#667085] transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </div>

      <div
        className={`absolute top-full left-0 right-0 mt-[10px] bg-white border border-[#caced1] rounded-[12.85px] shadow-[0_10px_25px_rgba(0,0,0,0.2)] z-50 max-h-[200px] overflow-y-auto transition-all duration-300 ${
          isOpen
            ? 'opacity-100 scale-y-100 translate-y-0'
            : 'opacity-0 scale-y-0 -translate-y-2 pointer-events-none'
        }`}
      >
        {filteredStates.length > 0 ? (
          filteredStates.map(state => (
            <div
              key={state.state_id}
              onClick={() => handleStateSelect(state)}
              className="px-[20px] py-[12px] hover:bg-[#f5f7fa] cursor-pointer font-inter font-medium text-[18px] text-[#101828]"
            >
              {state.state_name}
            </div>
          ))
        ) : (
          
           <div className=" flex max-w-[1280] w-full flex-col md:flex-row justify-end items-start right-0 mx-auto gap-8 px-4 md:px-8 pt-[27px] pb-5 md:pb-[40px]">
            <div className="mx-auto w-full max-w-[1280px]">
              <h2 className="text-[16px] text-[#475467]">No data found</h2>
            </div>
            <div className="space-y-3 max-w-full lg:max-w-[592px] w-full float-end">
              <div className={`flex items-center gap-3`}>
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center">
                  <Image
                    src={"/assets/locarion-map-icon.svg"}
                    alt="Check Icon"
                    width={32}
                    height={32}
                    className="lg:min-w-[32px] lg:min-h-[32px] lg:w-[32px] lg:h-[32px] min-w-[24px] min-h-[24px] w-[24px] h-[24px] object-contain lg:max-w-[32px] lg:max-h-[32px] max-w-[24px] max-h-[24px]"
                  />
                </div>
                <span className="text-[16px] lg:text-lg font-normal leading-[100%] text-[#475467]">
                  Prestigious Business Address
                </span>
              </div>
              <div className={`flex items-center gap-3`}>
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center">
                  <Image
                    src={"/assets/mail-box-icon.svg"}
                    alt="Check Icon"
                    width={32}
                    height={32}
                    className="lg:min-w-[32px] lg:min-h-[32px] lg:w-[32px] lg:h-[32px] min-w-[24px] min-h-[24px] w-[24px] h-[24px] object-contain
                                                  lg:max-w-[32px] lg:max-h-[32px] max-w-[24px] max-h-[24px]"
                  />
                </div>
                <span className="text-[16px] lg:text-lg font-normal leading-[100%] text-[#475467]">
                  Professional Mail Receipt
                </span>
              </div>
              <div className={`flex items-center gap-3`}>
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center">
                  <Image
                    src={"/assets/profile-card-icon.svg"}
                    alt="Check Icon"
                    width={32}
                    height={32}
                    className="lg:min-w-[32px] lg:min-h-[32px] lg:w-[32px] lg:h-[32px] min-w-[24px] min-h-[24px] w-[24px] h-[24px] object-contain
                                                  lg:max-w-[32px] lg:max-h-[32px] max-w-[24px] max-h-[24px]"
                  />
                </div>
                <span className="text-[16px] lg:text-lg font-normal leading-[100%] text-[#475467]">
                  Privacy & Safety
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default StateSelector
