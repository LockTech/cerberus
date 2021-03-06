import { validate as isUUID } from 'uuid'
import { ValidationError } from '@redwoodjs/graphql-server'

import { KetoBuildOrgRoleTuple } from 'src/constants/keto'

import { checkTuple } from 'src/helpers/keto'

import { getContextUser } from 'src/lib/context'
import { db } from 'src/lib/db'

import { isStr } from 'src/util/asserters'

import type { ColorInput, IDInput, NameInput } from 'types/inputs'

export const RoleColorRegEx = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/

export const RoleMaxNameLength = 100

/**
 * @throws
 *  * 'role-id-invalid' - When `id` is not a valid UUID.
 *  * 'role-forbidden' - When `id` does not belong to the invoking account's organization.
 */
export const validateRoleId = async ({ id }: IDInput) => {
  if (!isUUID(id)) throw new ValidationError('role-id-invalid')

  const orgId = getContextUser().organizationId

  const tuple = KetoBuildOrgRoleTuple(orgId, id)
  const res = await checkTuple(tuple)
  if (!res) throw new ValidationError('role-forbidden')
}

/**
 * @throws
 *  * 'role-color-invalid' - When `color` is not formatted correctly: #RRGGBB.
 */
export const validateRoleColor = ({ color }: ColorInput) => {
  if (!isStr(color) || color.matchAll(RoleColorRegEx) === null)
    throw new ValidationError('role-color-invalid')
}

/**
 * @throws
 *  * 'role-name-invalid' - When `name` is not a string
 *  * 'role-name-length' - When `name` is less than or 0 or greater than `RoleMaxNameLength` characters long
 *  * 'role-name-unique' - When `name` is in use by another role owned by the invoking account's organization.
 */
export const validateRoleName = async ({ name }: NameInput) => {
  if (!isStr(name)) throw new ValidationError('role-name-invalid')

  if (name.length <= 0 || name.length > RoleMaxNameLength)
    throw new ValidationError('role-name-length')

  const organizationId = getContextUser().organizationId

  const res = await db.role.findUnique({
    where: { name_organizationId: { organizationId, name } },
  })
  if (res !== null) throw new ValidationError('role-name-unique')
}
