export const isBool = (value: unknown) => {
  if (typeof value === 'boolean') return true
  else return false
}

export const isStr = (value: unknown) => {
  if (typeof value === 'string') return true
  else return false
}
