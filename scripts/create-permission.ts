import { createPermission } from '../api/src/services/permissions/permissions'

import { validatePermissionTuple } from '../api/src/validators/permission/permission'

export interface CreatePermissionArgs {
  a: string
  n: string
  o: string
  r: string
}

export default async ({ args }: { args: CreatePermissionArgs }) => {
  const { a: application, n: namespace, o: object, r: relation } = args

  const permTuple = { application, namespace, object, relation }

  validatePermissionTuple('cli-create-permission', permTuple)

  const res = await createPermission(permTuple)

  console.log(`Created PermissionTuple with ID: ${res.id}.`)
}
