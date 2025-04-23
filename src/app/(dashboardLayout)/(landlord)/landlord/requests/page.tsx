import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Search, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import RequestList from "@/components/requests/request-list"
import RequestTable from "@/components/requests/request-table"

export default function RequestsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Rental Requests</h1>
          <p className="text-muted-foreground">Manage tenant rental requests</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search requests..." className="pl-8 w-full" />
        </div>
        <Button variant="outline" className="flex gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="table">Table View</TabsTrigger>
        </TabsList>
        <TabsContent value="list" className="mt-4">
          <Suspense fallback={<RequestListSkeleton />}>
            <RequestList />
          </Suspense>
        </TabsContent>
        <TabsContent value="table" className="mt-4">
          <Suspense fallback={<RequestTableSkeleton />}>
            <RequestTable />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function RequestListSkeleton() {
  return (
    <div className="space-y-4">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
                </div>
                <div className="ml-auto flex gap-2">
                  <Skeleton className="h-9 w-[80px]" />
                  <Skeleton className="h-9 w-[80px]" />
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

function RequestTableSkeleton() {
  return (
    <div className="rounded-md border">
      <div className="border-b px-4 py-3 bg-muted/50">
        <div className="grid grid-cols-5 gap-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
      <div>
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="border-b px-4 py-4">
              <div className="grid grid-cols-5 gap-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
