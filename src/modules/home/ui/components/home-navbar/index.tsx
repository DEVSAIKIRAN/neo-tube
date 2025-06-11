"use client"; // This component needs to be a Client Component to use useState and handle click events

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SearchInput } from "./search-input"; // Assuming this path is correct
import { AuthButton } from "@/modules/Auth/ui/components/Auth-button"; // Assuming this path is correct
import { SidebarTrigger } from "@/components/ui/sidebar"; // Assuming this path is correct

// Import a search icon from lucide-react, or use a simple SVG if lucide-react is not installed
// If lucide-react is not installed, you can use a simple SVG like:
// <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucude-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
import { Search } from "lucide-react"; // Make sure you have lucide-react installed: npm install lucide-react

export const HomeNavbar = () => {
  // State to control the visibility of the search input on mobile
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-black flex items-center px-2 pr-5 z-50">
      {/* Main container for navbar items, using justify-between to push items to ends */}
      <div className="flex items-center justify-between w-full">

        {/* LEFT SECTION: Sidebar Trigger and Logo */}
        {/* This group is hidden on mobile when search is active to give space to the search input */}
        <div className={`flex items-center flex-shrink-0 gap-4 ${showMobileSearch ? "hidden" : "flex"} md:flex`}>
          <SidebarTrigger />
          {/* Logo is always visible on desktop, but hidden on mobile if search is active */}
          <div className="block">
            <Link href="/">
              <div className="p-4 flex items-center gap-1 ">
                <Image src="/logo.svg" height={32} width={32} alt="logo" />
                <p className="font-semibold text-xl tracking-tight">NeoTube</p>
              </div>
            </Link>
          </div>
        </div>

        {/** CENTER SECTION: Search Input */}
        {/* This div is conditionally shown/hidden on mobile, and always centered on desktop */}
        <div
          className={`
            flex flex-1
            ${showMobileSearch ? "flex w-full" : "hidden"} {/* Show and take full width on mobile when active */}
            md:flex md:justify-center md:mx-auto md:max-w-[720px] {/* Always show and center on desktop */}
          `}
        >
          <SearchInput />
        </div>

        {/* RIGHT SECTION: Mobile Search/Close Icon and AuthButton */}
        {/* This group is always visible on the right */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Mobile Search Icon (visible when search is NOT active on mobile) */}
          {!showMobileSearch && (
            <button
              onClick={() => setShowMobileSearch(true)}
              className="md:hidden p-2 text-white rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
              aria-label="Open search"
            >
              <Search size={24} /> {/* Using Lucide React Search icon */}
            </button>
          )}

          {/* Mobile Close Search Button (visible when search IS active on mobile) */}
          {showMobileSearch && (
            <button
              onClick={() => setShowMobileSearch(false)}
              className="md:hidden p-2 text-white rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
              aria-label="Close search"
            >
              {/* You can use a 'X' icon from lucide-react or a simple SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          )}

          <AuthButton /> {/* AuthButton is now on the far right */}
        </div>

      </div>
    </nav>
  );
};

export default HomeNavbar;
