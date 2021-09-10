import { validate as isUUID } from 'uuid'
import { ValidationError } from '@redwoodjs/api'

import type { PermissionTuple } from 'src/constants/permission'

import { isDefined, isPermissionTuple, isStr } from 'src/util/asserters'

import type { IDInput } from 'types/inputs'
import { db } from 'src/lib/db'

/**
 * @throws
 *  * 'permission-tuple-invalid' - When `tuple` is not a valid `PermissionTuple`.
 *  * 'permission-tuple-unique' - When `tuple` is not unique.
 */
export const validatePermissionTuple = async (
  _s: string,
  tuple: PermissionTuple
) => {
  if (!isPermissionTuple(tuple))
    throw new ValidationError('permission-tuple-invalid')

  const res = await db.permission.findUnique({
    where: {
      application_namespace_object_relation: tuple,
    },
  })
  if (res !== null) throw new ValidationError('permission-tuple-unique')
}

export interface AccessRelationInput {
  access_relation: string
}
/**
 * @throws
 *  * 'permission-accessRelation-invalid' - When `access_relation` is defined and not a `string`.
 */
export const validatePermissionAccessRel = (
  _s: string,
  { access_relation }: AccessRelationInput
) => {
  if (isDefined(access_relation) && !isStr(access_relation))
    throw new ValidationError('permission-accessRelation-invalid')
}

/**
 * @throws
 *  * 'permission-id-invalid' - When `id` is not a valid UUID.
 *  * 'permission-id-exists' - When a permission with `id` does not exist.
 */
export const validatePermissionId = async (_s: string, { id }: IDInput) => {
  if (!isUUID(id)) throw new ValidationError('permission-id-invalid')

  const res = await db.permission.findUnique({ where: { id } })
  if (res === null) throw new ValidationError('permission-exists')
}
