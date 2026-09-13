'use client'

import React from 'react'

export function AppStoreBadge({ url, className = '', stopPropagation = false }) {
  if (!url) return null

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        if (stopPropagation) e.stopPropagation()
      }}
      className={`group inline-flex items-center gap-2.5 rounded-xl border border-white/20 bg-black/90 px-3.5 py-2 text-white shadow-sm transition hover:border-white/40 hover:bg-black hover:shadow-md ${className}`}
      aria-label="Download on the Apple App Store"
    >
      <svg className="h-5 w-5 fill-current transition-transform duration-200 group-hover:scale-105" viewBox="0 0 170 170" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.08-7.74-7.98-12.14-14.69-6.09-9.35-10.9-19.98-14.42-31.9-3.52-11.91-5.28-23.34-5.28-34.3 0-14.35 3.52-26.24 10.56-35.67 7.04-9.43 15.82-14.26 26.33-14.5 5.09 0 10.59 1.41 16.51 4.23 5.92 2.82 10.15 4.3 12.69 4.44 2.12 0 6.64-1.63 13.56-4.88 6.92-3.26 12.87-4.63 17.85-4.13 13.62 1.06 24.37 6.44 32.24 16.14-11.89 7.27-17.72 17.15-17.5 29.65.23 9.94 4.07 18.23 11.53 24.89 7.46 6.65 16.29 10.55 26.5 11.69-2.22 6.74-4.88 13.56-7.98 20.47zM119.22 31.02c0-7.39 2.65-14.35 7.95-20.89 5.3-6.53 11.88-10.13 19.74-10.13.23 1.06.34 2 .34 2.82 0 7.39-2.76 14.54-8.28 21.46-5.52 6.92-12.21 10.74-20.08 11.46.22-1.74.33-3.31.33-4.72z" />
      </svg>
      <div className="flex flex-col text-left">
        <span className="text-[9px] font-medium leading-none tracking-tight text-white/75">Download on the</span>
        <span className="text-xs font-semibold tracking-tight text-white">App Store</span>
      </div>
    </a>
  )
}

export function PlayStoreBadge({ url, className = '', stopPropagation = false }) {
  if (!url) return null

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        if (stopPropagation) e.stopPropagation()
      }}
      className={`group inline-flex items-center gap-2.5 rounded-xl border border-white/20 bg-black/90 px-3.5 py-2 text-white shadow-sm transition hover:border-white/40 hover:bg-black hover:shadow-md ${className}`}
      aria-label="Get it on Google Play"
    >
      <svg className="h-5 w-5 transition-transform duration-200 group-hover:scale-105" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z" fill="#00D763"/>
        <path d="M47 38.3v435.4l246.7-217.7L47 38.3z" fill="#00A2FF"/>
        <path d="M293.7 256L47 473.7l338.4-194.2-91.7-23.5z" fill="#FF3A44"/>
        <path d="M465 240.6l-79.6-45.7-60.1 61.1 60.1 61.1 80.5-46.3c14.6-8.4 14.6-21.8-.9-30.2z" fill="#FFC400"/>
      </svg>
      <div className="flex flex-col text-left">
        <span className="text-[9px] font-medium uppercase leading-none tracking-tight text-white/75">GET IT ON</span>
        <span className="text-xs font-semibold tracking-tight text-white">Google Play</span>
      </div>
    </a>
  )
}

export default function ProjectStoreBadges({
  appStoreUrl,
  playStoreUrl,
  className = '',
  stopPropagation = false,
}) {
  const hasAppStore = Boolean(appStoreUrl && appStoreUrl.trim())
  const hasPlayStore = Boolean(playStoreUrl && playStoreUrl.trim())

  if (!hasAppStore && !hasPlayStore) return null

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {hasAppStore && (
        <AppStoreBadge url={appStoreUrl} stopPropagation={stopPropagation} />
      )}
      {hasPlayStore && (
        <PlayStoreBadge url={playStoreUrl} stopPropagation={stopPropagation} />
      )}
    </div>
  )
}
