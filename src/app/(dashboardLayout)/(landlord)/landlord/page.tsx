import type React from "react"
import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, Home, Users, ClipboardList, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import PropertyList from "@/components/dashboard/property-list"
import RequestList from "@/components/dashboard/request-list"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your property management portfolio</p>
        </div>
        <Button asChild className="bg-teal-600 hover:bg-teal-700">
          <Link href="/landlord/properties/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Property
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<StatsCardSkeleton />}>
          <StatsCard
            title="Total Properties"
            value="12"
            description="+2 from last month"
            icon={<Building2 className="h-4 w-4 text-muted-foreground" />}
          />
        </Suspense>
        <Suspense fallback={<StatsCardSkeleton />}>
          <StatsCard
            title="Active Rentals"
            value="8"
            description="67% occupancy rate"
            icon={<Home className="h-4 w-4 text-muted-foreground" />}
          />
        </Suspense>
        <Suspense fallback={<StatsCardSkeleton />}>
          <StatsCard
            title="Total Tenants"
            value="14"
            description="+3 from last month"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
          />
        </Suspense>
        <Suspense fallback={<StatsCardSkeleton />}>
          <StatsCard
            title="Pending Requests"
            value="5"
            description="Requires attention"
            icon={<ClipboardList className="h-4 w-4 text-muted-foreground" />}
          />
        </Suspense>
      </div>

      <Tabs defaultValue="properties" className="w-full">
        <TabsList>
          <TabsTrigger value="properties">Recent Properties</TabsTrigger>
          <TabsTrigger value="requests">Pending Requests</TabsTrigger>
        </TabsList>
        <TabsContent value="properties" className="mt-4">
          <Suspense fallback={<PropertyListSkeleton />}>
            <PropertyList limit={3} />
            <div className="mt-4 text-right">
              <Button variant="outline" asChild>
                <Link href="/landlord/properties">View All Properties</Link>
              </Button>
            </div>
          </Suspense>
        </TabsContent>
        <TabsContent value="requests" className="mt-4">
          <Suspense fallback={<RequestListSkeleton />}>
            <RequestList limit={3} />
            <div className="mt-4 text-right">
              <Button variant="outline" asChild>
                <Link href="/landlord/requests">View All Requests</Link>
              </Button>
            </div>
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function StatsCard({
  title,
  value,
  description,
  icon,
}: {
  title: string
  value: string
  description: string
  icon: React.ReactNode
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

function StatsCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <Skeleton className="h-5 w-[120px]" />
        <Skeleton className="h-4 w-4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-[60px] mb-1" />
        <Skeleton className="h-4 w-[140px]" />
      </CardContent>
    </Card>
  )
}

function PropertyListSkeleton() {
  return (
    <div className="space-y-4">
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-md" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  )
}

function RequestListSkeleton() {
  return (
    <div className="space-y-4">
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
                </div>
                <div className="ml-auto">
                  <Skeleton className="h-8 w-[100px]" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  )
}
