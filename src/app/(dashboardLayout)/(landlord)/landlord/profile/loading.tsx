import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ProfileLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Skeleton className="h-10 w-[250px] mb-2" />
        <Skeleton className="h-5 w-[350px]" />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <Skeleton className="h-6 w-[180px] mb-2" />
            <Skeleton className="h-4 w-[220px]" />
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <Skeleton className="h-32 w-32 rounded-full mb-6" />
            <Skeleton className="h-6 w-[150px] mb-2" />
            <Skeleton className="h-4 w-[120px] mb-6" />
            <div className="w-full space-y-4">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <div className="flex gap-2 mb-4">
            <Skeleton className="h-10 w-[100px]" />
            <Skeleton className="h-10 w-[100px]" />
            <Skeleton className="h-10 w-[120px]" />
          </div>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-[200px] mb-2" />
              <Skeleton className="h-4 w-[300px]" />
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <Skeleton className="h-[72px] w-full" />
                <Skeleton className="h-[72px] w-full" />
                <Skeleton className="h-[72px] w-full" />
                <Skeleton className="h-[72px] w-full" />
                <Skeleton className="h-[150px] w-full md:col-span-2" />
              </div>
              <div className="flex justify-end mt-8">
                <Skeleton className="h-10 w-[120px]" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
