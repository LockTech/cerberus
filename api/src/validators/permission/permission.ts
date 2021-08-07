import { ValidationError } from '@redwoodjs/api'

import { isDefined, isStr } from 'src/util/asserters'

// ==
export interface IsPermissionTupleArgs {
  application: string
  namespace: string
  object: string
  relation: string
}
export const isPermissionTuple = ({
  application,
  namespace,
  object,
  relation,
}: IsPermissionTupleArgs) => {
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
//

// ==
export interface ValidatePermissionTupleArgs {
  application: string
  namespace: string
  object: string
  relation: string
}
/**
 * @throws
 *  * 'permission-tuple-invalid' - When fields are missing or invalid on the permission tuple.
 */
export const validatePermissionTuple = (
  _service: string,
  tuple: ValidatePermissionTupleArgs
) => {
  if (!isPermissionTuple(tuple)) {
    throw new ValidationError('permission-tuple-invalid')
  }
}
//
