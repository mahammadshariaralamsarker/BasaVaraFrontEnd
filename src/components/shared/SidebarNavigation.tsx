// components/dashboard/SidebarNavigation.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, Home, ClipboardList, Settings, User } from "lucide-react";
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
} from "@/components/ui/sidebar";
import { ProfileMenu } from "@/components/shared/CommonProfile";

export function SidebarNavigation() {
  const pathname = usePathname();

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
        
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settings.map((item) => {
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
  );
}