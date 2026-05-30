import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getDb, initDb } from '@/lib/db'

export async function POST(request) {
  try {
    await initDb()
    const sql = getDb()
    const { preset_id, name, description, group_name, price, display_order, is_active } = await request.json()
    if (!preset_id || !name) return NextResponse.json({ error: 'Preset and feature name are required' }, { status: 400 })

    const result = await sql`
      INSERT INTO app_features (preset_id, name, description, group_name, price, display_order, is_active)
      VALUES (${preset_id}, ${name}, ${description || null}, ${group_name || 'Core'}, ${price || 0}, ${display_order || 0}, ${is_active !== false})
      RETURNING *
    `
    revalidatePath('/app-studio')
    return NextResponse.json(result[0], { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    await initDb()
    const sql = getDb()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Feature id is required' }, { status: 400 })
    await sql`DELETE FROM app_features WHERE id = ${id}`
    revalidatePath('/app-studio')
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
