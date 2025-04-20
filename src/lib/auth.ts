import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'

export async function getTokenData() {
  const token = cookies().get('token')?.value
  if (!token) return null

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
    const { payload } = await jwtVerify(token, secret)
    
    return {
      userId: payload.sub,
      email: payload.email as string,
      role: payload.role as 'admin' | 'landlord' | 'tenant',
      // Add other claims as needed
    }
  } catch (error) {
    console.error('Token verification failed:', error)
    return null
  }
}