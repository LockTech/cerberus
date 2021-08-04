export const isStr = (value: unknown) => {
  if (typeof value === 'string') return true
  else return false
}

export const isUndefined = (value: unknown) => {
  if (typeof value === 'undefined') return true
  else return false
}
export const isDefined = (value: unknown) => !isUndefined(value)
