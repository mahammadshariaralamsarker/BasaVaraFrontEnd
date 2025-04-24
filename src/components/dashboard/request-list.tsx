import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"

// Mock requests data
const requests = [
  {
    id: "1",
    tenant: {
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      avatar: "/placeholder.svg",
    },
    property: {
      id: "1",
      title: "Modern Downtown Apartment",
    },
    status: "pending",
    date: "2023-10-15",
    moveInDate: "2023-11-01",
  },
  {
    id: "2",
    tenant: {
      name: "Michael Brown",
      email: "michael.b@example.com",
      avatar: "/placeholder.svg",
    },
    property: {
      id: "3",
      title: "Luxury Penthouse with View",
    },
    status: "pending",
    date: "2023-10-14",
    moveInDate: "2023-11-15",
  },
  {
    id: "3",
    tenant: {
      name: "Emily Davis",
      email: "emily.d@example.com",
      avatar: "/placeholder.svg",
    },
    property: {
      id: "5",
      title: "Downtown Loft",
    },
    status: "pending",
    date: "2023-10-12",
    moveInDate: "2023-12-01",
  },
  {
    id: "4",
    tenant: {
      name: "David Wilson",
      email: "david.w@example.com",
      avatar: "/placeholder.svg",
    },
    property: {
      id: "1",
      title: "Modern Downtown Apartment",
    },
    status: "Approved",
    date: "2023-10-10",
    moveInDate: "2023-11-01",
  },
  {
    id: "5",
    tenant: {
      name: "Jessica Martinez",
      email: "jessica.m@example.com",
      avatar: "/placeholder.svg",
    },
    property: {
      id: "4",
      title: "Suburban Family Home",
    },
    status: "Rejected",
    date: "2023-10-08",
    moveInDate: "2023-11-01",
  },
]

export default function RequestList({ limit = 10 }: { limit?: number }) {
  const displayRequests = requests.slice(0, limit)

  return (
    <div className="space-y-4">
      {displayRequests.map((request) => (
        <Card key={request.id}>
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <Avatar className="h-12 w-12">
                <AvatarImage src={request.tenant.avatar || "/placeholder.svg"} alt={request.tenant.name} />
                <AvatarFallback>{request.tenant.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold">{request.tenant.name}</h3>
                <p className="text-sm text-muted-foreground">Requesting: {request.property.title}</p>
                <div className="mt-1 flex items-center gap-2">
                  <Badge
                    className={
                      request.status === "pending"
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : request.status === "approved"
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-red-500 hover:bg-red-600"
                    }
                  >
                    {request.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">Move-in: {request.moveInDate}</span>
                </div>
              </div>
              {request.status === "pending" && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex gap-1 text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700"
                  >
                    <Check className="h-4 w-4" />
                    Approve
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex gap-1 text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                    Reject
                  </Button>
                </div>
              )}
              {request.status !== "pending" && (
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
