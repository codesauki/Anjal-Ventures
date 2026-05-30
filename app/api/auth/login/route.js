import { NextResponse } from 'next/server'
import { bootstrapAdminUser, signToken, setAdminCookie, verifyAdminCredentials } from '@/lib/auth'
import { initDb, seedDefaults } from '@/lib/db'

export async function POST(request) {
  try {
    const { email, password } = await request.json()

    if (!password) {
      return NextResponse.json({ error: 'Password required' }, { status: 400 })
    }

    await initDb()
    await seedDefaults()
    await bootstrapAdminUser()

    const admin = await verifyAdminCredentials(email, password)
    if (!admin) {
      return NextResponse.json({ error: 'Invalid admin credentials' }, { status: 401 })
    }

    const token = await signToken({
      sub: String(admin.id),
      name: admin.name,
      email: admin.email,
      role: admin.role,
    })
    const response = NextResponse.json({ success: true, admin })
    setAdminCookie(response, token)
    return response
  } catch (err) {
    console.error('Login error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
