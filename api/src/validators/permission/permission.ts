import { validate as isUUID } from 'uuid'
import { ValidationError } from '@redwoodjs/api'

import type { PermissionTuple } from 'src/constants/permission'

import { isDefined, isPermissionTuple, isStr } from 'src/util/asserters'

import type { IDInput } from 'types/inputs'

/**
 * @throws
 *  * 'permission-tuple-invalid' - When `tuple` is not a valid `PermissionTuple`.
 */
export const validatePermissionTuple = (_s: string, tuple: PermissionTuple) => {
  if (!isPermissionTuple(tuple))
    throw new ValidationError('permission-tuple-invalid')

  // perform db operation to assert permission is unique
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
 */
export const validatePermissionId = (_s: string, { id }: IDInput) => {
  if (!isUUID(id)) throw new ValidationError('permission-id-invalid')

  // perform db assertion that `id` belongs to a valid permission
}
