export function formatMoney(amount, currency = 'USD') {
  const value = Number(amount || 0)
  if (currency === 'NGN') {
    return `NGN ${Math.round(value).toLocaleString()}`
  }
  return `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
}
