import { validate as validateUUID } from 'uuid'
import { ValidationError } from '@redwoodjs/api'

import { RoleMaxNameLength } from 'src/constants/role'

import { isStr } from 'src/util/asserters'

import type { IDInput, NameInput } from 'types/inputs'

/**
 * @throws
 *  * 'role-id-invalid' - When `id` is not a valid UUID.
 */
export const validateRoleId = (_s: string, { id }: IDInput) => {
  if (!isStr(id) || !validateUUID(id))
    throw new ValidationError('role-id-invalid')

  // assert ID belongs to the invoking organization
}

/**
 * @throws
 *  * 'role-name-invalid' - When `name` is not a string
 *  * 'role-name-length' - When `name` is less than or 0 or greater than `RoleMaxNameLength` characters long
 *
 */
export const validateRoleName = (_s: string, { name }: NameInput) => {
  if (!isStr(name)) throw new ValidationError('role-name-invalid')

  if (name.length <= 0 || name.length > RoleMaxNameLength)
    throw new ValidationError('role-name-length')

  // assert `name` is unique to the invoking organization
}