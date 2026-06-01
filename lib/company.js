export const registeredOfficeAddress = 'No. 4, MJG Global Ventures Complex, Kolomi Ali Street, Sabon Pegi, Damaturu, Yobe State, Nigeria'

export function normalizeCompanyAddress(address) {
  if (!address || address.trim() === 'Damaturu, Yobe State, Nigeria') {
    return registeredOfficeAddress
  }

  return address
}
