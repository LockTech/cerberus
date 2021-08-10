import type { PermissionTuple } from 'src/constants/permission'

// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunc = (value: unknown): value is Function => {
  if (typeof value === 'function') return true
  else return false
}

export const isStr = (value: unknown): value is string => {
  if (typeof value === 'string') return true
  else return false
}

export const isUndefined = (value: unknown): value is undefined => {
  if (value === undefined || value === null) return true
  else return false
}
export const isDefined = (value: unknown) => {
  if (value !== undefined && value !== null) return true
  else return false
}

export const isPermissionTuple = ({
  application,
  namespace,
  object,
  relation,
}: PermissionTuple) => {
  if (
    !isStr(application) ||
    application === '' ||
    !isStr(namespace) ||
    namespace === '' ||
    (isDefined(object) && !isStr(object)) ||
    (isDefined(relation) && !isStr(relation))
  )
    return false
  return true
}
