import { NextResponse } from 'next/server'
import { getDb, initDb, seedDefaults } from '@/lib/db'

function reference(prefix = 'AV') {
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
      client_name,
      entity_name,
      email,
      phone,
      address,
      selected_items = [],
      total_amount = 0,
      total_naira = null,
      notes,
      project_title,
      client_payload = {},
      proposal_payload = {},
      quote_type = 'project',
      source = 'quote-builder',
    } = body

    if (!client_name) {
      return NextResponse.json({ error: 'Client name is required' }, { status: 400 })
    }

    const ref = reference(quote_type === 'app' ? 'APP' : 'AV')
    await sql`
      INSERT INTO quotation_requests (
        reference, quote_type, project_title, client_name, entity_name, email, phone, address,
        selected_items, total_amount, total_naira, notes, client_payload, proposal_payload, source
      )
      VALUES (
        ${ref}, ${quote_type}, ${project_title || null}, ${client_name}, ${entity_name || null},
        ${email || null}, ${phone || null}, ${address || null}, ${JSON.stringify(selected_items)}::jsonb,
        ${total_amount || 0}, ${total_naira}, ${notes || null}, ${JSON.stringify(client_payload)}::jsonb,
        ${JSON.stringify(proposal_payload)}::jsonb, ${source}
      )
    `

    return NextResponse.json({ success: true, reference: ref })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
