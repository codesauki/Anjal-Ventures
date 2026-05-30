import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Only JPEG, PNG, and WebP logos are allowed.' }, { status: 400 })
    }
    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json({ error: 'Logo must be smaller than 2MB.' }, { status: 400 })
    }
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json({ error: 'Logo upload storage is not configured.' }, { status: 503 })
    }

    const filename = `app-studio/logos/${Date.now()}-${file.name.replace(/[^a-z0-9.-]/gi, '-').toLowerCase()}`
    const blob = await put(filename, file, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    })
    return NextResponse.json({ url: blob.url })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
