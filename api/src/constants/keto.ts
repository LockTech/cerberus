export const KetoURL = process.env.KETO_URL

export const CheckURL = `${KetoURL}/check`
export const DeleteURL = `${KetoURL}/relation-tuples`
export const WriteURL = `${KetoURL}/relation-tuples`

export interface KetoRelationTuple {
  namespace: string
  object: string
  relation: string
  subject: string
}

export const KetoBuildAccountTuple = (
  accountId: string,
  roleId: string
): KetoRelationTuple => ({
  namespace: 'cerberus_roles',
  object: roleId,
  relation: 'has',
  subject: accountId,
})

export const KetoBuildPermissionSubjectSet = (roleId: string) =>
  `cerberus_roles:${roleId}#assigned`

export interface KetoBuildPermissionTupleArgs
  extends Omit<KetoRelationTuple, 'subject'> {
  roleId: string
}
export const KetoBuildPermissionTuple = ({
  namespace,
  object,
  relation,
  roleId,
}: KetoBuildPermissionTupleArgs): KetoRelationTuple => ({
  namespace,
  object,
  relation,
  subject: KetoBuildPermissionSubjectSet(roleId),
})
