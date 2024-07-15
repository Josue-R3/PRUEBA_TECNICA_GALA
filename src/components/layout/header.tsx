import React, { useState } from "react";
import { menuItems } from "../../types/header";
import { TiThMenu } from "react-icons/ti";
import { Button } from "@nextui-org/react";
import CartModal from "../sections/cartModal";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-10 bg-[#1A1112] border-b border-[#FFA400]">
      <div className="flex justify-between items-center w-full px-4 py-2">
        {/* Logo Section */}
        <div className="flex items-center">
          <span className="text-4xl font-bold text-white">LOGO</span>
        </div>

        {/* Menu Items */}
        <nav className={`hidden sm:flex gap-4 flex-grow justify-center items-center`}>
          {menuItems.map((item, index) => (
            <a key={index} href={item.href} className="text-white hover:text-[#FFA400] px-2 py-1">
              {item.name}
            </a>
          ))}
        </nav>

        {/* Shopping Cart and Menu Toggle */}
        <div className="flex items-center gap-2">
          <Button variant="light" isIconOnly className="sm:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <TiThMenu className="w-6 h-6 text-[#FEC300]" />
          </Button>
          <CartModal />
          <Button className="hidden sm:block bg-[#FFA400] border border-[#FEC300] hover:bg-black text-black hover:text-[#FFA400] text-base font-medium px-3 py-1 rounded">
            Acceder
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="sm:hidden bg-[#1A1112] shadow-md mt-2">
          {menuItems.map((item, index) => (
            <a key={index} href={item.href} className="block px-4 py-2 text-white hover:text-[#FFA400]">
              {item.name}
            </a>
          ))}
          <Button className="block w-full bg-[#FFA400] hover:bg-gray-300 text-black text-base font-medium px-4 py-2 mt-2 rounded">
            Acceder
          </Button>
        </nav>
      )}
    </header>
  );
}
