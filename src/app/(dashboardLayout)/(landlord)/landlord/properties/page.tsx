"use client";

import { useState } from "react";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import PropertyGrid from "@/components/properties/property-grid";
import PropertyTable from "@/components/properties/property-table";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function PropertiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    minPrice: 0,
    maxPrice: 5000,
    bedrooms: "",
    bathrooms: "",
  });
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFilterChange = (key: string, value: any) => {
    setFilters({ ...filters, [key]: value });

    // Update active filters
    if (value && value !== 0) {
      if (!activeFilters.includes(key)) {
        setActiveFilters([...activeFilters, key]);
      }
    } else {
      setActiveFilters(activeFilters.filter((filter) => filter !== key));
    }
  };

  const clearFilters = () => {
    setFilters({
      status: "",
      minPrice: 0,
      maxPrice: 5000,
      bedrooms: "",
      bathrooms: "",
    });
    setActiveFilters([]);
  };

  const filterLabels: Record<string, string> = {
    status: `Status: ${filters.status}`,
    minPrice: `Min Price: $${filters.minPrice}`,
    maxPrice: `Max Price: $${filters.maxPrice}`,
    bedrooms: `Bedrooms: ${filters.bedrooms}`,
    bathrooms: `Bathrooms: ${filters.bathrooms}`,
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Properties</h1>
          <p className="text-muted-foreground">Manage your rental properties</p>
        </div>
        <Button asChild className="bg-teal-600 hover:bg-teal-700">
          <Link href="/landlord/properties/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Property
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search properties..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFilters.length > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {activeFilters.length}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Properties</SheetTitle>
                <SheetDescription>
                  Apply filters to narrow down your property list.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-6 py-6">
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={filters.status}
                    onValueChange={(value) =>
                      handleFilterChange("status", value)
                    }
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="Available">Available</SelectItem>
                      <SelectItem value="Rented">Rented</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Price Range</Label>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">${filters.minPrice}</span>
                    <span className="text-sm">${filters.maxPrice}</span>
                  </div>
                  <div className="pt-2">
                    <Slider
                      defaultValue={[filters.minPrice, filters.maxPrice]}
                      max={5000}
                      step={100}
                      onValueChange={(value) => {
                        handleFilterChange("minPrice", value[0]);
                        handleFilterChange("maxPrice", value[1]);
                      }}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Select
                    value={filters.bedrooms}
                    onValueChange={(value) =>
                      handleFilterChange("bedrooms", value)
                    }
                  >
                    <SelectTrigger id="bedrooms">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Select
                    value={filters.bathrooms}
                    onValueChange={(value) =>
                      handleFilterChange("bathrooms", value)
                    }
                  >
                    <SelectTrigger id="bathrooms">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <SheetFooter>
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
                <SheetClose asChild>
                  <Button className="bg-teal-600 hover:bg-teal-700">
                    Apply Filters
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter) => (
              <Badge
                key={filter}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {filterLabels[filter]}
                <button
                  onClick={() => {
                    if (filter === "minPrice" || filter === "maxPrice") {
                      handleFilterChange("minPrice", 0);
                      handleFilterChange("maxPrice", 5000);
                      setActiveFilters(
                        activeFilters.filter(
                          (f) => f !== "minPrice" && f !== "maxPrice"
                        )
                      );
                    } else {
                      handleFilterChange(filter, "");
                    }
                  }}
                  className="ml-1 rounded-full hover:bg-muted"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-6 px-2 text-xs"
            >
              Clear all
            </Button>
          </div>
        )}
      </div>

      <Tabs defaultValue="grid" className="w-full">
        <TabsList>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="table">Table View</TabsTrigger>
        </TabsList>
        <TabsContent value="grid" className="mt-4">
          <Suspense fallback={<PropertyGridSkeleton />}>
            <PropertyGrid searchQuery={searchQuery} filters={filters} />
          </Suspense>
        </TabsContent>
        <TabsContent value="table" className="mt-4">
          <Suspense fallback={<PropertyTableSkeleton />}>
            <PropertyTable searchQuery={searchQuery} filters={filters} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function PropertyGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow"
          >
            <Skeleton className="aspect-video w-full" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex justify-between pt-2">
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-5 w-1/4" />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

function PropertyTableSkeleton() {
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
  );
}
