"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Building2, Home, ClipboardList, Settings, User } from "lucide-react";
import { ProfileMenu } from "@/components/shared/CommonProfile";
import RoleGuard from "@/components/auth/RoleGuard";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const navigation = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/landlord",
      isActive: pathname === "/landlord",
    },
    {
      title: "Properties",
      icon: Building2,
      href: "/landlord/properties",
      isActive: pathname.startsWith("/landlord/properties"),
    },
    {
      title: "Rental Requests",
      icon: ClipboardList,
      href: "/landlord/requests",
      isActive: pathname.startsWith("/landlord/requests"),
    },
  ];

  const settings = [
    {
      title: "Profile",
      icon: User,
      href: "/landlord/profile",
      isActive: pathname.startsWith("/landlord/profile"),
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/landlord/settings",
      isActive: pathname.startsWith("/landlord/settings"),
    },
  ];

  return (
    <RoleGuard allowedRole="landlord">
      <SidebarProvider>
        <div className="flex w-screen">
          <Sidebar>
            <SidebarHeader className="border-b">
              <div className="flex items-center gap-2 px-4 py-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-white">
                  <Building2 className="h-4 w-4" />
                </div>
                <div className="font-semibold">Basha Finder</div>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {navigation.map((item) => {
                      const Icon = item.icon;
                      return (
                        <SidebarMenuItem key={item.href}>
                          <SidebarMenuButton asChild isActive={item.isActive}>
                            <Link href={item.href}>
                              <Icon className="h-4 w-4" />
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              
            </SidebarContent>
            <SidebarFooter className="border-t p-4">
              <ProfileMenu />
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>
            <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
              <SidebarTrigger />
              <div className="font-semibold">
                {navigation.find((item) => item.isActive)?.title ||
                  settings.find((item) => item.isActive)?.title ||
                  "Dashboard"}
              </div>
            </header>
            <main className="flex-1 overflow-auto p-6">{children}</main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </RoleGuard>
  );
}
