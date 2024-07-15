// types/headerElements.ts
export interface SubMenuItem {
  name: string;
  href: string;
}

export interface MenuItem {
  name: string;
  href: string;
  subItems?: SubMenuItem[];
}

export const menuItems: MenuItem[] = [
  { name: "Inicio", href: "#home" },
  { 
    name: "Productos", 
    href: "#products", 
    subItems: [
      { name: "Herramientas Manuales", href: "#products" },
      { name: "Herramientas Eléctricas", href: "#products" },
      { name: "Accesorios", href: "#products" }
    ] 
  },
  { name: "Testimonios", href: "#testimonials" },
];
