export const registeredOfficeAddress = 'No. 4, Kolomi Ali Street, Njiwaji Layout Sabon Fegi, Damaturu, Yobe State, Nigeria'
export const registeredCacNumber = '9854225'
export const registeredTinNumber = '2623598796685'
export const legalCompanyName = 'ANJAL SOLUTIONS LTD'
export const companyName = 'Anjal Solutions LTD'
export const companyPreviousNameNotice = '(formerly Anjal Ventures)'
export const certificateUrl = '/docs/certificate-anjal-solutions-ltd.pdf'

export function normalizeCompanyAddress(address) {
  if (!address || address.trim() === 'Damaturu, Yobe State, Nigeria' || address.includes('MJG')) {
    return registeredOfficeAddress
  }

  return address
}

export function normalizeCacNumber(cac) {
  if (!cac) return registeredCacNumber
  const cleaned = String(cac).replace(/^(BN|RC)\s*[:\-\s]?\s*/i, '').trim()
  if (cleaned === '9258709' || !cleaned) return registeredCacNumber
  return cleaned
}

