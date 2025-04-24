"use client"

import ReusableProfilePage from "@/components/profile/ReusableProfilePage"
import { z } from "zod"
import { profileFormSchema } from "@/components/profile/ProfileForm"
import { useState } from "react"
import { useForm } from "react-hook-form"

export default function ProfilePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [profileInfo, setProfileInfo] = useState({
    name: "Farhan",
    email: "landlord1@gmail.com",
    role: "landlord",
    phone: "01623967146",
    address: "Muradpur",
    city: "Chottogram",
    bio:"I am a landlord",
    createdAt: "2025-04-21T09:34:26.324+00:00",
    updatedAt: "2025-04-21T09:34:26.324+00:00",
  })

  const form = useForm({
      defaultValues: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
    })
  

  const handleSubmit = (values: z.infer<typeof profileFormSchema>) => {
    setIsSubmitting(true)
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
    }, 1500)
  }

  const handlePasswordSubmit = (values: any) => { 
    setIsSubmitting(true)
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <ReusableProfilePage
      profileInfo={profileInfo}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      passForm={form}
      handlePasswordSubmit={handlePasswordSubmit}
    />
  )
}
