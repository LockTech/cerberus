export interface PermissionTuple {
  application: string
  namespace: string
  object: string
  relation: string
}

export const CerberusAdminTuple: PermissionTuple = {
  application: 'cerberus',
  namespace: 'cerberus_admins',
  object: '',
  relation: 'is',
}

export const PermissionUndefinedTuple: PermissionTuple = {
  application: undefined,
  namespace: undefined,
  object: undefined,
  relation: undefined,
}
