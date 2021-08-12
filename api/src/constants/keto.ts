export const KetoURL = process.env.KETO_URL

export const CheckURL = `${KetoURL}/check`
export const DeleteURL = `${KetoURL}/relation-tuples`
export const WriteURL = `${KetoURL}/relation-tuples`

export const KetoBuildAccountTuple = (accountId: string, roleId: string) => ({
  namespace: 'cerberus_roles',
  object: roleId,
  relation: 'has',
  subject: accountId,
})

export const KetoBuildPermissionTuple = (roleId: string) =>
  `cerberus_roles:${roleId}#`
