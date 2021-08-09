export const isFunc = (value: unknown) => {
  if (typeof value === 'function') return true
  else return false
}

export const isStr = (value: unknown) => {
  if (typeof value === 'string') return true
  else return false
}

export const isUndefined = (value: unknown) => {
  if (value === undefined || value === null) return true
  else return false
}
export const isDefined = (value: unknown) => {
  if (value !== undefined && value !== null) return true
  else return false
}
