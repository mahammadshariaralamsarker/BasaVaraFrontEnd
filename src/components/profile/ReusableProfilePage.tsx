"use client";
 
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator"; 
import { Calendar, Shield, User } from "lucide-react";
import { z } from "zod";
import { UseFormReturn } from "react-hook-form";

import ProfileSidebar from "@/components/profile/ProfileSidebar";
import ProfileForm, {
  profileFormSchema,
} from "@/components/profile/ProfileForm";
import PasswordForm from "./PasswordForm";

type ProfileInfo = {
  name: string;
  email: string;
  role: string;
  phone: string;
  address: string;
  city: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
};

type ReusableProfilePageProps = {
  title?: string;
  subtitle?: string;
  profileInfo: ProfileInfo;
  onSubmit: (values: z.infer<typeof profileFormSchema>) => void;
  isSubmitting: boolean;
  showAccountTab?: boolean;
  passForm: UseFormReturn<{ currentPassword: string; newPassword: string; confirmPassword: string; }>
  handlePasswordSubmit?: (values: { currentPassword: string; newPassword: string }) => void; // for password form submission
  children?: React.ReactNode; // for adding custom tabs
};

export default function ReusableProfilePage({
  title = "My Profile",
  subtitle = "Manage your personal and professional information",
  profileInfo,
  onSubmit,
  isSubmitting,
  passForm,
  handlePasswordSubmit,
  showAccountTab = true,
  children,
}: ReusableProfilePageProps) {
  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };
  const { name, createdAt, role } = profileInfo;
  return (
    <div className="flex flex-col gap-6 p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <ProfileSidebar profileInfo={profileInfo} />

        <div className="md:col-span-2">
          <Tabs defaultValue="account" className="w-full">
            <TabsList>
              {showAccountTab && (
                <TabsTrigger value="account">Account</TabsTrigger>
              )}
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              {children}
            </TabsList>

            <TabsContent value="general" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>General Information</CardTitle>
                  <CardDescription>
                    Update your personal information.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ProfileForm
                    defaultValues={profileInfo}
                    onSubmit={onSubmit}
                    isSubmitting={isSubmitting}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {showAccountTab && (
              <TabsContent value="account" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>
                      Manage your account details and security.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Account Details</h3>
                          <p className="text-sm text-muted-foreground">
                            Basic information about your account
                          </p>
                        </div>
                        {/* <Button variant="outline" size="sm">Edit</Button> */}
                      </div>
                      <Separator />
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Username
                          </p>
                          <p className="font-medium">{name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Account Created
                          </p>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <p className="font-medium">
                              {formatDate(createdAt)}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Account Type
                          </p>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <p className="font-medium">{role}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Permissions
                          </p>
                          <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-muted-foreground" />
                            <p className="font-medium">Standard Access</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            <TabsContent value="password" className="mt-4">
              <PasswordForm
                passForm={passForm}
                handlePasswordSubmit={handlePasswordSubmit}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
