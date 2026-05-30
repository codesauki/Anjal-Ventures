import { NextResponse } from 'next/server'
import { getPlatformData } from '@/lib/platform-data'

export async function GET() {
  try {
    const data = await getPlatformData()
    return NextResponse.json(data)
  } catch (err) {
    console.error('Public data error:', err)
    return NextResponse.json({ error: 'Failed to load site data' }, { status: 500 })
  }
}
