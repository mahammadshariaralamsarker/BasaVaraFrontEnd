 
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  
  const token = (await cookies()).get('token')?.value; 
  if (!token) { 
    redirect('/login')
  }

  // Parse JWT to get user role
  let role: string
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
    );
    const decoded = JSON.parse(jsonPayload);
    role = decoded.role
  } catch (error) {
    // If token is invalid, redirect to login
    redirect('/login')
  }

  // Redirect based on role
  switch (role) {
    case 'admin':
      redirect('/admin/user')
    case 'landlord':
      redirect('/landlords/listings')
    case 'tenant':
      redirect('/')
    default:
      redirect('/unauthorized')
  }
  return null
}