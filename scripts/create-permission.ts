import { createPermission } from '../api/dist/services/permissions/permissions'

import { validatePermissionTuple } from '../api/dist/validators/permission/permission'

export interface CreatePermissionArgs {
  a: string
  n: string
  o: string
  r: string
}

export default async ({ args }: { args: CreatePermissionArgs }) => {
  const { a: application, n: namespace } = args
  let { o: object = '', r: relation = '' } = args

  object = typeof object === 'boolean' ? '' : object
  relation = typeof relation === 'boolean' ? '' : relation

  const data = { application, namespace, object, relation }

  validatePermissionTuple('cli-permission-create', data)

  const res = await createPermission(data)

  console.log({ res })
  process.exit()
}
