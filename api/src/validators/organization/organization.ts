import { ValidationError } from '@redwoodjs/graphql-server'

import { OrganizationMaxNameLength } from 'src/constants/organization'

import { isStr } from 'src/util/asserters'

import type { NameInput } from 'types/inputs'
import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

/**
 * @throws
 *  * 'organization-name-invalid' - When `name` is not a string
 *  * 'organization-name-length' - When `name` is less than or 0 or greater than `OrganizationMaxNameLength` characters long
 *  * 'organization-name-unique' - When `name` is not unique to the Cerberus platform.
 */
export const validateOrganizationName = async ({ name }: NameInput) => {
  if (!isStr(name)) throw new ValidationError('organization-name-invalid')

  if (name.length <= 0 || name.length > OrganizationMaxNameLength)
    throw new ValidationError('organization-name-length')

  const res = await db.organization.findUnique({ where: { name } })

  logger.info({ res })

  if (res !== null) throw new ValidationError('organization-name-unique')
}
