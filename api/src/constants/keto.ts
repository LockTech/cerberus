export interface KetoRelationTuple {
  namespace: string
  object: string
  relation: string
  subject: string
}

// Organization
export const KetoBuildOrgMemberTuple = (
  accountId: string,
  orgId: string
): KetoRelationTuple => ({
  namespace: `cerberus_organizations`,
  object: orgId,
  relation: 'member',
  subject: accountId,
})
export const KetoBuildOrgRoleTuple = (orgId: string, roleId: string) => ({
  namespace: `cerberus_organizations`,
  object: orgId,
  relation: 'role',
  subject: roleId,
})

// Account
export const KetoBuildAccountRoleTuple = (
  accountId: string,
  roleId: string
): KetoRelationTuple => ({
  namespace: 'cerberus_roles',
  object: roleId,
  relation: 'assigned',
  subject: accountId,
})

// Permission
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
