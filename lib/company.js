export const registeredOfficeAddress = 'No. 4, MJG Global Ventures Complex, Kolomi Ali Street, Sabon Pegi, Damaturu, Yobe State, Nigeria'

export function normalizeCompanyAddress(address) {
  if (!address || address.trim() === 'Damaturu, Yobe State, Nigeria') {
    return registeredOfficeAddress
  }

  return address
}

export const registeredCacNumber = '9258709'
export const registeredDunsNumber = '352294840'

export function normalizeCacNumber(cac) {
  if (!cac) return registeredCacNumber
  const cleaned = String(cac).replace(/^BN\s*[:\-\s]?\s*/i, '').trim()
  return cleaned || registeredCacNumber
}

