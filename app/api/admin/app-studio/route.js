import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getDb, initDb, seedDefaults } from '@/lib/db'

async function loadStudio(sql) {
  const [presets, features, submissions] = await Promise.all([
    sql`SELECT * FROM app_presets ORDER BY display_order, id`,
    sql`SELECT * FROM app_features ORDER BY preset_id, display_order, id`,
    sql`SELECT * FROM app_studio_submissions ORDER BY created_at DESC`,
  ])
  return {
    presets: presets.map(preset => ({
      ...preset,
      features: features.filter(feature => feature.preset_id === preset.id),
    })),
    submissions,
  }
}

export async function GET() {
  try {
    await initDb()
    await seedDefaults()
    const sql = getDb()
    return NextResponse.json(await loadStudio(sql))
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    await initDb()
    const sql = getDb()
    const body = await request.json()
    const {
      preset_key,
      name,
      category,
      description,
      base_price,
      accent_color,
      preview_config = {},
      display_order,
      is_active,
    } = body

    if (!preset_key || !name) {
      return NextResponse.json({ error: 'Preset key and name are required' }, { status: 400 })
    }

    const result = await sql`
      INSERT INTO app_presets (preset_key, name, category, description, base_price, accent_color, preview_config, display_order, is_active)
      VALUES (${preset_key}, ${name}, ${category || null}, ${description || null}, ${base_price || 0}, ${accent_color || '#2563EB'}, ${JSON.stringify(preview_config)}::jsonb, ${display_order || 0}, ${is_active !== false})
      ON CONFLICT (preset_key) DO UPDATE SET
        name = EXCLUDED.name,
        category = EXCLUDED.category,
        description = EXCLUDED.description,
        base_price = EXCLUDED.base_price,
        accent_color = EXCLUDED.accent_color,
        preview_config = EXCLUDED.preview_config,
        display_order = EXCLUDED.display_order,
        is_active = EXCLUDED.is_active,
        updated_at = NOW()
      RETURNING *
    `
    revalidatePath('/app-studio')
    return NextResponse.json(result[0], { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function PATCH(request) {
  try {
    await initDb()
    const sql = getDb()
    const { id, status } = await request.json()
    if (!id || !status) return NextResponse.json({ error: 'Submission id and status are required' }, { status: 400 })
    const result = await sql`
      UPDATE app_studio_submissions
      SET status = ${status}, updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `
    return NextResponse.json(result[0] || null)
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
