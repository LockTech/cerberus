import { ValidationError } from '@redwoodjs/api'

import type { PermissionTuple } from 'src/constants/permission'

import { isPermissionTuple } from 'src/util/asserters'

/**
 * @throws
 *  * 'permission-tuple-invalid' - When `tuple` is not a valid `PermissionTuple`.
 */
export const validatePermissionTuple = (_s: string, tuple: PermissionTuple) => {
  if (!isPermissionTuple(tuple))
    throw new ValidationError('permission-tuple-invalid')

  // perform db operation to assert permission is unique
}
