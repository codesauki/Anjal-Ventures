import { NextResponse } from 'next/server'
import { getDb, initDb, seedDefaults } from '@/lib/db'

function reference(prefix = 'APP') {
  const now = new Date()
  return `${prefix}-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}-${String(Date.now()).slice(-6)}`
}

export async function POST(request) {
  try {
    await initDb()
    await seedDefaults()
    const sql = getDb()
    const body = await request.json()
    const {
      preset_key,
      app_name,
      client_name,
      company,
      email,
      phone,
      logo_url,
      configuration = {},
      selected_features = [],
      total_amount = 0,
      total_naira = null,
    } = body

    if (!preset_key || !app_name || !client_name) {
      return NextResponse.json({ error: 'Preset, app name, and client name are required' }, { status: 400 })
    }

    const ref = reference()
    const result = await sql`
      INSERT INTO app_studio_submissions (
        reference, preset_key, app_name, client_name, company, email, phone, logo_url,
        configuration, selected_features, total_amount, total_naira
      )
      VALUES (
        ${ref}, ${preset_key}, ${app_name}, ${client_name}, ${company || null}, ${email || null},
        ${phone || null}, ${logo_url || null}, ${JSON.stringify(configuration)}::jsonb,
        ${JSON.stringify(selected_features)}::jsonb, ${total_amount || 0}, ${total_naira}
      )
      RETURNING *
    `

    return NextResponse.json({ success: true, reference: ref, submission: result[0] }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
