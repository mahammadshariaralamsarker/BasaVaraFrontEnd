import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Mail, MapPin, Phone } from "lucide-react"

interface SidebarProps {
  name: string
  role: string
  imageUrl: string
  email: string
  phone: string
  location: string
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function ProfileSidebar({
    profileInfo
  
}) {
    const { name,
        role,
        imageUrl,
        email,
        phone,
        address,
        onImageChange, } = profileInfo;
  return (
    <Card className="md:col-span-1">
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Your public profile information</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center text-center">
        <div className="relative mb-6">
          <Avatar className="h-32 w-32">
            <AvatarImage src={imageUrl} alt="Profile" />
                      <AvatarFallback className="text-4xl">{name?.slice(0, 2) }</AvatarFallback>
          </Avatar>
          
        </div>
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-sm text-muted-foreground">{role}</p>
        <div className="mt-6 w-full space-y-4">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{phone}</span>
          </div>
         
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{address}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
