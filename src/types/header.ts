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
  { name: "Inicio", href: "#" },
  { 
    name: "Categorias", 
    href: "#", 
    subItems: [
      { name: "Herramientas Manuales", href: "#" },
      { name: "Herramientas Eléctricas", href: "#" },
      { name: "Accesorios", href: "#" }
    ] 
  },
  { name: "Foros", href: "#" },
];
