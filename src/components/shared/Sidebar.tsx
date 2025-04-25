"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUser, FaCog, FaHome, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const navItems = [
    { href: "/dashboard", icon: <FaHome className="h-4 w-4" />, label: "Dashboard" },
    { href: "/dashboard/user-info", icon: <FaUser className="h-4 w-4" />, label: "User Info" },
    { href: "/dashboard/settings", icon: <FaCog className="h-4 w-4" />, label: "Settings" },
  ];

  const renderSidebarContent = () => (
    <>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => isMobile && setIsOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                pathname === item.href && "bg-muted text-primary"
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <Button variant="outline" className="w-full gap-2" onClick={() => console.log("Logout clicked")}>
          <FaSignOutAlt className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden fixed top-4 left-4 z-50 ">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="h-8 w-8">
              {isOpen ? <FaTimes className="h-4 w-4" /> : <FaBars className="h-4 w-4" />}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <div className="flex h-full flex-col gap-2 py-4">
              {renderSidebarContent()}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block border-r bg-muted/40 h-full fixed left-0 top-0">
        <div className="flex h-full max-h-screen flex-col gap-2 w-64">
          {renderSidebarContent()}
        </div>
      </div>

      {/* Add padding to main content when sidebar is open on mobile */}
      <style jsx>{`
        body {
          padding-left: ${isOpen && isMobile ? '260px' : '0'};
          transition: padding-left 0.3s ease;
        }
      `}</style>
    </>
  );
};

export default Sidebar;