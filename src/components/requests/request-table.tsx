import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"

// Mock requests data
const requests = [
  {
    id: "1",
    tenant: {
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
    },
    property: {
      id: "1",
      title: "Modern Downtown Apartment",
    },
    status: "Pending",
    date: "2023-10-15",
    moveInDate: "2023-11-01",
  },
  {
    id: "2",
    tenant: {
      name: "Michael Brown",
      email: "michael.b@example.com",
    },
    property: {
      id: "3",
      title: "Luxury Penthouse with View",
    },
    status: "Pending",
    date: "2023-10-14",
    moveInDate: "2023-11-15",
  },
  {
    id: "3",
    tenant: {
      name: "Emily Davis",
      email: "emily.d@example.com",
    },
    property: {
      id: "5",
      title: "Downtown Loft",
    },
    status: "Pending",
    date: "2023-10-12",
    moveInDate: "2023-12-01",
  },
  {
    id: "4",
    tenant: {
      name: "David Wilson",
      email: "david.w@example.com",
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

export default function RequestTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tenant</TableHead>
            <TableHead>Property</TableHead>
            <TableHead>Move-in Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date Requested</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id}>
              <TableCell className="font-medium">
                {request.tenant.name}
                <div className="text-xs text-muted-foreground">{request.tenant.email}</div>
              </TableCell>
              <TableCell>{request.property.title}</TableCell>
              <TableCell>{request.moveInDate}</TableCell>
              <TableCell>
                <Badge
                  className={
                    request.status === "Pending"
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : request.status === "Approved"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                  }
                >
                  {request.status}
                </Badge>
              </TableCell>
              <TableCell>{request.date}</TableCell>
              <TableCell className="text-right">
                {request.status === "Pending" ? (
                  <div className="flex justify-end gap-2">
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
                ) : (
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
