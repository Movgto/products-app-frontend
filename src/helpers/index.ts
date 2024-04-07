export const toBoolean = (str: string) => {
  return str.toLowerCase() === 'true'
}

export const formatPrice = (num: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(num)
}