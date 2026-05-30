import { NextResponse } from 'next/server'
import { getPlatformData } from '@/lib/platform-data'

export async function GET() {
  const data = await getPlatformData()
  return NextResponse.json(data.appStudio)
}
