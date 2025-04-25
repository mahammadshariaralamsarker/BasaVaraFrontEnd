"use client"

import ReusableProfilePage from "@/components/profile/ReusableProfilePage"
import { z } from "zod"
import { profileFormSchema } from "@/components/profile/ProfileForm"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { useChangePasswordMutation, useGetSingleUserQuery, useUpdateProfileMutation } from "@/redux/apis/landlordslice"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { logout } from "@/redux/features/auth/authSlice"
import { baseApi } from "@/redux/apis/baseApi"

export default function ProfilePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [profileInfo, setProfileInfo] = useState({
  })
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const userId = user?.id;
  const { data } = useGetSingleUserQuery(userId);
  const [UpdateProfile] = useUpdateProfileMutation();
  const [ChangePassword] = useChangePasswordMutation();
  console.log(userId);
  console.log(data);

  useEffect(() => {
    
    if (data?.data) {
      setProfileInfo(data?.data);
    }
  }, [data])
  const router = useRouter();

  const form = useForm({
      defaultValues: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
    })
  

  const  handleSubmit = async(values: z.infer<typeof profileFormSchema>) => {
    setIsSubmitting(true)
    await UpdateProfile({
      payload: {
        id:userId, // make sure this is available in your component
        data: values,
      },
    }).unwrap();
  }

  const handlePasswordSubmit = async(values: { currentPassword: string; newPassword: string; }) => { 
    setIsSubmitting(true)
    const res = await ChangePassword({
      data: {
        oldPassword: values.currentPassword,
        newPassword: values.newPassword,
      },
    }).unwrap();

    console.log(res);
    if (res?.status) {
      // Clear user session or token here if applicable
      dispatch(logout());
      dispatch(baseApi.util.resetApiState());
      localStorage.removeItem("token");
      router.push("/login");
    }
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
