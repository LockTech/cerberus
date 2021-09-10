import { validate as isUUID } from 'uuid'
import { ValidationError } from '@redwoodjs/api'

import { OrganizationMaxNameLength } from 'src/constants/organization'

import { isStr } from 'src/util/asserters'

import type { IDInput, NameInput } from 'types/inputs'
import { db } from 'src/lib/db'
import { getContextUser } from 'src/lib/context'
import { KetoBuildOrgMemberTuple } from 'src/constants/keto'
import { checkTuple } from 'src/helpers/keto'
import { logger } from 'src/lib/logger'

/**
 * @throws
 *  * 'organization-name-invalid' - When `name` is not a string
 *  * 'organization-name-length' - When `name` is less than or 0 or greater than `OrganizationMaxNameLength` characters long
 *  * 'organization-name-unique' - When `name` is not unique to the Cerberus platform.
 */
export const validateOrganizationName = async (
  s: string,
  { name }: NameInput
) => {
  if (!isStr(name)) throw new ValidationError('organization-name-invalid')

  if (name.length <= 0 || name.length > OrganizationMaxNameLength)
    throw new ValidationError('organization-name-length')

  const res = await db.organization.findUnique({ where: { name } })

  logger.info({ res })

  if (res !== null) throw new ValidationError('organization-name-unique')
}

/**
 * @throws
 *  * 'organization-id-invalid' - When `id` is not a valid UUID.
 *  * 'organization-forbidden' - When `id` is not the invoking account's organization.
 */
export const validateOrganizationId = async (s: string, { id }: IDInput) => {
  if (!isUUID(id)) throw new ValidationError('organization-id-invalid')

  const accountId = getContextUser().id

  const tuple = KetoBuildOrgMemberTuple(accountId, id)
  const res = await checkTuple(tuple)
  if (!res) throw new ValidationError('organization-forbidden')
}
