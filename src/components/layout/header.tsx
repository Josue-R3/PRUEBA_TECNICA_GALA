import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { menuItems } from "../../types/header";
import { TiShoppingCart } from "react-icons/ti";

export default function Header() {
  return (
    <Navbar isBordered className="fixed top-0 left-0 w-full z-10">
      {/* Logo Section */}
      <NavbarContent>
        <NavbarBrand>
          <div className="text-lg font-bold">LOGO</div>
        </NavbarBrand>
      </NavbarContent>

      {/* Menu Items */}
      <NavbarContent className="hidden sm:flex gap-4 justify-center flex-grow items-center">
        {menuItems.map((item, index) => (
          <NavbarItem key={`${item.name}-${index}`}>
            <Link color="foreground" href={item.href}>
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Access Button */}
      <NavbarContent className="justify-end items-center">
        <NavbarItem>
          <Button as={Link} href="#" isIconOnly variant="light" >
            <TiShoppingCart className="w-6 h-6" />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} href="#">
            Acceder
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
