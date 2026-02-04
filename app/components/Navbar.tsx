"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import Authentication from "./Authentication";

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
      <nav className="sticky top-0 z-50 border-b border-stone-200 bg-white text-black backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold tracking-tighter">
            BRAND.
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden gap-8 text-sm font-medium md:flex">
            {navLinks.map((link) => (
              <li
                key={link.name}
                className="transition-colors hover:text-stone-500"
              >
                <Link href={link.href}>{link.name}</Link>
              </li>
            ))}
          </ul>
          <div className="auth-handle">
            <Authentication />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="z-[60] text-black focus:outline-none"
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
        className={`fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        onClick={toggleMenu}
      />

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-0 left-0 z-[58] h-full w-[280px] transform bg-white text-black shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          {/* Sidebar Logo/Header */}
          <div className="mb-10 text-2xl font-bold tracking-tighter">
            BRAND.
          </div>

          <ul className="flex flex-col space-y-8 text-lg font-bold">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block border-b pb-2 tracking-tight uppercase"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="auth-handle">
            <Authentication />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
