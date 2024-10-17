"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, Users, Settings, User, Table } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/dashboard/admin", icon: Home },
  { name: "Productos", href: "/dashboard/admin/products", icon: Package },
  { name: "Mesas", href: "/dashboard/admin/mesas", icon: Table },
  { name: "Usuarios", href: "/dashboard/admin/users", icon: Users },
  { name: "Configuración", href: "/dashboard/admin/settings", icon: Settings },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex justify-between items-center bg-background border-b p-4">
      {/* Título de la Aplicación */}
      <h1 className="text-2xl font-bold">NextNestApp</h1>

      {/* Elementos de navegación */}
      <div className="flex items-center space-x-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className="flex items-center">
              <div
                className={cn(
                  "flex items-center space-x-2 p-2 rounded-md transition-colors duration-200",
                  isActive ? "bg-muted" : "hover:bg-muted/50"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Avatar */}
      <Avatar className="h-8 w-8">
        <AvatarFallback>
          <User className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
    </nav>
  );
}
