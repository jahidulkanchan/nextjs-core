"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Add Products", href: "/products/add" },
  ];

  return (
    <>
      <nav className="border-b border-stone-200 bg-white text-black backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold tracking-tighter">
            BRAND.
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.name} className="hover:text-stone-500 transition-colors">
                <Link href={link.href}>{link.name}</Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-black focus:outline-none z-[60]"
              aria-label="Toggle menu"
            >
              {/* Keep the icon button functional */}
              {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* --- SIDEBAR MOBILE VIEW --- */}
      
      {/* Background Overlay */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[55] transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleMenu}
      />

     {/* Sidebar Drawer */}
<aside
  className={`fixed top-0 left-0 h-full w-[280px] bg-white text-black z-[58] shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${
    isOpen ? "translate-x-0" : "-translate-x-full"
  }`}
>
  <div className="p-6">
    {/* Sidebar Logo/Header */}
    <div className="mb-10 font-bold text-2xl tracking-tighter">
      BRAND.
    </div>

    <ul className="flex flex-col space-y-8 text-lg font-bold">
      {navLinks.map((link) => (
        <li key={link.name}>
          <Link
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="block border-b pb-2 uppercase tracking-tight"
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
</aside>
    </>
  );
};

export default Navbar;