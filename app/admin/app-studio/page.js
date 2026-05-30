'use client'

import AdminSidebar from '@/components/AdminSidebar'
import toast, { Toaster } from 'react-hot-toast'
import { Plus, Save, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'

const BLANK_PRESET = {
  preset_key: '',
  name: '',
  category: '',
  description: '',
  base_price: 0,
  accent_color: '#2563EB',
  preview_config: '{"layout":"standard","services":["Home","Orders","Wallet","Profile"]}',
  display_order: 0,
  is_active: true,
}

export default function AdminAppStudio() {
  const [presets, setPresets] = useState([])
  const [submissions, setSubmissions] = useState([])
  const [presetForm, setPresetForm] = useState(BLANK_PRESET)
  const [featureForm, setFeatureForm] = useState({ preset_id: '', name: '', description: '', group_name: 'Core', price: 0 })

  const load = async () => {
    const res = await fetch('/api/admin/app-studio')
    const data = await res.json()
    setPresets(data.presets || [])
    setSubmissions(data.submissions || [])
    if (!featureForm.preset_id && data.presets?.[0]) {
      setFeatureForm(prev => ({ ...prev, preset_id: data.presets[0].id }))
    }
  }

  useEffect(() => { load() }, [])

  const savePreset = async () => {
    try {
      const preview = JSON.parse(presetForm.preview_config || '{}')
      const res = await fetch('/api/admin/app-studio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...presetForm, base_price: Number(presetForm.base_price || 0), preview_config: preview }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Preset save failed')
      toast.success('Preset saved')
      setPresetForm(BLANK_PRESET)
      load()
    } catch (err) {
      toast.error(err.message || 'Invalid preset')
    }
  }

  const addFeature = async () => {
    if (!featureForm.preset_id || !featureForm.name) {
      toast.error('Preset and feature name are required')
      return
    }
    const res = await fetch('/api/admin/app-studio/features', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...featureForm, price: Number(featureForm.price || 0) }),
    })
    const data = await res.json()
    if (!res.ok) {
      toast.error(data.error || 'Feature save failed')
      return
    }
    toast.success('Feature added')
    setFeatureForm(prev => ({ ...prev, name: '', description: '', price: 0 }))
    load()
  }

  const deleteFeature = async (id) => {
    await fetch(`/api/admin/app-studio/features?id=${id}`, { method: 'DELETE' })
    toast.success('Feature removed')
    load()
  }

  const setStatus = async (id, status) => {
    await fetch('/api/admin/app-studio', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    load()
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Toaster position="top-right" />
      <AdminSidebar />
      <main className="ml-64 p-8">
        <div className="mb-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-blue-700">App Studio</p>
          <h1 className="text-3xl font-semibold tracking-normal text-slate-950">Presets, features, and app leads</h1>
          <p className="mt-2 text-sm text-slate-500">Control the app configurator and review generated product briefs.</p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[.9fr_1.1fr]">
          <section className="space-y-6">
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-5 text-lg font-semibold text-slate-950">Preset catalog</h2>
              <div className="grid gap-4">
                <Input label="Preset key" value={presetForm.preset_key} onChange={v => setPresetForm({ ...presetForm, preset_key: v })} />
                <Input label="Name" value={presetForm.name} onChange={v => setPresetForm({ ...presetForm, name: v })} />
                <Input label="Category" value={presetForm.category} onChange={v => setPresetForm({ ...presetForm, category: v })} />
                <Textarea label="Description" value={presetForm.description} onChange={v => setPresetForm({ ...presetForm, description: v })} />
                <Input label="Base price" type="number" value={presetForm.base_price} onChange={v => setPresetForm({ ...presetForm, base_price: v })} />
                <Input label="Accent color" value={presetForm.accent_color} onChange={v => setPresetForm({ ...presetForm, accent_color: v })} />
                <Textarea label="Preview config JSON" value={presetForm.preview_config} onChange={v => setPresetForm({ ...presetForm, preview_config: v })} />
              </div>
              <button onClick={savePreset} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-700">
                <Save className="h-4 w-4" />
                Save preset
              </button>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-5 text-lg font-semibold text-slate-950">Feature catalog</h2>
              <div className="grid gap-4">
                <label>
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Preset</span>
                  <select value={featureForm.preset_id} onChange={e => setFeatureForm({ ...featureForm, preset_id: e.target.value })} className="w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-600">
                    {presets.map(preset => <option key={preset.id} value={preset.id}>{preset.name}</option>)}
                  </select>
                </label>
                <Input label="Feature name" value={featureForm.name} onChange={v => setFeatureForm({ ...featureForm, name: v })} />
                <Input label="Group" value={featureForm.group_name} onChange={v => setFeatureForm({ ...featureForm, group_name: v })} />
                <Input label="Price" type="number" value={featureForm.price} onChange={v => setFeatureForm({ ...featureForm, price: v })} />
                <Textarea label="Description" value={featureForm.description} onChange={v => setFeatureForm({ ...featureForm, description: v })} />
              </div>
              <button onClick={addFeature} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-700">
                <Plus className="h-4 w-4" />
                Add feature
              </button>
            </div>
          </section>

          <section className="space-y-6">
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-5 text-lg font-semibold text-slate-950">Active presets</h2>
              <div className="space-y-4">
                {presets.map(preset => (
                  <div key={preset.id} className="rounded-lg bg-slate-50 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-bold text-slate-950">{preset.name}</p>
                        <p className="mt-1 text-xs text-slate-500">{preset.preset_key} / ${Number(preset.base_price || 0).toLocaleString()}</p>
                      </div>
                      <span className="rounded-md bg-white px-2 py-1 text-xs font-bold text-slate-500">{(preset.features || []).length} features</span>
                    </div>
                    {(preset.features || []).length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {preset.features.map(feature => (
                          <button key={feature.id} onClick={() => deleteFeature(feature.id)} className="inline-flex items-center gap-1 rounded-md bg-white px-2 py-1 text-xs font-semibold text-slate-600">
                            {feature.name}
                            <Trash2 className="h-3 w-3 text-red-500" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-5 text-lg font-semibold text-slate-950">Submissions</h2>
              <div className="space-y-3">
                {submissions.length === 0 ? (
                  <p className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">No app leads yet.</p>
                ) : submissions.map(item => (
                  <div key={item.id} className="rounded-lg bg-slate-50 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-bold text-slate-950">{item.app_name}</p>
                        <p className="mt-1 text-xs text-slate-500">{item.client_name} / {item.email || item.phone || 'No contact'} / {item.reference}</p>
                      </div>
                      <p className="text-sm font-bold text-blue-700">${Number(item.total_amount || 0).toLocaleString()}</p>
                    </div>
                    <div className="mt-3 flex gap-2">
                      {['new', 'reviewing', 'contacted', 'won'].map(status => (
                        <button key={status} onClick={() => setStatus(item.id, status)} className={`rounded-md px-2 py-1 text-xs font-bold ${item.status === status ? 'bg-slate-950 text-white' : 'bg-white text-slate-500'}`}>{status}</button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

function Input({ label, value, onChange, type = 'text' }) {
  return (
    <label>
      <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
      <input type={type} value={value || ''} onChange={e => onChange(e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-600" />
    </label>
  )
}

function Textarea({ label, value, onChange }) {
  return (
    <label>
      <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
      <textarea rows={4} value={value || ''} onChange={e => onChange(e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-600" />
    </label>
  )
}
